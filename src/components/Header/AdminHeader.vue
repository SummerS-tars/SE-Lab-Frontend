<script setup>
import { ElMessage,ElNotification as notify} from 'element-plus';
import { User, Setting} from '@element-plus/icons-vue';
import { useUserStore } from '@/stores/user';
import request from '@/request/http';
import router from '@/router';
import { nextTick, ref, watch } from 'vue';
import QuestionEditBoxForm from './QuestionEditBoxForm.vue';

const logout = () =>{
	request.post("/api/auth/logout").then(res=>{
		console.log(res);
		if(res.message=="success"){
			ElMessage.success("成功退出登录");
			useUserStore().logout();
			router.push("/");
			window.location.reload();
		}else{
			ElMessage.error(res.message);
		}
	});
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
    <div style="align-items:center; display: flex;">
      <span>
        <el-popover :width="80"
        popper-style="box-shadow: rgb(14 18 22 / 35%) 0px 10px 38px -10px, rgb(14 18 22 / 20%) 0px 10px 20px -15px; padding: 20px;"
        >
          <template #reference>
            <div style="font-weight: bold; font-size: 24px; margin-right: 40px;">
              Hello, Admin
            </div>
          </template>
          <el-form style="text-align: center;">
            <el-button type="info" @click="logout" style="width:100% ">登出</el-button>
          </el-form>
        </el-popover>
      </span>
    </div>
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
