class Watcher {
    constructor(vm, expr, cb) {
        this.vm = vm;
        this.expr = expr;
        this.cb = cb;

        // 缓存当前值
        this.value = this.get();
    }

    get() {
        // 把当前订阅者添加到全局
        Dep.target = this;
        const value = this.vm.$data[this.expr];
        Dep.target = null;
        return value;
    }
    // 提供一个更新方法
    update() {
        // 获取新值
        const newValue = this.vm.$data[this.expr];
        const oldValue = this.value;
        if (newValue !== oldValue) {
            this.cb(newValue);
        }
    }
}