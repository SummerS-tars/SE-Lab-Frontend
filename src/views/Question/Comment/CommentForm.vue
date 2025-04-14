<script setup>
import { ref } from 'vue';


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
    //todo
	request.post('/api/auth/answer/comment',{id:props.id,content:commentContent.value}).then(res=>{
		commentContent.value='';
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