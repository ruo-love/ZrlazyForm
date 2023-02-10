<template>
  <el-dialog class="dialog-container" v-model="dialogTableVisible" :title="`请选择${title}`" @close="closeFun">
    <div>
      <el-input :placeholder="dialogPlaceholder" style="width: 50%; float: right" v-model="searchValue" @keydown.enter="toSearch">
        <template #suffix>
          <slot name="input-suffix">
            <el-icon style="vertical-align: middle" @click="toSearch"> <Search /> </el-icon
          ></slot>
        </template>
      </el-input>
    </div>
    <el-table
      v-loading="loading"
      :row-key="rowKey"
      :data="Cdata"
      @cell-click="clickCell"
      @selection-change="selectTableRow"
    >
      <el-table-column v-if="multiple" type="selection" width="55"> </el-table-column>
      <el-table-column
        :width="field.width"
        :align="field.align"
        v-for="field in tableField"
        :key="field.prop"
        :property="field.prop"
        :label="field.label"
      />
      <el-table-column align="center" v-if="!multiple && Cdata.length" label="操作">
        <template #default="scope">
          <el-button @click="selectTableRow([scope.row])" type="text" size="small">选择</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="footer">
      <el-pagination
        v-model:current-page="params.page"
        v-model:page-size="params.pageSize"
        :page-sizes="[2, 4, 10, 30]"
        small
        layout="total, sizes, prev, pager, next, jumper"
        :total="Ctotal"
      />
      <div class="control-btns">
        <el-button type="primary" @click="toConfirmSelect">确认</el-button>
        <el-button type="warning" @click="hidden">取消</el-button>
      </div>
    </div>
  </el-dialog>
</template>
<script lang="ts">
import { useDialog } from "./useDialog"
import { FormData, GetTableData, TableField } from "../type"

export default {
  name: "LazyDialog"
}
</script>
<script lang="ts" setup>
import { Search } from "@element-plus/icons-vue"
interface ILazyDialogPorps {
  formData: FormData
  formKey: string
  pageSize?: number
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
  confirmSelect?: (v: any) => any
  clickCell?: (row: any, column: any, cell: any, event: any) => any
  dialogPlaceholder?: string
}

const prop = withDefaults(defineProps<ILazyDialogPorps>(), {
  rowKey: "rowKey",
  autoPage: true,
  multiple: false,
  pageSize: 2,
  placeholder: "请输入关键词搜索"
})
const emits = defineEmits(["update:modelValue"])

const {
  dialogTableVisible,
  show,
  Ctotal,
  Cdata,
  params,

  hidden,
  closeFun,
  loading,
  selectTableRow,
  toConfirmSelect,
  searchValue,
  toSearch
} = useDialog(prop, emits)

defineExpose({
  show,
  dialogKey: prop.dialogKey
})
</script>
<style scoped>
.dialog-container {
  min-width: 420px;
}
.footer {
  margin-top: 60px;
}
.control-btns {
  margin-top: 30px;
  display: flex;
  justify-content: end;
}
</style>
