import request from '../utils/request';

const URL = '/admin/statistics'

export function fetchStat() {
    return request({
        url: URL,
        method: 'GET',
    })
}

/**
 * 获取所有分类
 * @returns {AxiosPromise}
 */
export function fetchDaily(){
    return request({
        url: URL +'/daily',
        method: 'GET',
    })
}


export function fetchMonthly() {
    return request({
        url: URL +'/monthly',
        method: 'GET',
    })
}
export function fetchWeekly() {
    return request({
        url: URL +'/weekly',
        method: 'GET',
    })
}



