<template>
  <el-dialog title="菜单" v-model="menuDialogFormVisibleRef" width="500">
    <el-form ref="formRef" :model="createdMenuForm" :rules="rules" label-width="80" label-position="left">
      <el-form-item label="菜单名" prop="name">
        <el-input v-model="createdMenuForm.name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="菜单编码" prop="menuCode">
        <el-input v-model="createdMenuForm.menuCode" autocomplete="off" />
      </el-form-item>
      <el-form-item label="节点类型" prop="nodeType">
        <el-radio-group v-model="createdMenuForm.nodeType">
          <el-radio :value="0" size="large">目录</el-radio>
          <el-radio :value="1" size="large">菜单</el-radio>
          <el-radio :value="2" size="large">按钮</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="组件名称" v-show="createdMenuForm.nodeType !== 0">
        <el-input v-model="createdMenuForm.assemblyName" autocomplete="off" />
      </el-form-item>
      <el-form-item label="组件路径" v-show="createdMenuForm.nodeType !== 0">
        <el-input v-model="createdMenuForm.assemblyUrl" autocomplete="off" />
      </el-form-item>
      <el-form-item label="路由" prop="url">
        <el-input v-model="createdMenuForm.url" autocomplete="off" />
      </el-form-item>
      <el-form-item label="排序">
        <el-input v-model="createdMenuForm.sort" autocomplete="off" />
      </el-form-item>

      <el-form-item label="上级类目" v-show="createdMenuForm.nodeType !== 0">
        <el-tree-select
          v-model="createdMenuForm.parentId"
          :data="props.menuTree"
          check-strictly
          :props="{
            label: 'name',
            value: 'id',
            children: 'children',
          }"
          :render-after-expand="false"
        ></el-tree-select>
      </el-form-item>
    </el-form>

    <template #footer>
      <div class="dialog-footer">
        <el-button @click="saveMenu(formRef)">确定</el-button>
        <el-button type="primary" @click="updatedMsg">取消</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { FormInstance, FormRules } from 'element-plus/es/components/form';
import { reactive, defineProps, ref, watch } from 'vue';
import { ICreatedMenu } from './createdMenuType';
import { createdMenu, menuType, upDataMenu } from '../../../api/auth';
import { ElMessage } from 'element-plus';
interface IProps {
  menuTree: menuType[];
  upDataForm: menuType;
}
const props = defineProps<IProps>();
const emit = defineEmits(['createdMenuSuccess']);

// 双向绑定
const menuDialogFormVisibleRef = defineModel('menuDialogFormVisibleRef', {
  type: Boolean,
  default: false,
  required: true,
});
const updatedMsg = () => {
  menuDialogFormVisibleRef.value = false;
};

watch(menuDialogFormVisibleRef, () => {
  createdMenuForm = props.upDataForm;
});

const formRef = ref<FormInstance>();

let createdMenuForm = reactive<ICreatedMenu>({
  id: null,
  name: '',
  menuCode: '',
  nodeType: 0,
  assemblyName: '',
  assemblyUrl: '',
  url: '',
  parentId: 0,
  sort: 0,
});

const rules = reactive<FormRules<typeof createdMenuForm>>({
  name: [{ required: true, trigger: ['blur', 'change'], message: '请输入账号' }],
  menuCode: [{ required: true, trigger: ['blur', 'change'], message: '请输入菜单编码' }],
  nodeType: [{ required: true, trigger: ['blur', 'change'], message: '请输入节点类型' }],
  url: [{ required: true, trigger: ['blur', 'change'], message: '请输入路由' }],
  parentId: [{ required: true, trigger: ['blur', 'change'], message: '请输入上级目录' }],
});

const saveMenu = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate(async valid => {
    if (createdMenuForm.id) {
      const res = await upDataMenu(createdMenuForm.id, createdMenuForm);
      if (res.success) {
        messageFn();
      }
      return;
    }

    if (createdMenuForm.nodeType === 0) {
      createdMenuForm.assemblyName = 'Layout';
    }
    const res = await createdMenu(createdMenuForm);
    if (res.success) {
      messageFn();
    }
  });
};

const messageFn = () => {
  emit('createdMenuSuccess');
  ElMessage({
    showClose: true,
    message: '添加成功',
    type: 'success',
  });
  updatedMsg();
};
</script>

<style scoped lang="scss"></style>
