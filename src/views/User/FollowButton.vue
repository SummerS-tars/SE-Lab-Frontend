<script setup>
import request from '@/request/http';
import { useUserStore } from '@/stores/user';
import { ElMessage } from 'element-plus';
import { ref } from 'vue';


const props=defineProps({
	author:{default:{id:'',username:'',liked:false}},
});

const liked=ref(props.author.liked);

const followUser=async(userid)=>{
	if(!useUserStore().token){
		ElMessage.error('请先登录后再进行操作');
		return;
	}
	let res = await request.post('/api/auth/user/follow',{id:userid});
	if(res.message=='success')liked.value=true;
    else ElMessage.error(res.message);
};

const unfollowUser=async(userid)=>{
	if(!useUserStore().token){
		ElMessage.error('请先登录后再进行操作');
		return;
	}
	let res = await request.post('/api/auth/user/unfollow',{id:userid});
	if(res.message=='success')liked.value=false;
    else ElMessage.error(res.message);
};

</script>


<template>
	<template v-if="useUserStore().token && useUserStore().id===props.author.id">
		
	</template>
	<template v-else-if=liked>
		<el-button type="primary" @click="unfollowUser(props.author.id)">已关注</el-button>
	</template>
	<template v-else>
		<el-button type="primary" @click="followUser(props.author.id)">+ 关注</el-button>
	</template>
</template>


<style scoped>


</style>