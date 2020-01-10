export default {
    methods: {
        _sortNameParts(sortName) {
            const names = sortName.split(",")
            if (names.length > 1)
            {
                let preferredFirstName = names[1];
                preferredFirstName.match(/\((.*)\)/).map(function (val) {
                    preferredFirstName = val
                })

                return {
                    prefix: "",
                    suffix: "",
                    sortName: sortName,
                    surname: names[0],
                    preferredFirstName: preferredFirstName,
                    restOfName: names[1],
                    surnamePosition: "L"
                }
            }

            return {
                prefix: "",
                suffix: "",
                sortName: sortName,
                surname: sortName,
                preferredFirstName: "",
                restOfName: "",
                surnamePosition: "F"
            }
        },
        _hasIdentityFlags(identity) {
            if (this._hasRegistrarWarning(identity))
            {
                return true
            }
            if (this._isRestricted(identity))
            {
                return true
            }
            if (this._hasMergePending(identity))
            {
                return true
            }
            return this._isDeceased(identity)
        },
        _identityFlags: function (identity)
        {
            let flags = ""
            if (this._isDeceased(identity))
            {
                flags += '*Deceased* '
            }
            if (this._isRestricted(identity))
            {
                flags += '*Restricted* '
            }
            if (this._hasMergePending(identity))
            {
                flags += '*Merge Pending* '
            }
            if (this._hasRegistrarWarning(identity))
            {
                flags += '*Registrar Warning* '
            }

            return flags
        },
        _isAnEmployee(identity) {

            if (identity.empStatus)
            {
                const val = identity.empStatus.trim()
                return ((val !== "Non-Employee") && (val !== ""))
            }

            return false
        },
        _fullTextGender: function(gender)
        {
            if (gender)
            {
                switch (gender.toUpperCase().substr(0, 1))
                {
                    case 'M':
                        return 'Male';
                    case 'F':
                        return 'Female';
                    default:
                        return gender;
                }
            }
        },
        _isRestricted: function(identity)
        {
            return (identity.restricted && (identity.restricted === true) || (identity.restricted === "Y"));
        },
        _isDeceased: function(identity)
        {
            return (identity.deceased && (identity.deceased === true) || (identity.deceased === "Y"));
        },
        _hasRegistrarWarning: function(identity)
        {
            return (identity.registrar_warning && (identity.registrar_warning === true) || (identity.registrar_warning === "Y"));
        },
        _hasMergePending: function(identity)
        {
            return (identity.merge_pending && (identity.merge_pending === true) || (identity.merge_pending === "Y"));
        },
        _mailToHREF(identity)
        {
            return "mailto:"+ identity.email
        },
        _resolveId(id, key) {
            const searchEngine = (key === "person_id") ? "PersonId" : "Name"
            const request = {
                method: "GET",
                url: `https://api.byu.edu/domains/legacy/identity/person/directorylookup2.1/v1/All/${searchEngine}/1/${id}/`
            }
            return new Promise((resolve, reject) => {
                this.$byu.auth.request(request, (body, status) => {
                    let identity = null
                    if (status === 200) {
                        body = JSON.parse(body)
                        this.resultCount = body.PersonLookupService.response.total_result_size
                        if (this.resultCount > 0)
                        {
                            for (const testIdentity of body.PersonLookupService.response.information)
                            {
                                testIdentity.byu_id = this._byuId_compress(testIdentity.byu_id)
                                if (testIdentity[key] === id)
                                {
                                    identity = testIdentity
                                    break
                                }
                            }
                        }
                    }
                    if (identity) {
                        identity.personId = identity.person_id
                        identity.netId = identity.net_id
                        identity.byu_id = this._byuId_compress(identity.byu_id)
                        identity.byuId = identity.byu_id
                        if (process.client) {
                            if (byu.brownie) {
                                //byu.brownie.set('__effectiveId', identity.personId);
                                byu.brownie.__effectiveId = identity.personId
                            }
                        }
                    }
                    console.log("resolve", identity)
                    resolve(identity)
                })
            })
        },
        _resolvePersonId(personId) {
            return this._resolveId(personId, 'person_id')
        },
        _resolveByuId(byuId) {
            return this._resolveId(byuId, 'byu_id')
        }
    }
}
