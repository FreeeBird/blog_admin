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


export const fetchData = query => {
    return request({
        url: './table.json',
        method: 'get',
        params: query
    });
};
export function fetchTest(query){
    return request({
        url: '/blogger',
        method: 'GET',
        params: query
    });
}

// export const fetchTest = query => {
//     return request({
//         url: '/blogger',
//         method: 'GET',
//         params: query
//     });
// };
// http://localhost:8888/blog/api/blogger

export function uploadImg(formdata ){
    return axios.create({
        url: '/blog/api/admin/upload/img',
        method: 'post',
        data: formdata,
        headers: { 'Content-Type': 'multipart/form-data' },
    })

}
