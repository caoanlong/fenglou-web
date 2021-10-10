import request from '../utils/request'

class VipApi {
    static isClick = true
    static delay = 1000
    static url = '/vip'

    static findAll() {
        return request({
            url: this.url + '/findAll'
        })
    }

    static findPayVips() {
        return request({
            url: this.url + '/findPayVips'
        })
    }

    static findById({ vipId }: { vipId: number }) {
        return request({
            url: this.url + '/findById'
        })
    }
}

export default VipApi