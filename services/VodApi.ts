import request from '../utils/request'

export type VodHomeNewParams = {
    num: number
}

export type VodFindYouLikeParams = {
    typeId: number,
    vodClass: string,
    num: number
}

export type VodFindByIdParams = {
    vodId: number
}

export type VodFindListParams = {
    pageIndex: number,
    pageSize: number,
    typeId: number, 
    vodClass?: string, 
    orderBy?: string
}

export type VodSearchParams = {
    pageIndex: number,
    pageSize: number,
    keyword: string
}

class VodApi {
    static isClick = true
    static delay = 1000
    static url = '/vod'

    static homeNew(params: VodHomeNewParams) {
        return request({
            url: this.url + '/homeNew',
            params
        })
    }

    static findYouLike(params: VodFindYouLikeParams) {
        return request({
            url: this.url + '/findYouLike',
            params
        })
    }

    static findById(params: VodFindByIdParams) {
        return request({
            url: this.url + '/findById',
            params
        })
    }

    static findList(params: VodFindListParams) {
        return request({
            url: this.url + '/findList',
            params
        })
    }

    static search(params: VodSearchParams) {
        return request({
            url: this.url + '/search',
            params
        })
    }
}

export default VodApi