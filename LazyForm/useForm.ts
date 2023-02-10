import { ref, watchEffect, defineExpose } from "vue";
import { FormConfig, FormField, ILazyFormPorps, InputTypes } from "../type";
import { toArray, isEmpty } from 'wsp-toolkit';

export function useLazyForm(config: FormConfig, formData: any) {


    const dialogRef = ref<{ show: () => null }>()
    const formRef = ref()
    /**获取校验规则 */
    const getRules = (field: FormField) => {
        const itemRules = toArray((config?.formRules ?? {})[field.prop]).concat(toArray(field.rules));
        if (field.required && !field.rules?.find((rule: any) => rule.required)) {

            return itemRules.concat([
                {
                    required: true,
                    message: [InputTypes.input, InputTypes.textarea,].includes(field.type! ?? InputTypes.input,) ? '请输入' + field.label : '请选择' + field.label,
                },
            ]);
        }

        return itemRules;
    }
    /**排版 */
    const getSpan = (field: FormField) => {
        let span = field.copies ? (24 / field.copies) : field.span || 12

        return span;
    };

    /**事件...*/
    const visibleChange = (field: FormField, formKey: string) => { }
    const removeTag = (field: FormField, formKey: string) => { }
    /**清空事件*/
    const Clear = (value: any, field: FormField, formKey: string) => {
        if (config.formClear)
            config.formClear({ prop: field.prop, value, field, formKey })
        if (field.clear)
            field.clear({ prop: field.prop, value, field, formKey })
    }
    /**失焦事件*/
    const Blur = (value: any, field: FormField, formKey: string) => {
        if (config.formBlur)
            config.formBlur({ prop: field.prop, value, field, formKey })
        if (field.blur)
            field.blur({ prop: field.prop, value, field, formKey })
    }
    /**获取焦点事件 */
    const Foucs = (value: any, field: FormField, formKey: string) => {
        if (config.formFoucs)
            config.formFoucs({ prop: field.prop, value, field, formKey })
        if (field.foucs)
            field.foucs({ prop: field.prop, value, field, formKey })
    }
    /**值改变事件 */
    const Change = (value: any, field: FormField, formKey: string) => {
        if (config.formChange)
            config.formChange({ prop: field.prop, value, field, formKey })
        if (field.change)
            field.change({ prop: field.prop, value, field, formKey })
    }
    const FieldClick = (value: any, field: FormField, formKey: string) => {
        if (field.type === InputTypes.searchtable) {
            if (Array.isArray(dialogRef?.value)) {
                dialogRef?.value.forEach((e, i) => {
                    if (e.dialogKey === field.prop)
                        e.show()
                })
            }

        }
        if (config.formFieldClick)
            config.formFieldClick({ prop: field.prop, value, field, formKey })
        if (field.fieldClick) {
            field.fieldClick({ prop: field.prop, value, field, formKey })
        }

    }
    /**
     * 表格选择数据确定
     */

    /**
     *  改变主题
     */
    const changeTheme = () => {
        // document.documentElement.style.setProperty('--el-color-primary', 'red')
        config.themeColors?.forEach((e) => {
            document.documentElement.style.setProperty(e.varName, e.value)

        })
    }
    changeTheme()
    /**
     * 导出
     */
    return {
        getRules,
        formRef,
        dialogRef,
        getSpan,
        visibleChange, removeTag, Clear, Blur, Foucs, Change, FieldClick,
    }
}

