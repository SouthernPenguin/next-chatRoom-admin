<template>
  <div id="login">
    <el-form :model="loginForm" label-width="auto" class="form-login" :rules="rules" ref="formRef">
      <el-form-item label="账号" prop="nameUser">
        <el-input v-model="loginForm.nameUser" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="loginForm.password" :type="inputType" />

        <el-icon @click="onChangePwdType" v-if="isShow" :size="20" class="password-icon"><View /></el-icon>
        <el-icon @click="onChangePwdType" v-if="!isShow" :size="20" class="password-icon"><Hide /></el-icon>
      </el-form-item>

      <el-form-item>
        <div style="text-align: center; width: 100%">
          <el-button type="primary" @click="submitForm(formRef)">登录</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import type { FormInstance } from 'element-plus';
import { FormRules } from 'element-plus';
import { reactive, ref } from 'vue';

interface LoginForm {
  nameUser: string;
  password: string;
}

const formRef = ref<FormInstance>();
const isShow = ref<boolean>(false);
const inputType = ref<string>('password');
const loginForm = reactive<LoginForm>({
  nameUser: '',
  password: '',
});

const rules = reactive<FormRules<typeof loginForm>>({
  nameUser: [{ required: true, trigger: ['blur', 'change'], message: '请输入账号' }],
  password: [{ required: true, trigger: ['blur', 'change'], message: '请输入密码' }],
});

const onChangePwdType = () => {
  isShow.value = !isShow.value;
  isShow.value ? (inputType.value = 'password') : (inputType.value = 'text');
};

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate(valid => {
    if (valid) {
      console.log('submit!');
    } else {
      console.log('error submit!');
    }
  });
};
</script>

<style scoped lang="scss">
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;
$cursor: #fff;

#login {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;
  .form-login {
    width: 400px;
    text-align: center;
    max-width: 600px;
    padding: 20px;
    background-color: white;
    border-radius: 5px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    .password-icon {
      position: absolute;
      top: 25%;
      right: 5px;
      color: #ccc;
    }
  }
}
</style>
