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

// export state as a function
export const state = () => ({
    searchResults: null,
    searchTerm: null
});

// export mutations object
export const mutations = {
    searchResults(state, newResults) {
        state.searchResults = JSON.parse(JSON.stringify(newResults))
    },
    searchTerm(state, search) {
        state.searchTerm = search
    }
};

export const actions = {
    getContexts: async function(context) {
        const request = {
            method: "GET",
            url: "https://api.byu.edu/accessManagement/v1/domains/dropdown"
        }
        return new Promise((resolve, reject) => {
            this.app.$byu.auth.request(request, (body, status) => {
                if (status === 200)
                {
                    resolve ({data: body, status: 200})
                }
                else
                {
                    if (status === 401) {
                        window.location.reload()
                    }
                    console.error(`${status} - ${body}`)
                    resolve ({data: null, status: status})
                }
            })
        })
    },
    getSearchResults: async function(context, search) {
        search.term = search.term.trim()
        const request = {
            method: "GET",
            url: "https://api.byu.edu/accessManagement/v1/webResource/pattern/" + search.term
        }
        if(search.productId) {
            request.url += '/domain/' + search.productId
        }
        return new Promise((resolve, reject) => {
            this.app.$byu.auth.request(request, (body, status) => {
                if (status === 200)
                {
                    let response = JSON.parse(body)
                    resolve ({data: response.content, status: 200})
                }
                else
                {
                    if (status === 401) {
                        window.location.reload()
                    }
                    console.error(`${status} - ${body}`)
                    resolve ({data: null, status: status})
                }
            })
        })
    },
    getResultsInContext: async function(context, productId) {
        const request = {
            method: "GET",
            url: "https://api.byu.edu/accessManagement/v1/webResource"
        }
        if(search.productId) {
            request.url += '?productId=' + productId
        }
        return new Promise((resolve, reject) => {
            this.app.$byu.auth.request(request, (body, status) => {
                if (status === 200)
                {
                    resolve ({data: body, status: 200})
                }
                else
                {
                    if (status === 401) {
                        window.location.reload()
                    }
                    console.error(`${status} - ${body}`)
                    resolve ({data: null, status: status})
                }
            })
        })
    }
}
