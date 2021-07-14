import request from '../utils/request'

class VodTypeApi {
    static isClick = true
    static delay = 1000
    static url = '/type'

    static findAll() {
        return request({
            url: this.url + '/findAll'
        })
    }
}

export default VodTypeApi