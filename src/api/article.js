import request from '../utils/request';

const URL = '/admin/article'

export const fetchArticles = (num,size) => {
    return request({
        url: URL + '',
        method: 'GET',
        params: {
            pageNum :num,
            pageSize:size
        }
    });
};
// http://localhost:8888/blog/api/blogger



export function publishArticle(a){
    return request({
        url: URL +'',
        method: 'POST',
        data:a
    })
}
