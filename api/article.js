import http from '../core/http'

export default {
    // 获取文章列表
    list(data) {
        return http.request({
            url: '/article',
            method: 'GET',
            data
        })
    },
}
