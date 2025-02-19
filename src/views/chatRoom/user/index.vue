<template>
  <div class="app-container">
    <el-form inline>
      <el-form-item prop="name">
        <el-input placeholder="请输入内容" v-model="blur" clearable />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="search">搜索</el-button>
        <el-button type="warning" @click="resetting">重置</el-button>
        <el-button type="primary" @click="addUser">添加用户</el-button>
      </el-form-item>
    </el-form>

    <el-table border style="width: 100%; margin: 10px 0" :data="tableData">
      <el-table-column prop="name" label="账户名称" width="300"></el-table-column>
      <el-table-column prop="nickname" label="昵称" width="300"></el-table-column>
      <el-table-column label="头像" width="100" align="center">
        <template #default="scope">
          <el-image
            style="width: 50px; height: 50px"
            :src="scope.row.headerImg"
            :zoom-rate="1.2"
            :max-scale="7"
            :min-scale="0.2"
            :preview-src-list="[scope.row.headerImg]"
            show-progress
            :initial-index="4"
            fit="cover"
          />
        </template>
      </el-table-column>

      <el-table-column label="性别" width="70" align="center">
        <template #default="scope">
          {{ scope.row.gender === 0 ? '男' : scope.row.gender === 1 ? '女' : '保密' }}
        </template>
      </el-table-column>

      <el-table-column label="操作" width="240">
        <template #default="scope">
          <el-button size="small" type="primary" @click="btnClick(BtnType.Edit, scope.row)">编辑</el-button>
          <el-button size="small" type="warning" @click="btnClick(BtnType.ChangePassWord, scope.row)">
            重置密码
          </el-button>
          <el-button size="small" type="danger" @click="btnClick(BtnType.Disable, scope.row)">
            {{ scope.row.isBlack ? '以' : '未' }}禁用
          </el-button>
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

  <UserInfo v-model:isShow="isShowUserInfo" :userInfo="selectUser" :actionUrl="uploadHeaderImgUrl" />
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { getUserList } from '@/api/user.ts';
import { usePagination } from '@/hooks/usePagination.ts';
import { IUser } from '../../../types/user';
import UserInfo from './UserInfo.vue';
import { black, resetPassword, sysytenUserUpLoadUserImage } from '../../../api/user';
import { ElMessage, ElMessageBox } from 'element-plus';

enum BtnType {
  'Edit',
  'ChangePassWord',
  'Disable',
}

const { page, limit, reset, total, blur } = usePagination<{ blur: string }>({
  page: 1,
  limit: 10,
  extraParams: { blur: '', autoResetPage: true },
});

const isShowUserInfo = ref<boolean>(false);
const tableData = ref<IUser[]>([]);
const selectUser = ref<IUser>();
const uploadHeaderImgUrl = ref('');

onMounted(() => {
  getTableData();
});

const search = () => {
  getTableData();
};

const btnClick = async (type: BtnType, item: IUser) => {
  if (type == BtnType.Edit) {
    uploadHeaderImgUrl.value = `${sysytenUserUpLoadUserImage}?userId=${item.id}`;
    selectUser.value = item;
    isShowUserInfo.value = true;
  }
  if (type == BtnType.ChangePassWord) {
    const msg = await ElMessageBox.confirm('确认重置用户密码？', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    });
    if (msg) {
      const res = await resetPassword(item.id);
      if (res.success) {
        ElMessage.success('重置密码成功');
      }
    }
  }
  if (type == BtnType.Disable) {
    const msg = await ElMessageBox.confirm(item.isBlack ? '确定解除用户禁用' : '确认禁用用户？', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'error',
    });
    if (msg) {
      const res = await black(item.id);
      if (res.success) {
        ElMessage.success(item.isBlack ? '解除禁用成功' : '禁用成功');
        getTableData();
      }
    }
  }
};

const pageChange = (currentPage: number, pageSize: number) => {
  page.value = currentPage;
  limit.value = pageSize;
  getTableData();
};

const resetting = () => {
  reset();
  getTableData();
};

const addUser = () => {
  isShowUserInfo.value = true;
  uploadHeaderImgUrl.value = `${sysytenUserUpLoadUserImage}`;
  selectUser.value = {
    id: -1,
    name: '',
    nickname: '',
    headerImg: '',
    gender: 0,
    password: '',
    isBlack: false,
  };
};

const getTableData = async () => {
  const res = await getUserList({
    page: page.value,
    limit: limit.value,
    blur: blur.value,
  });
  total.value = res.data.totalElements;
  tableData.value = res.data.content;
};
</script>

<style scoped lang="scss"></style>
