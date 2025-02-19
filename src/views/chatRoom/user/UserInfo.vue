<template>
  <el-dialog v-model="isShow" width="500" title="用户个人消息">
    <el-form label-width="100px" :model="props.userInfo" :rules="rules">
      <el-form-item label="头像">
        <el-upload
          class="avatar-uploader"
          :action="props.actionUrl"
          :on-success="handleAvatarSuccess"
          name="file"
          :headers="headers"
          :show-file-list="false"
        >
          <img
            width="50"
            height="50"
            v-if="imageUrl || (props.userInfo && props.userInfo.headerImg)"
            :src="imageUrl || props.userInfo.headerImg"
          />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
      </el-form-item>
      <el-form-item label="名称" prop="name">
        <el-input v-model="props.userInfo.name"></el-input>
      </el-form-item>
      <el-form-item label="昵称">
        <el-input v-model="props.userInfo.nickname"></el-input>
      </el-form-item>

      <el-form-item label="密码" prop="password" v-if="props.userInfo.id < 0">
        <el-input v-model="props.userInfo.password"></el-input>
      </el-form-item>

      <el-form-item label="性别">
        <el-radio-group v-model="props.userInfo.gender">
          <el-radio :value="0" size="large">男</el-radio>
          <el-radio :value="1" size="large">女</el-radio>
          <el-radio :value="2" size="large">保密</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <div>
      <el-button type="primary" @click="onSubmit">确定</el-button>
      <el-button type="primary" @click="updatedShow">取消</el-button>
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
import { FormRules } from 'element-plus';
import { UploadProps } from 'element-plus/es/components/upload';
import { reactive, ref } from 'vue';
import { IUser } from '../../../types/user';
import { getLocalStorageToken } from '../../../utils';
import { createUser, upUser } from '../../../api/user';

interface IProps {
  userInfo: IUser;
  actionUrl: string;
}
const props = defineProps<IProps>();

// 双向绑定
const isShow = defineModel('isShow', {
  type: Boolean,
  default: false,
  required: true,
});

const headers = reactive({
  authorization: `Bearer ${getLocalStorageToken()}`,
});
const imageUrl = ref('');

const rules = reactive<FormRules>({
  name: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
});

const handleAvatarSuccess: UploadProps['onSuccess'] = (response, uploadFile) => {
  imageUrl.value = props.userInfo.id < 0 ? uploadFile.response.data : URL.createObjectURL(uploadFile.raw!);
};

const onSubmit = async () => {
  let res = null;
  if (props.userInfo.id < 0) {
    props.userInfo.headerImg = imageUrl.value;
    res = await createUser(props.userInfo);
  } else {
    res = await upUser(props.userInfo, props.userInfo.id);
  }

  if (res.success) {
    isShow.value = false;
  }
};

const updatedShow = () => {
  isShow.value = false;
};
</script>
<style scoped></style>
