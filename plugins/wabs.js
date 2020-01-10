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


//////////////////////////////////////////////////////
//                                                  //
//      TRANSLATE WABS EVENTS TO VUEX COMMITS       //
//                                                  //
//////////////////////////////////////////////////////

document.addEventListener('wabs-auth-login', event => {
    if (window.$nuxt) window.$nuxt.$store.commit('wabs/userUpdate', event.detail)
});

document.addEventListener('wabs-auth-logout', event => {
    if (window.$nuxt) window.$nuxt.$store.commit('wabs/userUpdate', null)
});

document.addEventListener('wabs-access-token-update', event => {
    if (window.$nuxt) {
        window.$nuxt.$store.commit('wabs/authUpdate', {
            accessToken: event.detail,
            expires: byu.auth.expires
        })
    }
});