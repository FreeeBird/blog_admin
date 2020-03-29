import request from '../utils/request';

const URL = '/admin/blogInfo'

export function fetchBlogInfo(){
    return request({
        url: URL +'',
        method: 'GET',
    })
}

export function saveBlogInfo(data){
    return request({
        url: URL +'',
        method: 'POST',
        data:data
    })
}
