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
  <div class="comment-box">
    <el-input
      v-model="commentContent"
      type="textarea"
      :autosize="{ minRows: 2, maxRows: 4 }"
      placeholder="理性发言，友善互动..."
      class="comment-textarea"
    />
    <div class="comment-footer">
      <EmojiPicker @select="appendText" class="emoji-picker-trigger" />
      <el-button type="primary" @click="createComment" class="submit-button">发布评论</el-button>
    </div>
  </div>
</template>


<style scoped>
.comment-box {
  padding: 16px;
}

.comment-textarea ::v-deep(.el-textarea__inner) {
  border-radius: 10px;
  border: 1px solid #e0e0e0;
  font-size: 14px;
  padding: 12px 16px;
  resize: none;
}

.comment-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 12px;
}

.emoji-picker-trigger {
  cursor: pointer;
  font-size: 20px;
  color: #666;
  transition: color 0.2s ease;
}

.emoji-picker-trigger:hover {
  color: #333;
}

.submit-button {
  padding: 10px 20px;
  font-weight: bold;
  border-radius: 8px;
  transition: background-color 0.3s ease;
}
</style>