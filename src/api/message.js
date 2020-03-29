import request from '../utils/request';

// const URL = '/admin/message'
const URL = '/message'
/**
 * 获取所有
 * @returns {AxiosPromise}
 */
export function fetchMessages(num,size){
    return request({
        url: URL +'',
        method: 'GET',
        param: {
            pageNum:num,
            pageSize:size
        }
    })
}
