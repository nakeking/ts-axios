import axios from "../../src";
import NProgress from 'nprogress'

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

const instance2 = axios.create()

function calculatePercentage(loaded: number, total: number): number {
    return Math.floor(loaded * 1.0) / total
}

function loadProgressBar() {
    const setupStartProgress = () => {
        instance2.interceptors.request.use(config => {
            NProgress.start()
            return config
        })
    }

    const setupUpdateProgress = () => {
        const update = (e: ProgressEvent) => {
            console.log(e)
            NProgress.set(calculatePercentage(e.loaded, e.total))
        }

        instance2.defaults.onDownloadProgress = update
        instance2.defaults.onUploadProgress = update
    }

    const setupStopProgress = () => {
        instance2.interceptors.response.use(response => {
            console.log('end')
            NProgress.done()
            return response
        }, error => {
            NProgress.done()
            return Promise.reject(error)
        })
    }

    setupStartProgress()
    setupUpdateProgress()
    setupStopProgress() 
}
loadProgressBar()

const downloadEl = document.getElementById('download')
downloadEl?.addEventListener('click', evt => {
    instance2.get('https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fup.enterdesk.com%2Fphoto%2F2012-3-2%2Fenterdesk.com-B526ECADD33DBD367676A93E051BA1EC.jpg&refer=http%3A%2F%2Fup.enterdesk.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1669880673&t=93a2823ebbede6d604cd6af8ec3df9be')
})

const uploadEl = document.getElementById('upload')
uploadEl?.addEventListener('click', evt => {
    const data = new FormData()
    const fileEl = document.getElementById('file') as HTMLInputElement
    if(fileEl.files) {
        data.append('file', fileEl.files[0])

        instance2.post('/more/upload', data)
    }
})

axios.get('/more/304').then(res => {
    console.log(res);
}).catch(err => {
    console.log(err.message)
})

axios.get('/more/304', {
    validateStatus(status) {
        return status >= 200 && status < 400
    }
}).then(res => {
    console.log(res)
}).catch(err => {
    console.log(err.message)
})

const instance3 = axios.create({
    baseURL: 'https://gimg2.baidu.com/image_search/'
})

instance3.get('src=http%3A%2F%2Fup.enterdesk.com%2Fphoto%2F2012-3-2%2Fenterdesk.com-B526ECADD33DBD367676A93E051BA1EC.jpg&refer=http%3A%2F%2Fup.enterdesk.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1669880673&t=93a2823ebbede6d604cd6af8ec3df9be')

instance3.get('https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fup.enterdesk.com%2Fphoto%2F2012-3-2%2Fenterdesk.com-B526ECADD33DBD367676A93E051BA1EC.jpg&refer=http%3A%2F%2Fup.enterdesk.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1669880673&t=93a2823ebbede6d604cd6af8ec3df9be')