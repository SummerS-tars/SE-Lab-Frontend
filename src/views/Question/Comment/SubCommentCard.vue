<script setup>
import FollowButton from '@/views/User/FollowButton.vue';
import SubComentList from './SubCommentList.vue';
import CommentForm from './CommentForm.vue';
import { ChatLineRound} from '@element-plus/icons-vue';
import { computed, ref } from 'vue';
import LikeButton from '@/components/LikeButton.vue';
import CommentButton from '@/views/Question/Comment/CommentButton.vue';
import { useCommentStore } from '@/stores/comment';
import MoreOperatorButton from './MoreOperatorButton.vue';
import { useUserStore } from '@/stores/user';


const props=defineProps({
  commentId:{default:''},
});

const showCommentForm=ref(false);

const commentRef=computed(()=>useCommentStore().get(props.commentId));
const answerId=computed(()=>commentRef.value.answerId);

const createReplyParams=computed(()=>{
	let params={
		answerId:answerId.value,
		commentId:commentRef.value.fatherCommentId,
		replyType:"CITE",
		replyTo:props.commentId,
	};
	return params;
});

const isDirectReply=()=>{
	return commentRef.value.replyType=='DIRECT';
};

const showDelete=computed(()=>{
	if(!useUserStore().token())return false;
	return commentRef.value.userId==useUserStore().id;
});

</script>


<template>
  <el-card style="border:0px" class="no-border">
		<div style="justify-content: space-between;display: flex;align-items: center;">
			<div>
				<template v-if="isDirectReply()">
					<a class="comment-link" :href="`/user/profile/${commentRef.userId}`">
						<span style=""> {{ commentRef.username }}</span>
					</a>
				</template>
				<template v-else>
					<a class="comment-link" :href="`/user/profile/${commentRef.userId}`">
						<span style=""> {{ commentRef.username }}</span>
					</a>
					<span>></span>
					<a class="comment-link" :href="`/user/profile/${commentRef.replyToUserId}`">
						<span style=""> {{ commentRef.replyToUsername }}</span>
					</a>
				</template>
				
				<br/>
				{{ commentRef.content }}
				<br/>
				<span style="font-size: 12px;color: #999;"> {{ commentRef.createdAt }}</span>
			</div>
			<div style="display: flex;align-items: center;">
				<span style="width: 60px;"><LikeButton api="/api/auth/user/reply" :params="{id:props.commentId}" v-model:info="commentRef"></LikeButton></span>
				<span style="width: 60px;" @click="showCommentForm=!showCommentForm">
					<div style="cursor: pointer;">
						<span style="display: flex; align-items: center;">
							<el-icon size="20px" style="margin-right: 4px;"><ChatLineRound /></el-icon>
							<el-text style="font-size: small;color: #999;">回复</el-text>
						</span>
					</div>
				</span>
				<span><MoreOperatorButton deteteApi="/api/auth/reply/delete" :params="{id:props.commentId}" :showDelete="showDelete" :copyContent="commentRef.content"/></span>
			</div>
		</div>
		<template v-if="showCommentForm">
			<CommentForm api="/api/auth/reply/create" :params="createReplyParams"/>
		</template>
	</el-card>
</template>


<style scoped>

.comment-link{
	font-weight: bold;
	color: black;
	text-decoration: none;
}

.comment-link:hover{
	color: #007BFF;
}

.no-border {
  border: none !important;
  box-shadow: none;
}

</style>