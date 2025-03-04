<script setup>

import { ElMessage } from 'element-plus';
import { reactive, ref } from 'vue';
import request from '@/request/http';
import { useTokenStore } from '@/stores/token';

const tokenStore = useTokenStore();

const ruleFormRef = ref();

const ruleForm = reactive({
	username: '',
	password: ''
});

const rules = reactive({
	username: [{
		validator: (rule, value, callback) => {
			if (value === "") {
				callback(new Error("请输入用户名"));
			} else {
				callback();
			}
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
			let res=await request.post("/api/login", ruleForm);
			if(res.message=='success'){
				ElMessage.success('登录成功')
				useTokenStore().setToken(res.token);
				await router.push('/');
			}
			else{
				ElMessage.error(res.message)
			}
		}
		else{
			ElMessage.error('登录失败,未输入用户名或密码')
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

		<el-form-item label="用户名" prop="username">
			<el-input v-model="ruleForm.username" type="text" autocomplete="off"/>
		</el-form-item>

		<el-form-item label="密码" prop="password">
			<el-input v-model="ruleForm.password" type="password" autocomplete="off"/>
		</el-form-item>

		<el-form-item>
			<el-button type="primary" @click="submitForm(ruleFormRef)" style="width:300px">登录</el-button>
		</el-form-item>

		<el-form-item>
			<el-text>没有账号？</el-text><el-link href="/register" type="primary">注册</el-link>
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