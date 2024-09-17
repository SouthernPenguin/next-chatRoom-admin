<template>
  <div class="app-container">
    <div style="margin-bottom: 5px">
      <el-button type="primary" @click="menuDialogFormVisibleRef = true">添加</el-button>
    </div>
    <el-table
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      :data="menuPageData.tableData"
      style="width: 100%"
      row-key="id"
      border
      lazy
      :load="load"
    >
      <el-table-column prop="sort" label="排序" />
      <el-table-column prop="name" label="目录名称" />
      <el-table-column prop="url" label="路由" />
      <el-table-column prop="url" label="路由" />
      <!-- <el-table-column prop="assemblyName" label="组件名称" /> -->
      <el-table-column prop="assemblyUrl" label="组件路径" />
      <el-table-column prop="nodeType" label="类型">
        <template #default="scope">{{ returnNodeType(scope.row) }}</template>
      </el-table-column>

      <el-table-column prop="menuCode" label="权限名称" />

      <el-table-column label="操作" min-width="60">
        <template #default="scope">
          <el-button type="primary" @click="editMenuFn(scope.row)">编辑</el-button>
          <el-button type="danger" @click="deleteMenuFn(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>

  <EForm
    :menuTree="menuPageData.allTableData"
    v-model:menuDialogFormVisibleRef="menuDialogFormVisibleRef"
    @createdMenuSuccess="getTableData"
    :upDataForm="createdMenuForm"
  />
</template>

<script setup lang="ts">
import { ElMessageBox } from 'element-plus';
import { onMounted, reactive, ref } from 'vue';
import { getFirstStage, getMenu, nextMenu, menuType, deleteMenu } from '../../../api/auth';
import EForm from './from.vue';
import { ICreatedMenu } from './createdMenuType';

const menuDialogFormVisibleRef = ref<boolean>(false);
const menuPageData = reactive<{ tableData: menuType[]; allTableData: menuType[] }>({
  tableData: [],
  allTableData: [],
});

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

onMounted(() => {
  getTableData();
  getALLTableData();
});

// 获取菜单一级数据
const getTableData = async () => {
  const res = await getFirstStage();
  if (res.success) {
    menuPageData.tableData = res.data;
  }
};

// 获取菜单一级数据
const getALLTableData = async () => {
  const res = await getMenu(true);
  if (res.success) {
    menuPageData.allTableData = res.data;
  }
};

// 下级菜单
const load = async (row: menuType, treeNode: unknown, resolve: (data: menuType[]) => void) => {
  const res = await nextMenu(row.id);
  resolve(res.data);
};

// 删除
const deleteMenuFn = async (row: menuType) => {
  try {
    const confirm = await ElMessageBox.confirm('确定删除？', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'error',
    });
    if (confirm) {
      const r = await deleteMenu(row.id);
      if (r.success) {
        menuPageData.tableData = [];
        getTableData();
      }
    }
  } catch (error) {}
};

// 编辑
const editMenuFn = async (row: ICreatedMenu) => {
  menuDialogFormVisibleRef.value = true;
  createdMenuForm = row;
};

const returnNodeType = (row: ICreatedMenu) => {
  if (row.nodeType === 0) return '目录';
  if (row.nodeType === 1) return '菜单';
  if (row.nodeType === 2) return '按钮';
};
</script>

<style scoped lang="scss"></style>
