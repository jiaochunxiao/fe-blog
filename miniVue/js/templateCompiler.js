class TemplateCompiler {
    // 构造函数
    // el 视图线索
    // vm 全局vm对象
    constructor(el, vm) {
        this.el = this.isElementNode(el) == 1 ? el : document.querySelector(el);
        this.vm = vm;

        if (this.el) {
            const fragment = this.node2fragment(this.el);
            this.compile(fragment);
            this.el.appendChild(fragment);
        }
    }

    /* 工具方法 */
    isElementNode(node) {
        return node.nodeType === 1;
    }
    isTextNode(node) {
        return node.nodeType === 3;
    }
    toArray(fakeArray) {
        return [].slice.call(fakeArray);
    }
    isDirective(attrName) {
        return attrName.indexOf('v-') >= 0;
    }

    /* 核心方法 */
    // 把模板放入内存等待解析
    node2fragment(node) {
        // 创建内存片段
        const fragment = document.createDocumentFragment();
        let child;
        // 把模板内容丢到内存
        while (child = node.firstChild) {
            fragment.appendChild(child);
        }
        // 返回
        return fragment;

    }
    compile(parent) {
        // 获取子节点
        const childNodes = parent.childNodes;
        const nodeArray = this.toArray(childNodes);
        const compiler = this;
        // 遍历节点
        // 判断节点类型
        console.log(nodeArray);
        nodeArray.forEach(node => {
            if (compiler.isElementNode(node)) {
                // 1 属性节点（解析指令
                compiler.compileElement(node);

            }
            // 2 文本节点 (解析指令)
            if (compiler.isTextNode(node)) {
                const textReg = /\{\{(.+)\}\}/;
                const content = node.textContent;
                if (textReg.test(content)) {
                    const expr = RegExp.$1.replace(/\s+/g, '');
                    compiler.compileText(node, expr);
                }
            }
        })


        // 如果是嵌套，继续解析
    }
    // 解析元素节点
    compileElement(node) {
        //  获取当前节点所有属性
        const arrs = node.attributes;
        const compiler = this;
        // 遍历当前元素的所有属性
        this.toArray(arrs).forEach(attr => {
            const attrName = attr.name;
            if (this.isDirective(attrName)) {
                // 收集指令类型
                // const type = attr.split('-')[1];
                const type = attrName.substr(2);
                // 指令的值等价于表达式
                const expr = attr.value;
                CompilerUtils[type](node, compiler.vm, expr);
            }
        })
    }
    // 解析文本节点 
    compileText(node, expr) {
        CompilerUtils.text(node, this.vm, expr);
    }
}

const CompilerUtils = {
    // 负责解析 text
    text(node, vm, expr) {
        // 找到更新规则对象
        const updaterFun = this.updater['textUpdater'];
        // 执行方法
        updaterFun && updaterFun(node, vm.$data[expr]);
        // 添加订阅
        new Watcher(vm, expr, newValue => {
            updaterFun && updaterFun(node, newValue);
        });
    },
    model(node, vm, expr) {
        const updaterFun = this.updater['modelUpdater'];
        updaterFun && updaterFun(node, vm.$data[expr]);
        // 添加订阅
        new Watcher(vm, expr, newValue => {
            updaterFun && updaterFun(node, newValue);
        });
        node.addEventListener('input', e => {
            const newVal = e.target.value;
            vm.$data[expr] = newVal;
        })
    },
    updater: {
        textUpdater(node, value) {
            node.textContent = value;
        },
        modelUpdater(node, value) {
            node.value = value;
        }
    }
}