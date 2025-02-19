<template>
  <div class="app-container">
    <el-form ref="systemUserFormRef" inline>
      <el-form-item prop="name">
        <el-input placeholder="角色名称" clearable v-model="name" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="search">搜索</el-button>
        <el-button type="warning" @click="resetting">重置</el-button>
      </el-form-item>
    </el-form>

    <el-button type="primary" @click="showObj.addShow = true">添加</el-button>

    <el-table :data="systemUserPageData.tableData" border style="width: 100%; margin: 10px 0">
      <el-table-column prop="name" label="名称" width="100"></el-table-column>

      <el-table-column label="角色">
        <template #default="scope">
          <el-select-v2
            v-show="scope.row.idEdit"
            v-model="systemUserPageData.roleIds"
            :options="systemUserPageData.allRoles"
            multiple
          />
          <span v-show="!scope.row.idEdit">
            <el-tag
              type="primary"
              :key="s"
              v-for="s in scope.row.roles.map(item => item.name)"
              style="margin-right: 5px"
            >
              {{ s }}
            </el-tag>
          </span>
        </template>
      </el-table-column>

      <el-table-column prop="createdTime" label="创建时间">
        <template #default="scope">
          <span>{{ toLocalTime(scope.row.createdTime) }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作" width="180">
        <template #default="scope">
          <el-button size="small" @click="editAndSave(scope.row, 0)" v-if="!scope.row.idEdit">编辑</el-button>
          <el-button size="small" @click="editAndSave(scope.row, 1)" v-if="scope.row.idEdit">保存</el-button>
          <el-button size="small" type="primary" @click="changePassword(scope.row)">修改密码</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      :total="total"
      :page-sizes="[10, 20, 30, 40, 50]"
      layout="sizes, prev, pager, next"
      @change="pageChange"
    />
  </div>

  <ChangeDialog
    v-model:show="showObj.changePasswordShow"
    :id="systemUserPageData.rowId"
    :passwordSuccess="getSystemUserList"
  />
  <AddDialog
    v-model:show="showObj.addShow"
    :allRoles="systemUserPageData.allRoles"
    @createdSuccess="getSystemUserList"
  />
</template>

<script setup lang="ts">
import { ElMessage, FormInstance } from 'element-plus';
import { onMounted, ref } from 'vue';
import { reactive } from 'vue';
import { toLocalTime } from '../../../utils';
import { ISystemUserList, ISystemUserRow, systemUserUpData } from '../../../api/systemUser';
import { getRoles, IRoleRowInterface } from '../../../api/roles';
import AddDialog from './AddDialog.vue';
import ChangeDialog from './ChangeDialog.vue';
import { usePagination } from '@/hooks/usePagination.ts';

interface ISystemUserPageData {
  tableData: ISystemUserRow[] | any[];
  allRoles: IRoleRowInterface[] | any[];
  roleIds: number[] | any[];
  rowId: number;
}

const { page, limit, reset, total, name } = usePagination<{ name: string }>({
  page: 1,
  limit: 10,
  extraParams: { name: '', autoResetPage: true },
});

const systemUserFormRef = ref<FormInstance>();

const showObj = reactive({
  addShow: false,
  changePasswordShow: false,
});

//
const systemUserPageData = reactive<ISystemUserPageData>({
  tableData: [],
  allRoles: [],
  roleIds: [],
  rowId: -1,
});

onMounted(() => {
  getAllRoles();
  getSystemUserList();
});

const getAllRoles = async () => {
  const res = await getRoles({
    page: 1,
    limit: 9999,
  });
  if (res.success) {
    res.data.content.forEach(item => {
      item.label = item.name;
      item.value = item.id;
    });
    systemUserPageData.allRoles = res.data.content;
  }
};

const getSystemUserList = async () => {
  const res = await ISystemUserList({
    page: page.value,
    limit: limit.value,
    name: name.value,
  });
  if (res.success) {
    res.data.content.forEach(item => {
      item.idEdit = false;
    });
    systemUserPageData.tableData = res.data.content;
    total.value = res.data.totalElements;
  }
};

const pageChange = (currentPage: number, pageSize: number) => {
  page.value = currentPage;
  limit.value = pageSize;
  getSystemUserList();
};

const search = () => {
  getSystemUserList();
};
const resetting = () => {
  reset();
  getSystemUserList();
};

const editAndSave = async (row: ISystemUserRow, type: number) => {
  if (type === 0) {
    systemUserPageData.roleIds = row.roles.map(item => item.id);
  }
  if (systemUserPageData.tableData.some(item => item.idEdit) && !row.idEdit && type === 0) {
    ElMessage({
      showClose: true,
      message: '已有一条记录在修改未保存',
      type: 'warning',
    });
    return;
  }
  row.idEdit = !row.idEdit;

  if (type === 1) {
    const res = await systemUserUpData(row.id, systemUserPageData.roleIds);
    if (res.success) {
      row.idEdit = false;
      row.roles = res.data.roles;
    }
  }
};

const changePassword = (row: ISystemUserRow) => {
  systemUserPageData.rowId = row.id;
  showObj.changePasswordShow = true;
};
</script>

<style scoped lang="scss"></style>
