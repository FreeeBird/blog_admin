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
        param: {
            pageNum:num,
            pageSize:size
        }
    })
}
