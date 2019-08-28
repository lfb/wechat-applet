const app = getApp()
import regeneratorRuntime from '../../utils/runtime'

import create from '../../utils/create'
import store from '../../store/index'
import article from '../../api/article'


create(store, {
    data: {
        hidden: true,
        isSHowHeaders: true
    },

    onLoad: function () {
        // 测试使用 async/await 异步获取数据
        this.getArticle();
    },

    // 获取文章列表数据
    async getArticle() {
        try {
            const data = {
                page: 1,
                category: 'js'
            }
            const r = await article.list(data);
            console.log(r);

        } catch (e) {

        }
    },

    // 控制组件的方法
    showHeaders(e) {
        this.setData({
            isSHowHeaders: e.detail
        })
    }
})
