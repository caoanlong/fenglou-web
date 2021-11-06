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

    static findDetail(params: PostFindByIdParams) {
        return request({
            url: this.url + '/findDetail',
            params
        })
    }

    static findList(params: PostFindListParams) {
        return request({
            url: this.url + '/findList',
            params
        })
    }
    static getContactInfo(params: PostFindByIdParams) {
        return request({
            url: this.url + '/getContactInfo',
            params
        })
    }
    static isBought(params: PostFindByIdParams) {
        return request({
            url: this.url + '/isBought',
            params
        })
    }
}

export default PostApi