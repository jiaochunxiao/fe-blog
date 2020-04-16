class MiniVue {
    constructor(options) {
        this.$vm = this;
        this.$el = options.el;
        this.$data = options.data;

        // 判断视图是否存在
        if (this.$el) {
            new Observer(this.$data);
            // 创建模板编译器，解析视图
            this.$compiler = new TemplateCompiler(this.$el, this.$vm);
        }
    }

}