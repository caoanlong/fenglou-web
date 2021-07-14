import request from '../utils/request'

export type CommonHomeParams = {
    num: number
}

class CommonApi {
    static isClick = true
    static delay = 1000
    static url = '/common'

    static info() {
        return request({
            url: this.url + '/info'
        })
    }
    static home(params: CommonHomeParams) {
        return request({
            url: this.url + '/home',
            params
        })
    }
}

export default CommonApi