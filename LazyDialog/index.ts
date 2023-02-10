import LazyDialog from './index.vue';



//将组件注册为插件 导出
export default {
    install: (app: any) => {
        app.component(LazyDialog.name, LazyDialog)
    }
}
