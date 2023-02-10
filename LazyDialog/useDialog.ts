import { computed, reactive, ref } from "vue"
import { EventParams, TableOptions, ILazyDialogPorps } from "../type";
import { isExist } from "wsp-toolkit";


export const useDialog = (Prop: ILazyDialogPorps, emits: any) => {
    const dialogTableVisible = ref(false)
    const loading = ref(false)
    /**初始数据 */
    const dataTotal = ref()
    const tableData = ref([])
    const selectedData = ref()
    const searchValue = ref<string>("")
    /**请求参数 */
    const params = reactive({
        page: 1,
        pageSize: 2,
        query: ''
    })

    /**总量统计 */
    const Ctotal = computed(() => dataTotal.value || tableData.value.length || Prop.gridData?.length)
    /**数据源 */
    const Cdata = computed(() => {
        if (Prop.autoPage) {
            return (Prop.gridData?.slice(params.pageSize * (params.page - 1), (params.pageSize) * params.page)
                || tableData.value?.slice(params.pageSize * (params.page - 1), (params.pageSize) * params.page) || [])
        }
        else {
            return (Prop.gridData || tableData.value || [])
        }
    })
    /**获取表格数据*/
    const initData = async (getTableData: any, params: any) => {
        loading.value = true
        const { data, total } = await getTableData(params)
        console.log(data, 1212)
        tableData.value = data
        dataTotal.value = total
        loading.value = false

    }
    /**关闭弹框 */
    const closeFun = () => {
        dataTotal.value = 0
        tableData.value = []
        params.page = 1
        searchValue.value = ""

    }
    /**显示弹框 */
    const show = () => {
        dialogTableVisible.value = true;
        params.pageSize = Prop.pageSize
        if (isExist(Prop.getTableData)) {
            initData(Prop.getTableData, params)
        }

    }
    /**隐藏 */
    const hidden = () => {
        dialogTableVisible.value = false;
        closeFun()
    }

    /**
     * 确认选择行数据
     */
    const selectTableRow = (selections: any) => {
        selectedData.value = selections
        if (!Prop.multiple) {
            Prop.needProps?.forEach((e, i) => {
                const [T, V] = e.split(":")
                Prop.formData[V] = selections[0][T]
            })

            toConfirmSelect()
        }

    }
    const toSearch = () => {
        params.query = searchValue.value

        if (isExist(Prop.getTableData)) {

            initData(Prop.getTableData, params)
        }
    }
    /**
     * 分页
     */
    const handleSizeChange = (val: number) => {



    }
    const handleCurrentChange = (val: number) => {

    }
    const toConfirmSelect = () => {
        hidden()
        console.log(1212)
        Prop?.confirmSelect && Prop.confirmSelect(selectedData.value)

    }
    return {
        dialogTableVisible,
        show,
        Ctotal,
        Cdata,
        tableData,
        params,
        selectedData,
        closeFun,
        loading,
        selectTableRow,
        toConfirmSelect,
        hidden,
        searchValue,
        toSearch,
        handleSizeChange,
        handleCurrentChange
    }
}