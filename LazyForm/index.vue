<script lang="ts">
import { nextTick, onMounted, ref, watchEffect } from "vue"
import { FormField, FormData, FormConfig, FormFieldOptions } from "../type"
import { useLazyForm } from "./useForm"
import { isEmpty } from "wsp-toolkit"
import { Search } from "@element-plus/icons-vue"

export default {
  name: "LazyForm" //组件名
}
</script>
<script setup lang="ts">
import LazyDialog from "../LazyDialog/index.vue"
/**
 *formField  表单配置数组
 *formData  表单value对象
 *formKey 表单Key
 *gutter 间隔
 *config 全局配置文件
 */

interface ILazyFormPorps {
  formField: FormFieldOptions
  formData: FormData
  formKey?: string
  config: FormConfig
}

/**props */
const { config, formData } = withDefaults(defineProps<ILazyFormPorps>(), {
  formKey: "formKey"
})
watchEffect(() => {})
/**emit事件 */
defineEmits([""])

/**表单Hooks */
const { getRules, dialogRef, formRef, getSpan, visibleChange, FieldClick, removeTag, Clear, Blur, Foucs, Change } =
  useLazyForm(config, formData)

defineExpose({
  formRef: formRef,
  dialogRef: dialogRef
})
</script>

<template>
  <div>
    <el-form
      :label-position="config.labelPosition || 'right'"
      :label-width="config.labelWidth || 100"
      :formKey="formKey"
      :model="formData"
      ref="formRef"
    >
      <div class="form-content" :style="`grid-column-gap: ${config.gutter}px;`">
        <template v-for="field in formField">
          <div
            class="zr-lazy-form-item"
            v-if="field.slot"
            :style="`grid-column-start: span ${getSpan(field)};`"
            :key="field.slot"
          >
            <slot :name="field.slot" :data="field"></slot>
          </div>
          <div
            v-else-if="field.type == 'searchtable'"
            class="zr-lazy-form-item"
            :style="`grid-column-start: span ${getSpan(field)};`"
            :key="field.prop"
          >
            <el-form-item :label="field.label" :prop="field.prop" :rules="getRules(field)">
              <el-input
                type="input"
                ref="dialogRef"
                v-model="formData[field.prop]"
                @change="Change($event, field, formKey)"
                @clear="Clear($event, field, formKey)"
                @blur="Blur($event, field, formKey)"
                @focus="Foucs($event, field, formKey)"
                @click="FieldClick($event, field, formKey)"
                :size="field.size"
                :formatter="field.formatter"
                :clearable="field.clearable"
                :placeholder="field.placeholder"
                :disabled="field.disabled"
                :readonly="field.readonly"
              >
                <template #suffix>
                  <slot name="input-suffix" :data="field">
                    <el-icon style="vertical-align: middle"> <Search /> </el-icon
                  ></slot>
                </template>
                <template #prefix>
                  <slot name="input-prefix" :data="field"></slot>
                </template>
              </el-input>
            </el-form-item>
            <LazyDialog
              ref="dialogRef"
              :formKey="formKey"
              :formData="formData"
              :prop="field.prop"
              :tableField="field.tableField"
              :dialogKey="field.prop"
              :gridData="field.gridData"
              :rowKey="field.rowKey"
              :title="field.label"
              :multiple="field.multiple"
              :needProps="field.needProps"
              :getTableData="field.getTableData"
              :confirmSelect="field.confirmSelect"
              :click-cell="field.clickCell"
              :placeholder="field.placeholder"
              :dialogPlaceholder="field.dialogPlaceholder"
            ></LazyDialog>
          </div>
          <div v-else :key="field.prop" class="zr-lazy-form-item" :style="`grid-column-start: span ${getSpan(field)};`">
            <el-form-item :key="field.prop" :label="field.label" :prop="field.prop" :rules="getRules(field)">
              <el-input
                v-if="field.type == 'input' || isEmpty(field.type)"
                :type="'input'"
                v-model="formData[field.prop]"
                @change="Change($event, field, formKey)"
                @clear="Clear($event, field, formKey)"
                @blur="Blur($event, field, formKey)"
                @focus="Foucs($event, field, formKey)"
                @click="FieldClick($event, field, formKey)"
                :size="field.size"
                :formatter="field.formatter"
                :clearable="field.clearable"
                :placeholder="field.placeholder"
                :disabled="field.disabled"
                :readonly="field.readonly"
              >
                <template #suffix>
                  <slot name="input-suffix" :data="field"></slot>
                </template>
                <template #prefix>
                  <slot name="input-prefix" :data="field"></slot>
                </template>
              </el-input>
              <el-input
                v-if="field.type == 'textarea'"
                :type="field.type"
                v-model="formData[field.prop]"
                @change="Change($event, field, formKey)"
                @clear="Clear($event, field, formKey)"
                @blur="Blur($event, field, formKey)"
                @focus="Foucs($event, field, formKey)"
                @click="FieldClick($event, field, formKey)"
                :size="field.size"
                :formatter="field.formatter"
                :clearable="field.clearable"
                :placeholder="field.placeholder"
                :disabled="field.disabled"
                :readonly="field.readonly"
                :rows="field.rows"
                :autosize="field.autosize"
                :maxlength="field.maxlength"
                :minlength="field.minlength"
                show-word-limit
                :resize="field.resize"
              >
                <template #suffix>
                  <slot name="input-suffix" :data="field"></slot>
                </template>
                <template #prefix>
                  <slot name="input-prefix" :data="field"></slot>
                </template>
              </el-input>
              <el-radio-group
                v-else-if="field.type == 'radio'"
                v-model="formData[field.prop]"
                @change="Change($event, field, formKey)"
              >
                <template v-if="field.buttonStyle">
                  <el-radio-button
                    v-for="option in field.options"
                    :key="option.value"
                    :label="option.value"
                    :disabled="field.disabled"
                    :border="field.border"
                    :size="field.size"
                  >
                    {{ option.label }}</el-radio-button
                  >
                </template>
                <template v-else>
                  <el-radio
                    v-for="option in field.options"
                    :key="option.value"
                    :label="option.value"
                    :disabled="field.disabled"
                    :border="field.border"
                    :size="field.size"
                    >{{ option.label }}</el-radio
                  >
                </template>
              </el-radio-group>
              <el-checkbox-group
                v-else-if="field.type == 'checkbox'"
                v-model="formData[field.prop]"
                :min="field.checkboxMin"
                :max="field.checkboxMax"
                @change="Change($event, field, formKey)"
              >
                <template v-if="field.buttonStyle">
                  <el-checkbox-button
                    v-for="option in field.options"
                    :key="option.value"
                    :label="option.value"
                    :disabled="option.disabled"
                    :border="field.border"
                    :size="field.size"
                    >{{ option.label }}</el-checkbox-button
                  >
                </template>
                <template v-else>
                  <el-checkbox
                    v-for="option in field.options"
                    :key="option.value"
                    :label="option.value"
                    :disabled="option.disabled"
                    :border="field.border"
                    :size="field.size"
                    >{{ option.label }}</el-checkbox
                  >
                </template>
              </el-checkbox-group>
              <el-select
                v-else-if="field.type == 'select'"
                v-model="formData[field.prop]"
                @change="Change($event, field, formKey)"
                @visible-change="visibleChange(field, formKey)"
                @remove-tag="removeTag(field, formKey)"
                @clear="Clear($event, field, formKey)"
                @blur="Blur($event, field, formKey)"
                @focus="Foucs($event, field, formKey)"
                :clearable="field.clearable"
                :multiple="field.multiple"
                :placeholder="field.placeholder"
                :filterable="field.filterable"
                :remote="field.remote"
                :remote-method="field.remoteMethod"
                :allow-create="field.allowCreate"
                :default-first-option="field.defaultFirstOption"
                :loading="field.loading"
              >
                <template #prefix>
                  <slot name="select-prefix" :data="field"></slot>
                </template>
                <template #empty>
                  <slot name="select-prefix" :data="field"></slot>
                </template>
                <el-option
                  v-for="option in field.options"
                  :key="option.value"
                  :label="option.label"
                  :value="option.value"
                  :disabled="option.disabled"
                />
              </el-select>
            </el-form-item>
          </div>
        </template>
      </div>
    </el-form>
  </div>
</template>

<style scoped lange="css">
.form-content {
  display: grid;
  grid-template-columns: repeat(24, 1fr);
}
</style>
