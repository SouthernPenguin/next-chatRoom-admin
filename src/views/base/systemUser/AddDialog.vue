<template>
  <el-dialog v-model="show" title="新增" width="500">
    <el-form :model="dialogData.form">
      <el-form-item label="用户名">
        <el-input v-model="dialogData.form.name" autocomplete="off" />
      </el-form-item>

      <el-form-item label="角色名">
        <el-select-v2 v-model="dialogData.form.roleIds" :options="props.allRoles" multiple />
      </el-form-item>
    </el-form>

    <template #footer>
      <div class="dialog-footer">
        <el-button @click="updatedMsg">取消</el-button>
        <el-button type="primary" @click="created">确定</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ElNotification } from 'element-plus';
import { reactive } from 'vue';
import { SystemUserCaredInterface, systemUserCreated } from '../../../api/systemUser';
import { RoleRowInterface } from '../../../api/roles';

interface DialogData {
  form: SystemUserCaredInterface;
}

interface PropsInterface {
  allRoles: RoleRowInterface[] | any[];
}

const props = defineProps<PropsInterface>();

const emit = defineEmits(['createdSuccess']);

const dialogData = reactive<DialogData>({
  form: {
    name: '',
    roleIds: [],
  },
});

// 双向绑定
const show = defineModel('show', {
  type: Boolean,
  default: false,
  required: true,
});
const updatedMsg = () => {
  show.value = false;
};

const created = async () => {
  const res = await systemUserCreated(dialogData.form);
  if (res.success) {
    ElNotification({
      title: '添加用户成功',
      message: '默认密码123456',
      type: 'success',
    });
    emit('createdSuccess');
    updatedMsg();
  }
};
</script>

<style scoped></style>
