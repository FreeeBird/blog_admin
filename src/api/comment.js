import request from '../utils/request';

const URL = '/admin/comment'
/**
 * 获取所有
 * @returns {AxiosPromise}
 */
export function fetchComment(num,size){
    return request({
        url: URL +'',
        method: 'GET',
        params: {
            pageNum:num,
            pageSize:size
        }
    })
}

export function deleteComment(id) {
    return request({
        url: URL + '/'+ id,
        method: 'DELETE'
    })
}
