<script setup>
import request from '@/request/http';
import { useUserStore } from '@/stores/user';
import { ElMessage } from 'element-plus';
import { onMounted, ref, watch } from 'vue';


const props=defineProps({
	authorId:undefined,
});

const followed=ref(false);

onMounted(()=>{
	if(props.authorId){
		request.get("/api/auth/user/followed",{params:{ id:props.authorId}}).then(res=>{
			followed.value=res.followed;
		});
	}
})

watch(()=>props.authorId,(newVal)=>{
	console.log(newVal);
	request.get("/api/auth/user/followed",{params:{ id:newVal}}).then(res=>{
		followed.value=res.followed;
	});
});

const followUser=async(userid)=>{
	if(!useUserStore().token){
		ElMessage.error('请先登录后再进行操作');
		return;
	}
	request.post('/api/auth/user/follow',{id:userid}).then(res=>{
		followed.value=true;
		window.location.reload();
	});
};

const unfollowUser=async(userid)=>{
	if(!useUserStore().token){
		ElMessage.error('请先登录后再进行操作');
		return;
	}
	request.post('/api/auth/user/unfollow',{id:userid}).then(res=>{
		followed.value=false;
		window.location.reload();
	});
};

</script>


<template>
	<template v-if="useUserStore().token && useUserStore().id===props.authorId">
		
	</template>
	<template v-else-if=followed>
		<el-button type="primary" @click="unfollowUser(props.authorId)">已关注</el-button>
	</template>
	<template v-else>
		<el-button type="primary" @click="followUser(props.authorId)">+ 关注</el-button>
	</template>
</template>


<style scoped>


</style>