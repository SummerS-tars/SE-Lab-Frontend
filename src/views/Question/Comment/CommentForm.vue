<script setup>
import EmojiPicker from '@/components/EmojiPicker.vue';
import request from '@/request/http';
import { useUserStore } from '@/stores/user';
import { ElMessage } from 'element-plus';
import { ref } from 'vue';
import V3Emoji from 'vue3-emoji';

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
	
	console.log(props.api,params);

	request.post(props.api,params).then(res=>{
		commentContent.value='';
		window.location.reload();
		ElMessage.success('评论成功');
	});
}

const appendText = (emoji) => {
	commentContent.value += emoji;
}

const emoji = ref(null);

</script>


<template>
    <div style="display: flex; align-items: center;margin-top: 10px;">
		<div style="display: flex; flex-direction: column;width: 100%;margin-right: 20px;">
			<el-input v-model="commentContent" placeholder="理性发言，友善互动" type="textarea" autosize></el-input>
			<EmojiPicker @select="appendText"></EmojiPicker>
		</div>
		<el-button type="primary" @click="createComment">发布评论</el-button>
    </div>
</template>


<style scoped>

::v-deep(.emoji-picker) {
  z-index: 9999 !important;
}

</style>