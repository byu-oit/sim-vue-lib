/**
 *  @license
 *    Copyright 2018 Brigham Young University
 *
 *    Licensed under the Apache License, Version 2.0 (the "License");
 *    you may not use this file except in compliance with the License.
 *    You may obtain a copy of the License at
 *
 *        http://www.apache.org/licenses/LICENSE-2.0
 *
 *    Unless required by applicable law or agreed to in writing, software
 *    distributed under the License is distributed on an "AS IS" BASIS,
 *    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *    See the License for the specific language governing permissions and
 *    limitations under the License.
 **/
'use strict';

import Dater from '~/mixins/Date'

// export state as a function
export const state = () => ({
    pageControl: null,
    identity: {},
    studentSummary: {},
    progress2Degree: null,
    selectedPTD: null,
    majorShopping: [],
    pdf: '',
    teachingAreaClasses: '',
    undergraduatePrograms: [],
    minorPrograms: [],
    isLoading: false,
    hasMessage: null,
    isAdmin: false
});

// export mutations object
export const mutations = {
    setLoading(state, bool) {
        state.isLoading = bool
    },
    setHasMessage(state, val) {
        state.hasMessage = val
    },
    isAdmin(state, val) {
        state.isAdmin = val
    },
    setPageControl(state, val) {
        state.pageControl = val
    },
    setMajorShopping(state, val) {
        state.majorShopping = val
    },
    addToMajorShopping(state, val) {
        state.majorShopping = state.majorShopping.concat([val])
    },
    setPdf(state, val) {
        state.pdf = val
    },
    setSelectedPTD(state, val) {
        state.selectedPTD = val
    },
    setProgress2Degree(state, val) {
        state.progress2Degree = val
    },
    setIdentity(state, val) {
        val = val || {}
        state.identity = val
    },
    setUndergraduatePrograms(state, val) {
        state.undergraduatePrograms = val
    },
    setMinorPrograms(state, val) {
        state.minorPrograms = val
    },
    setTeachingAreaClasses(state, val) {
        state.teachingAreaClasses = val
    }
};

// export actions object
export const actions = {

    // server side only execution for pre-populating the Vuex store
    nuxtServerInit: ({ commit }, { req }) => {
        const wabs = req.wabs || {};

        // update user and auth data
        commit('wabs/authUpdate', wabs.auth);
        commit('wabs/userUpdate', wabs.user);
    },
    generateProgress2Degree(context, config) {
        context.commit('setLoading', true)
        context.commit('setHasMessage', null)

        const request = {
            method: "POST",
            url: "https://api.byu.edu/advisement/v1.0/student/" + config.student.byuId + "/progressToDegree/" + config.yearTerm,
            body: {yearTerm: config.yearTerm}
        }
        if (config.overrideStudentPrograms) {
            request.body.overrideStudentPrograms = config.overrideStudentPrograms
        }
        if (config.whatIf) {
            request.body.whatIf = config.whatIf
        }
        // if (!config.refresh) {
        //     request.url += "?max-ms-cage=1"
        // }

        return new Promise((resolve, reject) => {
            this.app.$byu.auth.request(request, (body, status) => {
                context.commit('setLoading', false)
                if (status === 200)
                {
                    body = JSON.parse(body)
                    if (config.overrideStudentPrograms) {
                        context.commit('addToMajorShopping', body)
                    }
                    else
                    {
                        if (!body.academicSummary.undergraduate) {
                            body = null
                            // lert('The progress to degree analysis is not available for graduate students at this time.  You should continue to generate your graduate progress report')
                        }
                        context.commit('setProgress2Degree', body)
                    }
                    resolve(body)
                }
                else
                {
                    if (status === 401) {
                        window.location.reload()
                    }
                    else if (status === 404)
                    {
                        context.commit('setHasMessage', 'No academic information found.')
                    }
                    else {
                        context.commit('setHasMessage', 'An error occurred generating progress report.')
                    }
                    console.error(`${status} - ${body}`)
                    resolve(null)
                }
            })
        })
    },
    generatePdf (context, servicePath) {
        context.commit('setLoading', true)
        context.commit('setHasMessage', 'Generating PDF')

        const request = {
            method: "GET",
            url: servicePath
        }
        return new Promise((resolve, reject) => {
            this.app.$byu.auth.request(request, (body, status) => {
                context.commit('setLoading', false)
                if (status === 200)
                {
                    context.commit('setPdf', body)
                    resolve(body)
                }
                else
                {
                    if (status === 401) {
                        window.location.reload()
                    }
                    else if (status === 404)
                    {
                        context.commit('setHasMessage', 'No pdf information found.')
                    }
                    else {
                        context.commit('setHasMessage', 'An error occurred generating the pdf.')
                    }
                    resolve(null)
                }
            })
        })
    },

    getUndergraduatePrograms(context, config) {
        context.commit('setLoading', true)
        context.commit('setHasMessage', null)

        const request = {
            method: "GET",
            url: "https://api.byu.edu/academicProgramYAPI/v1.0/undergraduate"
        }
        if (config.minors)
        {
            request.url += "?minors=true"
        }
        return new Promise((resolve, reject) => {
            this.app.$byu.auth.request(request, (body, status) => {
                context.commit('setLoading', false)
                if (status === 200)
                {
                    body = JSON.parse(body)
                    if (config.minors)
                    {
                        context.commit('setMinorPrograms', body.content)
                    }
                    else
                    {
                        context.commit('setUndergraduatePrograms', body.content)
                    }
                    resolve(body)
                }
                else
                {
                    if (status === 401) {
                        window.location.reload()
                    }
                    else if (status === 404)
                    {
                        context.commit('setHasMessage', 'No academic programs found.')
                    }
                    else {
                        context.commit('setHasMessage', 'An error occurred generating progress report.')
                    }
                    console.error(`${status} - ${body}`)
                    resolve(null)
                }
            })
        })
    },

    generateTeachingAreaClasses(context, config) {
        context.commit('setLoading', true)
        context.commit('setHasMessage', null)

        const request = {
            method: "PUT",
            url: "https://api.byu.edu/curriculumYAPI/v1.0/teachingArea/rule/courses",
            body: config.value
        }
        return new Promise((resolve, reject) => {
            this.app.$byu.auth.request(request, (body, status) => {
                context.commit('setLoading', false)
                if (status === 200)
                {
                    body = JSON.parse(body)
                    context.commit('setTeachingAreaClasses', body)
                    resolve(body)
                }
                else
                {
                    if (status === 401) {
                        window.location.reload()
                    }
                    else if (status === 404)
                    {
                        context.commit('setHasMessage', 'No teaching area classes found.')
                    }
                    else {
                        context.commit('setHasMessage', 'An error occurred generating teaching area classes.')
                    }
                    console.error(`${status} - ${body}`)
                    resolve(null)
                }
            })
        })
    },
};
