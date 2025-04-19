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
})

const content=computed(()=>{
	if(props.messageInfo.answer)return props.messageInfo.answer.content;
})

</script>


<template>
  <el-card style="margin-top:5px">
		<div style="justify-content: space-between;display: flex;align-items: center;">
			<div>
				<div style="font-size: 16px;color: #999;">
					<a class="message-user-link" :href="`/user/profile/${props.messageInfo.userId}`">
						<span style=""> {{ props.messageInfo.username }}</span>
					</a>
					<span>点赞了你的{{messageType}}</span>
				</div>
				<span style="font-size: 12px;color: #999;"> {{ "00::00" }}</span>
				<MarkdownContent :id="`message-answer-content-${index}`" :content="content"></MarkdownContent>
				<!-- {{ content }} -->
				<br/>
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