import LazyForm from './LazyForm/index'
import LazyDialog from './LazyDialog/index'
import { ColorVar, InputTypes, Iposition, Iresize, Isize } from './constant'

import './index.css'
const LazyUi: any = {
    install: (app: any) => {
        app.use(LazyForm)
        app.use(LazyDialog)
    }
}

//按需导出插件
export { LazyForm, LazyDialog, ColorVar, InputTypes, Iposition, Iresize, Isize }

//全局注册插件
export default LazyUi;
