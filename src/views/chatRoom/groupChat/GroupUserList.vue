<template>
  <el-dialog v-model="isShow" title="群成员" width="800">
    <el-table :data="props.gridData" border>
      <el-table-column prop="name" label="账户名称"></el-table-column>
      <el-table-column prop="nickname" label="昵称"></el-table-column>
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

      <el-table-column label="性别" align="center">
        <template #default="scope">
          {{ scope.row.gender === 0 ? '男' : scope.row.gender === 1 ? '女' : '保密' }}
        </template>
      </el-table-column>

      <el-table-column label="操作" width="240">
        <template #default="scope">
          <!-- <el-button size="small" type="primary" @click="btnClick(BtnType.Edit, scope.row)">编辑</el-button> -->
          <el-button size="small" type="warning" @click="btnClick(BtnType.ChangePassWord, scope.row)">
            重置密码
          </el-button>
          <el-button size="small" type="danger" @click="btnClick(BtnType.Disable, scope.row)">
            {{ scope.row.isBlack ? '以' : '未' }}禁用
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ElMessage, ElMessageBox } from 'element-plus';
import { IUser } from '../../../types/user';
import { black, resetPassword } from '../../../api/user';

enum BtnType {
  'Edit',
  'ChangePassWord',
  'Disable',
}

interface IProps {
  gridData: IUser[];
}
const props = defineProps<IProps>();

// 双向绑定
const isShow = defineModel('isShow', {
  type: Boolean,
  default: false,
  required: true,
});

const btnClick = async (type: BtnType, item: IUser) => {
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
      }
    }
  }
};
</script>
