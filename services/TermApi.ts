import request from '../utils/request'

class TermApi {
    static isClick = true
    static delay = 1000
    static url = '/term'

    static categorys() {
        return request({
            url: this.url + '/categorys'
        })
    }
}

export default TermApi