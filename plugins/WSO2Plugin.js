import wso2Request from './WSO2Request'
import Vue from 'vue';

export default function({ app }) {
    Vue.use({
        install: function (Vue) {
            Vue.prototype.$WSO2Request = wso2Request
        }
    })

    app.$WSO2Request = wso2Request
}