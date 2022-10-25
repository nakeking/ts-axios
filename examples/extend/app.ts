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

interface ResponseData<T> {
    code: number
    result: T
    message: string
}

interface User {
    name: string,
    age: number
}

async function getUser() {
    let user = await axios.get<ResponseData<User>>('/extend/user')

    if(user) {
        console.log(user.data.result.age);
    }
}

getUser();