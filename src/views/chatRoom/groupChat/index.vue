<template>
  <div class="app-container">
    <el-form ref="systemUserFormRef" inline>
      <el-form-item prop="name">
        <el-input placeholder="角色名称" clearable v-model="blurry" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getList">搜索</el-button>
        <el-button type="warning" @click="resetting">重置</el-button>
      </el-form-item>
    </el-form>

    <el-table border style="width: 100%; margin: 10px 0" :data="tableData">
      <el-table-column prop="name" label="群名" width="300"></el-table-column>
      <el-table-column prop="notice" label="公告" width="300"></el-table-column>

      <el-table-column label="操作">
        <template #default="scope">
          <el-button size="small" type="primary" @click="handleEdit(scope.row)">查看群成员</el-button>
          <el-button size="small" type="warning" @click="handleCheck(scope.row)">查看聊天记录</el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.row)">解散</el-button>
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

  <GroupUserList v-model:isShow="isShowGroupUserList" :gridData="usersList" />
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { usePagination } from '@/hooks/usePagination.ts';
import { getGroupList, groupDel, groupUserList } from '../../../api/groupChat';
import { IGroupChatList } from '../../../types/grouChat';
import { IUser } from '../../../types/user';

import GroupUserList from './GroupUserList.vue';
import { ElMessageBox } from 'element-plus';

const { page, limit, reset, total, blurry } = usePagination<{ blur: string }>({
  page: 1,
  limit: 10,
  extraParams: { blurry: '' },
  autoResetPage: true,
});

const tableData = ref<IGroupChatList[]>([]);
const usersList = ref<IUser[]>([]);
const isShowGroupUserList = ref<boolean>(false);

onMounted(() => {
  getList();
});

const handleEdit = async (row: IGroupChatList) => {
  const res = await groupUserList(row.id);
  usersList.value = res.data;
  isShowGroupUserList.value = true;
};

const handleDelete = async (row: IGroupChatList) => {
  const msg = await ElMessageBox.confirm('确认解散群聊？', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  });
  if (msg) {
    const res = await groupDel(row.id);
    if (res.success) {
      getList();
    }
  }
};

const handleCheck = async (row: IGroupChatList) => {};

const getList = async () => {
  const res = await getGroupList({
    page: page.value,
    limit: limit.value,
    blurry: blurry.value,
  });
  total.value = res.data.totalPages;
  tableData.value = res.data.content;
};

const pageChange = (currentPage: number, pageSize: number) => {
  page.value = currentPage;
  limit.value = pageSize;
  getList();
};

const resetting = () => {
  reset();
  getList();
};
</script>
<style scoped></style>
