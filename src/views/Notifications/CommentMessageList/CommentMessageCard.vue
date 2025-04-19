<script setup>
import { computed } from "vue"
import MarkdownContent from '@/components/MarkdownContent.vue';


const props=defineProps({
  messageInfo:{default:{}},
	index:{default:0},
});

const messageType=computed(()=>{
	if(props.messageInfo.answer)return "回答";
	else return "评论";
});

const content=computed(()=>{
	if(props.messageInfo.answer)return props.messageInfo.answer.content;
	if(props.messageInfo.comment)return props.messageInfo.comment.content;
	if(props.messageInfo.reply)return props.messageInfo.reply.content;
});

const userId=computed(()=>{
	if(props.messageInfo.comment)return props.messageInfo.comment.userId;
	if(props.messageInfo.reply)return props.messageInfo.reply.userId;
});

const username=computed(()=>{
	if(props.messageInfo.comment)return props.messageInfo.comment.username;
	if(props.messageInfo.reply)return props.messageInfo.reply.username;
});

const hrefQuery=computed(()=>{
	if(props.messageInfo.comment)return {answerId:props.messageInfo.comment.answerId};
	if(props.messageInfo.reply)return {commentId:props.messageInfo.reply.commentId};
});

</script>


<template>
  <el-card style="margin-top:5px">
		<div style="justify-content: space-between;display: flex;align-items: center;">
			<div>
				<div style="font-size: 16px;color: #999;">
					<a class="message-user-link" :href="`/user/profile/${userId}`">
						<span style=""> {{ username }}</span>
					</a>
					<span>回复了你的{{messageType}}</span>
				</div>
				<span style="font-size: 12px;color: #999;"> {{ props.messageInfo.createdAt }}</span>
				<router-link :to="{path:`/question/${props.messageInfo.questionId}`,query:hrefQuery}"  class="comment-link">
					<div>{{props.messageInfo.questionTitle}}</div>
				</router-link>
				<div>{{content}}</div>
			</div>
		</div>
	</el-card>
</template>


<style scoped>

.message-user-link{
	color: #999;
	text-decoration: none;
}

.message-user-link:hover{
	color: #007BFF;
}


</style>