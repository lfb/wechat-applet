import {config} from '../config'
import util from '../utils/util'

export default {
    request({url, data = {}, method = 'GET', shouldLoading = true}) {
        return new Promise((resolve, reject) => {
            if (shouldLoading) {
                util.showLoading('Loading..')
            }

            this._request(url, resolve, reject, data, method, shouldLoading)
        })
    },

    _request(url, resolve, reject, data, method, shouldLoading) {
        wx.request({
            url: config.apiBaseUrl + url,
            data,
            method,
            header: {
                'content-type': 'application/json',
                'Authorization': 'Bearer ' + wx.getStorageSync('project_name_user_token')
            },
            success: (res) => {
                const statusCode = res.statusCode
                const {excludeCode} = data
                const message = res.data.message

                if (excludeCode !== statusCode) {
                    switch (statusCode) {
                        case 401:
                            wx.removeStorageSync('project_name_user_token')
                            util.showModal(message || '401 未授权')
                            break

                        case 404:
                            util.showModal(message || '404 资源不存在！')
                            break

                        case 500:
                            util.showModal( message || '500 未知错误！')
                            break
                    }
                }

                // Overwrite old token if the backend returns a new token
                const newToken = res.header['New-Token']
                if (newToken) {
                    wx.setStorage({
                        key: "project_name_user_token",
                        data: newToken
                    })
                }

                if (statusCode === 200 || statusCode === 204 || statusCode === 304) {
                    resolve(res)

                } else {
                    reject(res)
                }

                if (shouldLoading) {
                    util.hideLoading()
                }

            },
            // 失败处理
            fail: (err) => {
                if (shouldLoading) {
                    util.hideLoading()
                }
                util.showModal(err.data.message || '未知错误，请重试！')

                reject(err)
            }
        })
    }
}
