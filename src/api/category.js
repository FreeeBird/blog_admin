import request from '../utils/request';

const URL = '/admin/category'

/**
 * 获取所有分类
 * @returns {AxiosPromise}
 */
export function fetchCategories(num,size){
    return request({
        url: URL +'',
        method: 'GET',
        params: {
            pageNum :num,
            pageSize:size
        }
    })
}


export function saveCategory(data) {
    return request({
        url: URL + '',
        method: 'PUT',
        data: data
    })
}
export function addCategory(data) {
    return request({
        url: URL + '',
        method: 'POST',
        data: data
    })
}


export function deleteCategory(id) {
    return request({
        url : URL + '/'+ id,
        method: 'DELETE'
    })
}
