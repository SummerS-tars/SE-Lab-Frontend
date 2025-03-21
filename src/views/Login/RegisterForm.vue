<script setup>

import { ElMessage } from 'element-plus';
import { reactive, ref } from 'vue';
import request from '@/request/http';
import { useUserStore } from '@/stores/user';
import { useRouter } from 'vue-router';

let router = useRouter();

const ruleFormRef = ref();

const ruleForm = reactive({
  username: '',
	password: '',
	email: '',
});

const rules = reactive({
	username: [{
		validator: (rule, value, callback) => {
			const regex = /^[\u4e00-\u9fa5a-zA-Z0-9_]{2,20}$/;
			if (value === '') {
				callback(new Error('请输入用户名'));
			}
			else if(value.length<2) {
				callback(new Error('用户名过短'));
			}
			else if(value.length>20) {
				callback(new Error('用户名过长'));
			}
			else if(!regex.test(value)) {
				callback(new Error('存在非法字符'));
			}
			else {
				callback();
			}
		},
		trigger: 'blur',
	}],
	password: [{
		validator: (rule, value, callback) => {
			const regex = /^[a-zA-Z0-9_]{8,}$/;
			const hasLetter = /[a-zA-Z]/.test(value);
			const hasNumber = /[0-9]/.test(value);
			if (value === '') callback(new Error("请输入密码"));
			else if(value.length<8) callback(new Error("密码过短"));
			else if(!regex.test(value)) callback(new Error("存在非法字符"));
			else if(!hasLetter) callback(new Error("密码必须包含字母"));
			else if(!hasNumber) callback(new Error("密码必须包含数字"));
			else callback();
		},
		trigger: 'blur'
	}],
	email: [{
		type: 'email',
		message: '邮箱格式错误',
		trigger: 'blur'
	}],
});

const submitForm = (formEl) => {
	if(!formEl) {
		return;
	}
	formEl.validate(async (valid) =>{
		if(valid) {
			let res=await request.post('/api/public/register', ruleForm);
			ElMessage.success('注册成功');
			await router.push('/login');
		}
	});
};

</script>


<template>
	<el-form
		ref="ruleFormRef"
		:model="ruleForm"
		:rules="rules"
		style="max-width: 300px; margin: 0 auto;"
		label-width="auto"
		class="demo-ruleForm">

		<div class="header">
			<img src="@/assets/Mu_Silk.png" alt="Logo" style="height: 120px; padding-top: 20px">
		</div>

		<el-form-item label="用户名" prop="username">
			<el-popover
				placement="right"
				trigger="hover"
				content="2至20位中英文字符、数字与下划线"
				width="260"
			>
				<template #reference>
				<el-input v-model="ruleForm.username" type="text" autocomplete="off"/>
				</template>
			</el-popover>
		</el-form-item>

		<el-form-item label="密码" prop="password">
			<el-popover
				placement="right"
				trigger="hover"
				content="不少于8位英文字符、数字与下划线，至少需要同时包含英文字符和数字"
				width="260"
			>
				<template #reference>
				<el-input v-model="ruleForm.password" type="password" autocomplete="off"/>
				</template>
			</el-popover>
		</el-form-item>

		<el-form-item label="邮箱" prop="email">
			<el-input v-model="ruleForm.email" type="email" autocomplete="off"/>
		</el-form-item>

		<el-form-item>
			<el-button type="primary" @click="submitForm(ruleFormRef)" style="width:300px">注册</el-button>
		</el-form-item>

		<el-form-item>
			<el-text>已有账号？</el-text>
			<router-link class="el-link el-link--primary is-underline" to="/login">登录</router-link>
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