import request from '../utils/request'

export type PostFindYouLikeParams = {
    cityId?: number,
    tagIds?: string,
    num?: number
}

export type PostFindByIdParams = {
    id: number
}

export type PostFindListParams = {
    pageIndex: number,
    pageSize: number,
    cityId?: number, 
    tagId?: number, 
    title?: string
}

class PostApi {
    static isClick = true
    static delay = 1000
    static url = '/post'

    static findAll() {
        return request({
            url: this.url + '/findAll'
        })
    }

    static findYouLike(params: PostFindYouLikeParams) {
        return request({
            url: this.url + '/findYouLike',
            params
        })
    }

    static findById(params: PostFindByIdParams) {
        return request({
            url: this.url + '/findById',
            params
        })
    }

    static findList(params: PostFindListParams) {
        return request({
            url: this.url + '/findList',
            params
        })
    }
}

export default PostApi