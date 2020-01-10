import axios from '~/plugins/axios'

export default function(wabs, path, options, maxRetries) {

    function sleep(ms)
    {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    function wso2Axios(config, retry)
    {
        retry = retry || 0
        return axios(config).then(response => {
            if (response.status < 400)
            {
                return response
            }
            if (response.status >= 500)
            {
                if (retry < maxRetries)
                {
                    return sleep(200).then(() => {
                        retry += 1
                        return wso2Axios(config, retry)
                    })
                }
                return response
            }
            if (response.status === 401 && config.loginOn401)
            {
                wabs.auth.login()
                return response
            }
            if (response.status === 403)
            {
                if (retry < maxRetries)
                {
                    //I need to wait until the token is refreshed
                    wabs.auth.refreshToken(function () {
                        config.headers["authorization"] = "Bearer " + wabs.auth.accessToken;
                        retry += 1
                        return wso2Axios(config, retry)
                    })
                }
            }
            return response
        })
    }

    const defaultConfig = {
        method: 'GET',
        mode: 'cors',
        loginOn401: true,
        validateStatus: function (status) {
            return true
        },
        url: 'https://api.byu.edu' + path
    }

    const config = typeof options === 'string' ? { url: options } : Object.assign(defaultConfig, options);

    if (typeof config.url !== 'string') throw Error('Missing required property: url');
    if (!config.method) config.method = 'GET';
    config.method = config.method.toUpperCase();

    // put all header names to lower case
    const headers = {};
    if (!config.headers) config.headers = {};
    Object.keys(config.headers)
        .forEach(function(name) {
            headers[name.toLowerCase()] = config.headers[name];
        });
    headers["authorization"] = "Bearer " + wabs.auth.accessToken
    config.headers = headers;

    // if the data is an object then stringify and add
    if (config.data && typeof config.data === 'object') {
        if (!config.headers['content-type'])
        {
            config.headers['content-type'] = 'application/json';
        }
        // config.data = JSON.stringify(config.data);
    }

    maxRetries = maxRetries || 2

    return wso2Axios(config)
}