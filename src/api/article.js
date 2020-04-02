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
export const fetchDrafts = (num,size) => {
    return request({
        url: URL + '/draft',
        method: 'GET',
        params: {
            pageNum :num,
            pageSize:size
        }
    });
};



export function publishArticle(article){
    return request({
        url: URL +'',
        method: 'POST',
        data: article
    })
}
