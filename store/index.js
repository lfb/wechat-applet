export default {
    data: {
        loadingNumber: 0,
        // 是否显示loading
        isLoading() {
            return this.loadingNumber > 0
        },
    }
}
