import request from '../utils/request';
import axios from 'axios'

export function userLogin(query) {
    return request({
        url: '/login',
        method: 'POST',
        data: query
    })
}

export function userLogout() {
    return request({
        url: '/logout',
        method: 'POST',
    })
}



export function uploadImg(formdata ){
    return axios.create({
        url: '/blog/api/admin/upload/img',
        method: 'post',
        data: formdata,
        headers: { 'Content-Type': 'multipart/form-data' },
    })

}
