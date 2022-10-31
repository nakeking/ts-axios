import axios from "../../src";

document.cookie = "a=b"

axios({
    url: '/more/get',
    method: 'GET'
})

axios.post('http://localhost:8088/more/server2', {}, {
    withCredentials: true
}).then(res => {
    console.log(res);
})

const instance = axios.create({
    xsrfCookieName: 'XSRF-TOKEN-D',
    xsrfHeaderName: 'X-XSRF-TOKEN-D'
})

instance.get('/more/get').then(res => {
    console.log(res)
})