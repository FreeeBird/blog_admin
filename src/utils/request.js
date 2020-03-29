import axios from 'axios'
// import router from '@/plugins/router'
import Qs from 'qs'
import vue from 'vue'

const BASE_API = 'http://localhost:8888/blog/api';
// 创建axios实例
const service = axios.create({
    // baseURL: process.env.BASE_API, // api 的 base_url
    baseURL: BASE_API,

    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    transformRequest: [function(data) {
        data = Qs.stringify(data)
        return data
    }],
    timeout: 5000 // 请求超时时间
})
service.defaults.withCredentials = true;
// response 拦截器
service.interceptors.response.use(
    response => {
        const res = response
        if(res.status !== 200){
            vue.prototype.$message.error(res.statusText)
        }
        return res.data;
    },
    error => {
        console.log('http_err: ' + error) // for debug
        // this.$message.error(error)
        // router.push('/');
        return Promise.reject(error)
    }
)



export default service
