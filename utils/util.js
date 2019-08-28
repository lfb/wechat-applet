import store from '../store/index';

const formatTime = date => {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()

    return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
    n = n.toString()
    return n[1] ? n : '0' + n
}

// 转码base64图片
const getBase64ImageUrl = (base64Data) => {
    base64Data = wx.arrayBufferToBase64(wx.base64ToArrayBuffer(base64Data));
    const base64ImgUrl = "data:image/png;base64," + base64Data;

    return base64ImgUrl;
}

// 开启loading
const showLoading = (title = '加载中') => {
    let isLoading = store.data.isLoading;

    if (!isLoading) {
        wx.showLoading({
            title,
            mask: true
        });
        wx.showNavigationBarLoading();
    }
    store.data.loadingNumber++;
}

// 关闭loading
const hideLoading = () => {
    setTimeout(() => {
        store.data.loadingNumber--;
        let isLoading = store.data.isLoading;

        if (!isLoading) {
            wx.hideLoading();
            wx.hideNavigationBarLoading();
        }
    }, 300)

}

/**
 *
 * @param title 提示信息，最多显示 7 个汉字长度
 * @param icon 类型：none, success, loading
 */
const showToast = (title, icon = 'none') => {
    wx.showToast({
        title,
        icon
    })
}

const showModal = (content,) => {
    wx.showModal({
        title: '提示',
        content,
        showCancel: false,
        success(res) {

        }
    })

}

module.exports = {
    formatTime,
    getBase64ImageUrl,
    showLoading,
    hideLoading,
    showToast,
    showModal
}
