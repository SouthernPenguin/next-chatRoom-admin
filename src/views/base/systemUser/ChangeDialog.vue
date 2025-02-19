<template>
  <el-dialog v-model="show" title="修改密码" width="500">
    <el-form :model="form" :rules="rules" ref="formRef">
      <el-form-item label="旧密码" prop="oldPassword">
        <el-input v-model="form.oldPassword" autocomplete="off" />
      </el-form-item>
      <el-form-item label="新密码" prop="newPassword">
        <el-input v-model="form.newPassword" autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="updatedMsg">取消</el-button>
        <el-button type="primary" @click="changePassword(formRef)">确定</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ElMessage, FormInstance, FormRules } from 'element-plus';
import { reactive, ref } from 'vue';
import { systemUserChangePassword, ISystemUserChangePassword } from '../../../api/systemUser';
interface PropsInterface {
  id: number;
}
const props = defineProps<PropsInterface>();

const emit = defineEmits(['passwordSuccess']);

// 双向绑定
const show = defineModel('show', {
  type: Boolean,
  default: false,
  required: true,
});

const formRef = ref<FormInstance>();
const form = reactive<ISystemUserChangePassword>({
  oldPassword: '',
  newPassword: '',
});

const checkPassword = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请输入密码'));
  } else if (value.length <= 5) {
    callback(new Error('密码长度只是6位'));
  } else {
    callback();
  }
};

const rules = reactive<FormRules<typeof form>>({
  oldPassword: [{ required: true, trigger: ['blur', 'change'], validator: checkPassword }],
  newPassword: [{ required: true, trigger: ['blur', 'change'], validator: checkPassword }],
});

const updatedMsg = () => {
  show.value = false;
};

const changePassword = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate(async valid => {
    if (valid) {
      const res = await systemUserChangePassword(props.id, form);
      if (res.success) {
        formEl.resetFields();
        emit('passwordSuccess');
        updatedMsg();
        ElMessage({
          type: 'success',
          message: '修改成功',
          showClose: true,
        });
      }
    }
  });
};
</script>

<style scoped></style>
