<template>
  <div class="app-container">
    <el-form ref="ruleFormRef" inline>
      <el-form-item prop="name">
        <el-input v-model="name" placeholder="角色名称" clearable />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="search">搜索</el-button>
        <el-button type="warning" @click="resetting">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10">
      <el-col :span="15">
        <el-table
          @current-change="handleCurrentChange"
          highlight-current-row
          :data="rolePageData.tableData"
          style="width: 100%; margin-bottom: 15px"
          border
        >
          <el-table-column prop="name" label="名称" />
          <el-table-column prop="createdTime" label="创建时间">
            <template #default="scope">
              <span>{{ toLocalTime(scope.row.createdTime) }}</span>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          :page-sizes="[10, 20, 30, 40, 50]"
          layout="sizes, prev, pager, next"
          :total="total"
          @change="pageChange"
        />
      </el-col>

      <el-col :span="9">
        <div class="menu">
          <el-input v-model="rolePageData.rolesName" style="width: 240px" placeholder="角色名称" clearable />
          <el-button
            type="primary"
            v-show="!rolePageData.rolesName"
            :disabled="rolePageData.rowItem.id == -1"
            @click="saveRole"
          >
            保存
          </el-button>

          <el-button
            type="primary"
            v-show="rolePageData.rolesName"
            :disabled="!rolePageData.rolesName"
            @click="saveRole"
          >
            创建角色
          </el-button>
        </div>

        <el-tree
          ref="treeRef"
          show-checkbox
          :data="rolePageData.allMenus"
          default-expand-all
          node-key="id"
          highlight-current
          :props="{
            label: 'name',
            value: 'id',
            children: 'children',
          }"
        />
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import { getRoles, rolesDetail, RoleRowInterface, rolesUpdate, rolesCreate } from '../../../api/roles';
import { toLocalTime } from '../../../utils';
import { getMenu, menuType } from '../../../api/auth';
import { ElMessage, ElTree, FormInstance } from 'element-plus';
import { usePagination } from '@/hooks/usePagination.ts';

const treeRef = ref<InstanceType<typeof ElTree>>();

interface IRolePageData {
  tableData: RoleRowInterface[] | any[];
  allMenus: menuType[] | any[];
  rowItem: RoleRowInterface;
  rolesName: string;
}

const { page, limit, reset, total, name } = usePagination<{ name: string }>({
  page: 1,
  limit: 10,
  extraParams: { name: '', autoResetPage: true },
});

const ruleFormRef = ref<FormInstance>();
const rolePageData = reactive<IRolePageData>({
  tableData: [],
  allMenus: [],
  rolesName: '',
  rowItem: { id: -1, name: 'defaule' },
});

onMounted(() => {
  getTableData();
  getALLTableData();
});

const search = () => {
  getTableData();
};
const resetting = () => {
  reset();
  getTableData();
};

const getTableData = async () => {
  const res = await getRoles({
    page: page.value,
    limit: limit.value,
    name: name.value,
  });
  if (res.success) {
    rolePageData.tableData = res.data.content;
    total.value = res.data.totalElements;
  }
};

// 获取菜单一级数据
const getALLTableData = async () => {
  const res = await getMenu(true);
  if (res.success) {
    rolePageData.allMenus = res.data;
  }
};

const pageChange = (currentPage: number, pageSize: number) => {
  page.value = currentPage;
  limit.value = pageSize;
  getTableData();
};

const handleCurrentChange = async (val: RoleRowInterface) => {
  if (!val) return;
  rolePageData.rolesName = '';
  const res = await rolesDetail(val.id);
  treeRef.value!.setCheckedKeys(res.data.menus.map(item => item.id));
  rolePageData.rowItem = val;
};

// 保存更新
const saveRole = async () => {
  const menuIds = treeRef.value!.getCheckedNodes(false, false).map(item => item.id);
  let res = null;
  if (rolePageData.rolesName) {
    res = await rolesCreate({
      name: rolePageData.rolesName,
      menuIds,
    });
  } else {
    res = await rolesUpdate(rolePageData.rowItem.id, menuIds);
  }

  if (res.success) {
    ElMessage({
      showClose: true,
      message: rolePageData.rolesName ? '创建成功' : '更新',
      type: 'success',
    });
    getTableData();
    treeRef.value!.setCheckedKeys([], false);
    rolePageData.rowItem = { id: -1, name: 'defaule' };
    rolePageData.rolesName = '';
  }
};
</script>

<style scoped lang="scss">
.menu {
  display: flex;
  justify-content: space-between;
}
</style>
