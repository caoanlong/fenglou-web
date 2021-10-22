import request from '../utils/request'

export type CityFindAllParams = {
    pId: number
}

class CityApi {
    static isClick = true
    static delay = 1000
    static url = '/city'

    static findAll(params: CityFindAllParams) {
        return request({
            url: this.url + '/findAll',
            params
        })
    }
}

export default CityApi