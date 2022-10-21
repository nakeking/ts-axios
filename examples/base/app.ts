import axios from '../../src/index'

axios({
    method: 'get',
    url: '/base/get',
    params: {
        foo: ['bar', 'baz']
    }
})

axios({
    method: 'GET',
    url: '/base/get',
    params: {
        foo: {
            bar: 'bar'
        }
    }
})

const date = new Date()

axios({
    method: 'get',
    url: '/base/get',
    params: {
        date
    }
})


axios({
    method: 'get',
    url: '/base/get',
    params: {
        baz: 'baz',
        foo: null
    }
})

axios({
    method: 'GET',
    url: '/base/get',
    params: {
        foo: '@:$+'
    }
})

axios({
    method: "POST",
    url: '/base/post',
    data: {
        foo: {
            bar: 'bar'
        }
    }
})

const arr = new Int32Array([21, 31])

axios({
    method: 'post',
    url: '/base/buffer',
    data: arr
})