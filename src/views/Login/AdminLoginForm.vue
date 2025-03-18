<script setup>

import { ElMessage } from 'element-plus';
import { reactive, ref } from 'vue';
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
			if (value === "") callback(new Error("请输入用户名"));
			else callback();
		},
		trigger: "blur",
	}],
	password: [{
		validator: (rule, value, callback) => {
			if (value === "") {
				callback(new Error("请输入密码"));
			} else {
				callback();
			}
		},
		trigger: "blur"
	}],
});

const submitForm = (formEl) => {
	if(!formEl) return;
	formEl.validate(async (valid) =>{
		if(valid){
			let data={
				username:ruleForm.username, 
				password:ruleForm.password
			};
			let res=await request.post(`/api/auth/login?password=${data.password}&username=${data.username}`);
			console.log(res);
			ElMessage.success('登录成功');
			useUserStore().setToken(res);
			await router.push('/admin_home');
		}
	});
}

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

		<el-form-item label="管理员用户名" prop="username">
			<el-input v-model="ruleForm.username" type="text" autocomplete="off"/>
		</el-form-item>

		<el-form-item label="管理员密码" prop="password">
			<el-input v-model="ruleForm.password" type="password" autocomplete="off"/>
		</el-form-item>

		<el-form-item>
			<el-button type="primary" @click="submitForm(ruleFormRef)" style="width:300px">登录</el-button>
		</el-form-item>

		<el-form-item>
			<el-text>不是管理员？</el-text>
			<router-link class="el-link el-link--primary is-underline" to="/login">用户登录</router-link>
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