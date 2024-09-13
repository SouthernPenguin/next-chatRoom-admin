<template>
  <div id="login">
    <div class="form-login">
      <h2 class="title">后台管理系统</h2>
      <el-form :model="loginForm" label-width="auto" :rules="rules" ref="formRef">
        <el-form-item label="账号" prop="name">
          <el-input v-model="loginForm.name" />
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
  </div>
</template>

<script setup lang="ts">
import type { FormInstance } from 'element-plus';
import { FormRules } from 'element-plus';
import { reactive, ref } from 'vue';
import { login } from '@/api/auth';
import { useLoginUser } from '@/stores/user';
import { useRouter } from 'vue-router';
import { getMenu } from '../../api/auth';
import { menuTree } from '../../utils';
import { UseLoginUser } from '../../stores/user';
import { useMenuRouterStore } from '../../stores/menu';

const loginUser = useLoginUser();
const menuRouter = useMenuRouterStore();
const router = useRouter();

interface LoginForm {
  name: string;
  password: string;
}

const formRef = ref<FormInstance>();
const isShow = ref<boolean>(false);
const inputType = ref<string>('password');
const loginForm = reactive<LoginForm>({
  name: '',
  password: '',
});

const rules = reactive<FormRules<typeof loginForm>>({
  name: [{ required: true, trigger: ['blur', 'change'], message: '请输入账号' }],
  password: [{ required: true, trigger: ['blur', 'change'], message: '请输入密码' }],
});

// 显示隐藏密码
const onChangePwdType = () => {
  isShow.value = !isShow.value;
  isShow.value ? (inputType.value = 'password') : (inputType.value = 'text');
};

// 登录
const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate(async valid => {
    if (valid) {
      const res = await login(loginForm);
      if (res.success) {
        loginUser.setUserInfo(res.data.userInfo, res.data.token);
        const re1s = await getMenu();
        loginUser.$patch((state: UseLoginUser) => {
          state.menus = menuTree(re1s.data) as any[];
        });
        menuRouter.tags = [{ path: '/home', name: '首页' }];
        router.push({ path: '/home', replace: true });
      }
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
    .title {
      margin-bottom: 10px;
    }
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
