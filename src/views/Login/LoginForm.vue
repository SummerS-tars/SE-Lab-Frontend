<script setup>

import { ElMessage } from 'element-plus';
import { nextTick, reactive, ref, toHandlerKey } from 'vue';
import request from '@/request/http';
import { useUserStore } from '@/stores/user';
import router from '@/router';

const ruleFormRef = ref();

const ruleForm = reactive({
	username: '',
	password: ''
});

const rules = reactive({
	username: [{
		validator: (rule, value, callback) => {
			if (value === '') {
				callback(new Error('请输入用户名'));
			}
			else {
				callback();
			}
		},
		trigger: 'blur',
	}],
	password: [{
		validator: (rule, value, callback) => {
			if (value === '') {
				callback(new Error('请输入密码'));
			} else {
				callback();
			}
		},
		trigger: 'blur',
	}],
});

const submitForm = (formEl) => {
	if(!formEl) {
		return;
	}
	formEl.validate(async (valid) =>{
		if(valid) {
			let res=await request.post(`/api/public/login?password=${ruleForm.password}&username=${ruleForm.username}`);
			ElMessage.success('登录成功');
			useUserStore().setToken(res);
		}

		if(useUserStore().isadmin) {
			await router.push('/admin_home');
		} else {
			await router.push('/');
		}
	});
};

</script>


<template>
	<el-form
		ref="ruleFormRef"	
		:model="ruleForm"
		:rules="rules"
		style="max-width: 300px"
		label-width="auto"
		class="demo-ruleForm">

		<div class="header">
			<img src="@/assets/Mu_Silk.png" alt="Logo" style="height: 120px; padding-top: 20px">
		</div>

		<el-form-item label="用户名" prop="username">
			<el-input v-model="ruleForm.username" type="text" autocomplete="off"/>
		</el-form-item>

		<el-form-item label="密码" prop="password">
			<el-input v-model="ruleForm.password" type="password" autocomplete="off"/>
		</el-form-item>

		<el-form-item>
			<el-button type="primary" @click="submitForm(ruleFormRef)" style="width:300px">登录</el-button>
		</el-form-item>

    <el-form-item style="display: flex; justify-content: space-between;">
      <div>
      <el-text>没有账号？</el-text>
      <router-link class="el-link el-link--primary is-underline" to="/register">注册</router-link>
      </div>
    </el-form-item>

	</el-form>

</template>


<style scoped>

.header {
  font-size: 38px;
  font-weight: bold;
  text-align: center;
  line-height: 150px;
}

</style>