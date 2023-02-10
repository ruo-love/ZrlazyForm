/**
 * label
 * placeholder
 * prop
 * type
 * rules
 * required
 * slot
 */

export type FormField = {
    label: string,
    placeholder?: string,
    dialogPlaceholder?: string,
    prop: string,
    type?: InputTypes,
    rules?: Array<any>,
    required?: boolean,
    slot?: string,
    span?: number,
    copies?: number,
    options?: Array<Ioptions>,
    disabled?: boolean,
    readonly?: boolean,
    checkboxMin?: number,
    checkboxMax?: number,
    size?: Isize,
    buttonStyle?: boolean,
    border?: boolean,
    clearable?: boolean,
    multiple?: boolean
    filterable?: boolean,
    remote?: boolean,
    remoteMethod?: Function,
    loading?: boolean
    allowCreate?: boolean,
    defaultFirstOption?: boolean,
    formatter?: Function,
    autosize?: boolean,
    rows?: number,
    autoPage?: boolean,
    maxlength?: number,
    minlength?: number,
    resize?: Iresize,
    gridData?: Array<any>,
    tableField?: Array<TableField>,
    rowKey?: string,
    needProps?: Array<string>
    fieldClick?: (params: EventParams) => any,
    change?: (params: EventParams) => any,
    blur?: (params: EventParams) => any,
    foucs?: (params: EventParams) => any,
    clear?: (params: EventParams) => any,
    getTableData?: (params: { page: number, pageSize: number, query: string }) => any,
    confirmSelect?: (v: any) => any,
    clickCell?: (row: any, column: any, cell: any, event: any) => any
}
/**
 * prop
 */
export type FormData = {
    [prop: string]: any
}
/**
 *formField  表单配置数组
 *formData  表单value对象
 *formKey 表单Key
 */
export interface ILazyFormPorps {
    formField: Array<FormField>;
    formData: FormData;
    formKey?: string;
    gutter?: number;
}

export enum InputTypes {
    input = 'input',
    select = 'select',
    radio = 'radio',
    checkbox = 'checkbox',
    textarea = 'textarea',
    searchtable = "searchtable"
}
export enum Iposition {
    left = 'left',
    right = 'right',
    top = 'top',

}

export enum Iresize {
    none = 'none',
    both = 'both',
    horizontal = 'horizontal',
    vertical = 'vertical',
}

export enum Isize {
    large = 'large',
    default = 'default',
    small = 'small',

}


export interface Ioptions {
    label: string;
    value: any;
    disabled?: boolean,
}
export interface FormConfig {
    gutter?: number;
    labelPosition?: Iposition;
    formRules?: any;
    labelWidth?: number;
    themeColors?: Array<ColorOption>
    formChange?: (params: EventParams) => any;
    formClear?: (params: EventParams) => any;
    formBlur?: (params: EventParams) => any;
    formFoucs?: (params: EventParams) => any;
    formFieldClick?: (params: EventParams) => any;

}
export interface EventParams {
    prop: string;
    value: any;
    field: FormField;
    formKey: string
}

export type TableField = {
    prop: string,
    label: string,
    width?: number,
    align?: 'center' | 'right' | 'left',

}

export type TableOptions = {
    total: number,
    data: Array<any>
}
export type GetTableData = (params: { page: number, pageSize: number, query: string }) => Promise<TableOptions>

export type ColorOption = {
    varName: ColorVar,
    value: string
}
export declare type FormFieldOptions = Array<FormField>
export interface ILazyDialogPorps {
    formData: FormData
    formKey: string
    pageSize: number
    needProps?: Array<string>
    gridData?: Array<any>
    dialogKey: string
    tableField?: Array<TableField>
    rowKey?: string
    title: string
    prop: string
    autoPage?: boolean
    multiple?: boolean
    getTableData?: GetTableData
    confirmSelect?: (v: any) => any,
}

export enum ColorVar {
    '--lazy-form-primary' = '--el-color-primary',
    '--lazy-form-text-color-regular' = '--el-text-color-regular',
    '--lazy-form-placeholder' = '--el-text-color-placeholder',
    '--lazy-from-text-color-primary' = '--el-text-color-primary',
    '--lazy-from-table-header-text-color' = '--el-table-header-text-color',
    '--lazy-from-color-danger' = '--el-color-danger',
    '--lazy-from-input-text-color' = '--el-input-text-color'
}
