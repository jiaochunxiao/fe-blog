class Observer {
    constructor(data) {
        // 提供解析方法，完成属性分析和数据劫持
        this.observer(data);
    }
    // 解析数据，完成对数据属性的挟持，
    observer(data) {
        // 判断数据有效性
        if (!data || typeof data !== 'object') {
            return
        }
        // 针对当前属性对象的重新定义（挟持）
        const keys = Object.keys(data);
        keys.forEach(key => {
            this.defineReactive(data, key, data[key]);
        });
    }
    //
    defineReactive(obj, key, val) {
        const dep = new Dep();
        // 重新定义
        // 目标对象， 属性名，属性配置
        Object.defineProperty(obj, key, {
            enumerable: true,
            configurable: false,
            get() {
                // 针对 watcher 创建时，直接完成发布订阅通知
                Dep.target && dep.addSub(Dep.target);
                return val;
            },
            set(newVal) {
                val = newVal;
                dep.notify();
            }
        });
    }
}

// 创建发布者
// 管理订阅，通知
class Dep {
    constructor() {
        this.subs = [];
    }
    // 添加订阅
    addSub(sub) {
        this.subs.push(sub);
    }
    // 集体通知
    notify() {
        this.subs.forEach(sub => {
            sub.update();
        })
    }
}