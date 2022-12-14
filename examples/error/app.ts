import axios, { AxiosError } from '../../src/index'

axios({
    method: 'GET',
    url: '/error/get1'
}).then(res => {
    console.log(res)
}).catch(err => {
    console.log(err)
})

axios({
    method: 'GET',
    url: '/error/get'
}).then(res => {
    console.log(res)
}).catch(err => {
    console.log(err)
})

axios({
    method: 'GET',
    url: '/error/timeout',
    timeout: 2000
}).then(res => {
    console.log(res)
}).catch((err: AxiosError) => {
    console.log(err.code)
    console.log(err.config)
    console.log(err.request)
    console.log(err.message)
    console.log(err.isAxiosError)
})