import request from '../utils/request';

const URL = '/admin/message'
/**
 * 获取所有
 * @returns {AxiosPromise}
 */
export function fetchMessages(num,size){
    return request({
        url: URL +'',
        method: 'GET',
        params: {
            pageNum:num,
            pageSize:size
        }
    })
}

export function deleteMessage(id) {
    return request({
        url: URL + '/' +id,
        method: 'DELETE'
    })
}
