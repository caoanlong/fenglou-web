import request from '../utils/request'

class MoneyApi {
    static isClick = true
    static delay = 1000
    static url = '/money'

    static findAll() {
        return request({
            url: this.url + '/findAll'
        })
    }

    static findById({ vipId }: { vipId: number }) {
        return request({
            url: this.url + '/findById'
        })
    }
}

export default MoneyApi