<script setup>
import request from '@/request/http';
import { useUserStore } from '@/stores/user';
import { ElMessage } from 'element-plus';
import { ref } from 'vue';

const props = defineProps({
	api : {default: '',required:true},
	params : {default: {},required:true},
})

const commentContent=ref('');
const createComment=async() =>{
	if(!useUserStore().token()){
		ElMessage.error('请先登录后再进行操作');
		return;
	}
	if(commentContent.value.length==0){
		ElMessage.error('评论内容不能为空');
		return;
	}

	let params=props.params;
	params.content=commentContent.value;
	request.post(props.api,params).then(res=>{
		commentContent.value='';
		window.location.reload();
		ElMessage.success('评论成功');
	});
}

</script>


<template>
    <div style="display: flex; align-items: center;margin-top: 10px;">
        <el-input v-model="commentContent" placeholder="理性发言，友善互动" type="textarea" autosize style="margin-right: 20px;"></el-input>
        <el-button type="primary" @click="createComment">发布评论</el-button>
    </div>
</template>


<style scoped>


</style>