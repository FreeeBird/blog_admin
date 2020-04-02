import request from '../utils/request';


const URL = '/admin/link'
/**
 * 获取所有
 * @returns {AxiosPromise}
 */
export function fetchLinks(num,size){
    return request({
        url: URL +'',
        method: 'GET',
        params: {
            pageNum:num,
            pageSize:size
        }
    })
}

export function saveLink(data) {
    return request({
        url: URL + '',
        method: 'POST',
        data: data
    })
}

export function updateLink(data) {
    return request({
        url: URL + '',
        method: 'PUT',
        data: data
    })
}

export  function deleteLink(id) {
 return request({
     url: URL +'/'+id,
     method: 'DELETE'
 })
}
