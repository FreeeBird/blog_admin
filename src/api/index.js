import request from '../utils/request';

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
