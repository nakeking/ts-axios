import axios, { Canceler } from "../../src";

const CancelToken = axios.CancelToken
const source = CancelToken.source()

axios.get('/cancel/get', {
    cancelToken: source.token
}).catch((err) => {
    if(axios.isCancel(err)) {
        console.log('Request canceled', err.message)
    }
})

setTimeout(() => {
    source.cancel("Operation canceled by the user.")

    axios.post('/cancel/post', {a: 1}, {
        cancelToken: source.token
    }).catch((err) => {
        if(axios.isCancel(err)) {
            console.log(err.message)
        }
    })
}, 100)


let cancel: Canceler

axios.get('/cancel/get', {
    cancelToken: new CancelToken(c => {
        cancel = c
    })
}).catch((err) => {
    if(axios.isCancel(err)) {
        console.log('Request canceled')
    }
})

setTimeout(() => {
    cancel()
}, 200)