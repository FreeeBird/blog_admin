import request from '../utils/request';

const URL = '/admin/blogger'

export function fetchBlogger(){
    return request({
        url: URL +'',
        method: 'GET',
    })
}

export function saveBlogger(data){
    return request({
        url: URL +'',
        method: 'POST',
        data:data
    })
}
