import axios from "../../src";

axios({
    url: '/extend/get',
    method: 'GET',
    data: {
        msg: 'hello'
    }
})

axios.request({
    url: '/extend/post',
    method: 'post',
    data: {
        msg: 'hello'
    }
})

axios.get('/extend/get')

axios.options('/extend/options')

axios.delete('/extend/delete')

axios.head('/extend/head')

axios.post('/extend/post', {msg: 'post'})

axios.put('/extend/put', {msg: 'put'})

axios.patch('/extend/patch', {msg: 'patch'})