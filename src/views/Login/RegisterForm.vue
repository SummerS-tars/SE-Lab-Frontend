<script setup>
import { useTokenStore } from '@/stores/token';
import { reactive, ref } from 'vue';

const ruleFormRef = ref();

const ruleForm = reactive({
  username: "",
	password: "",
	email: "",
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
	email: [{
		type: 'email',
		message: '邮箱格式错误',
		trigger: "blur"
	}],
});

const submitForm = (formEl) => {
	if(!formEl) return;
	formEl.validate(async (valid) =>{
		if(valid){
			let res=await request.post("/api/register", ruleForm);
			if(res.message=='success'){
				ElMessage.success('注册成功')
				useTokenStore().setToken(res.token);
				await router.push('/');
			}
			else{
				ElMessage.error(res.message)
			}
		}
		else{
			ElMessage.error('注册失败,信息不完整')
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

		<el-form-item label="邮箱" prop="email">
			<el-input v-model="ruleForm.email" type="email" autocomplete="off"/>
		</el-form-item>

		<el-form-item>
			<el-button type="primary" @click="submitForm(ruleFormRef)" style="width:300px">注册</el-button>
		</el-form-item>

		<el-form-item>
			<el-text>已有账号？</el-text><el-link href="/login" type="primary">登录</el-link>
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