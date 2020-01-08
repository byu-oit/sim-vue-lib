export default {
    methods: {
        _authorize(query, store, app)
        {
            const wabs = app.$byu
            const pageControl = store.state.gradStudies.pageControl
            if (pageControl)
            {
                if (wabs.user)
                {
                    if (wabs.user.personId === pageControl.identity.personId)
                    {
                        return Promise.resolve(this._authorizeWithPageControl(pageControl))
                    }
                }
            }
            return this._getPageControlInfo(query.webResourceId, store, app).then(
                pageControl => {
                    return this._authorizeWithPageControl(pageControl)
                }
            )
        },
        _authorizeWithPageControl(pageControl)
        {
            let authorized = false;

            authorized = (pageControl && (pageControl.policies.length > 0))

            console.log("PageControl_authorized:", authorized, pageControl)

            return authorized

            //     if (empty($resourceAuthorizations))
            //     {
            //         //check self service authorization
            //         if (authenticated)
            //         {
            //             authorized = ($query->allowSelf && ($personId == $query->context));
            //         }
            //     }
            //     else
            //     {
            //         if ($query->updateInformationalArea)
            //         {
            //             foreach($resourceAuthorizations as $resourceAuthorization)
            //             {
            //                 /**
            //                  * @var \BYU\AccessManager\Models\UserAuthorizationResourceViewBase $resourceAuthorization
            //                  */
            //                 if ($resourceAuthorization->informationalArea == $query->updateInformationalArea)
            //                 {
            //                     if ($resourceAuthorization->updateType == 'U')
            //                     {
            //                         authorized = true;
            //                         break;
            //                     }
            //                 }
            //             }
            //         }
            //         else
            //         {
            //             authorized = true;
            //         }
            //     }
            //
            //     if (! authorized)
            //     {
            //         if ($query->throwException)
            //         {
            //             error_log("No resource authorizations found for identity: $personId and web resource: $query->webResourceId");
            //             throw new AccessDeniedException('You do not have authorizations for this resource.');
            //         }
            //         return false;
            //     }
            //
            //     //handle delegation
            //     if ($query->delegatedPersonId)
            //     {
            //         $delegatedOperationPerformed = $this->modelFactory->DelegatedOperationPerformedPdo()->getDelegatedAuthorization(
            //         $query->delegatedPersonId,
            //         $query->delegatedOperationId,
            //         $query->webResourceId
            //     );
            //         if ($delegatedOperationPerformed)
            //         {
            //             $delegatedResourceAuthorization = $this->modelFactory->ResourceAuthorizationView();
            //             $delegatedResourceAuthorization->informationalArea = 'DELEGATION';
            //             $delegatedResourceAuthorization->limitationType = $delegatedOperationPerformed->webResourceId;
            //             $delegatedResourceAuthorization->limitationValue = $delegatedOperationPerformed->personId;
            //             //make the delegation authorization be the first resource authorization in the set of possible resource authorizations
            //             $resourceAuthorizations = array_merge(array($delegatedResourceAuthorization), $resourceAuthorizations);
            //         }
            //     }
            //
            //     return $resourceAuthorizations;
        },
        _pageControlUrl(webResourceId, wabs)
        {
            let withUser = "";
            if (wabs.user)
            {
                withUser = "/" + wabs.user.byuId;
            }
            return "/accessManagement/v1/webResource/" + webResourceId + "/bootstrap" + withUser;
        },
        _getPageControlInfo(webResourceId, store, app)
        {
            const wabs = app.$byu
            const WSO2Request = app.$WSO2Request
            let servicePath = this._pageControlUrl(webResourceId, wabs)
            return WSO2Request(wabs, servicePath, {loginOn401: false})
                .then(response => {
                    if (response.status === 200)
                    {
                        const body = response.data;
                        if (wabs.user)
                        {
                            body.content.identity = {personId: wabs.user.personId}
                        }
                        store.commit('gradStudies/pageControl', body.content)
                        return body.content
                    }
                    else
                    {
                        store.commit('gradStudies/pageControl', null)
                        console.log(response.status, " in _getPageControlInfo how do I want to handle?")
                        return null
                    }
                })
        }
    }
}