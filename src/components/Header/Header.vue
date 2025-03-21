<script setup>
import { ElMessage,ElNotification as notify} from 'element-plus';
import { User, Setting} from '@element-plus/icons-vue';
import { useUserStore } from '@/stores/user';
import request from '@/request/http';
import router from '@/router';
import { nextTick, ref, watch } from 'vue';
import QuestionEditBoxForm from './QuestionEditBoxForm.vue';

const logout = async() =>{
	try{
		await request.post('/api/auth/logout');
		ElMessage.success('成功退出登录');
	}catch(e){
		ElMessage.error(e);
	}finally{
		useUserStore().logout();
		router.push('/');
		window.location.reload();
	}
};

const EditBox = ref();

</script>

<template>
	<div class="nav">
		<div>
			<el-link href="/" :underline="false">
				<img src="@/assets/Mu_Silk.png" alt="logo" style="height: 60px; margin-right: 15px;">
				<el-text type="primary" style="margin: left;font-size:20px; text-align: center;">矢呼</el-text>
			</el-link>
		</div>
		<template v-if="!useUserStore().token()">
			<div>
				<el-link href="/login">登录</el-link>
				<el-link href="/register">注册</el-link>
			</div>
		</template>
		<template v-else>
			<div style="align-items:center; display: flex;">
				<span style="margin-right: 30px;">
					<el-button type="primary" round @click="EditBox.open()">提问</el-button>
					<QuestionEditBoxForm ref="EditBox"></QuestionEditBoxForm>
				</span>
				<span>
					<el-popover :width="80"
					popper-style="box-shadow: rgb(14 18 22 / 35%) 0px 10px 38px -10px, rgb(14 18 22 / 20%) 0px 10px 20px -15px; padding: 20px;"
					>
						<template #reference>
							<div style="font-weight: bold; font-size: 24px; margin-right: 40px;">
								Hello,
								<a :href="`/user/profile/${useUserStore().id}`" class="nav-user">
									{{ useUserStore().username }}
								</a>
							</div>
						</template>
						<el-form style="text-align: center;">
							<div style="margin-bottom: 10px;padding-bottom:5px;border-bottom: 1px; border-style: solid;">
								<el-text style="font-size: 20px;">{{ useUserStore().username }}</el-text>
								<hr style="border-bottom: 1px; border-style: solid; padding-bottom: 10px;"/>
								<br/>
								<el-link :underline="false" style="font-size: 15px; margin-bottom: 10px;" :href="`/user/profile/${useUserStore().id}`">
									<el-icon><User/></el-icon>个人主页
								</el-link>
								<template v-if="useUserStore().isadmin">
									<br/>
									<el-link :underline="false" style="font-size: 15px; margin-bottom: 10px;" href="/admin_home">
										<el-icon><Setting/></el-icon>管理员设置
									</el-link>
								</template>
							</div>
							<el-button type="info" @click="logout" style="width:100% ">登出</el-button>
						</el-form>
					</el-popover>
				</span>
				
			</div>
		</template>
	</div>
</template>

<style scoped>
.nav{
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.nav-user{
	/* text-decoration: none; */
	color: black;
}

.el-link{
    margin-right: 8px;
}

</style>
