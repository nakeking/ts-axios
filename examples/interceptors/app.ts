import axios from "../../src";

axios.interceptors.request.use((config) => {
    console.log(config, 'request');
    config.headers.test += '1'
    return config
})

axios.interceptors.request.use((config) => {
    console.log(config, 'request');
    config.headers.test += '2'
    return config
})

axios.interceptors.response.use((res) => {
    console.log(res, 'response');

    return res
})

axios.request({
    url: '/extend/post',
    method: 'post',
    headers: {
        test: '1'
    },
    data: {
        msg: 'hello'
    }
}).then(res => {
    console.log(res.data)
})