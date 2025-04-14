<script setup>
import FollowButton from '@/views/User/FollowButton.vue';
import SubComentList from './SubCommentList.vue';
import CommentForm from './CommentForm.vue';
import { ChatLineRound} from '@element-plus/icons-vue';
import { computed, ref } from 'vue';
import LikeButton from '@/components/LikeButton.vue';
import CommentButton from '@/views/Question/Comment/CommentButton.vue';
import { useCommentStore } from '@/stores/comment';


const props=defineProps({
  commentId:{default:''},
});

const showCommentForm=ref(false);

const commentRef=computed(()=>useCommentStore().get(props.commentId));

</script>


<template>
  <el-card style="border:0px" class="no-border">
		<div style="justify-content: space-between;display: flex;align-items: center;">
			<div>
				<a class="comment-link" :href="`/user/profile/${commentRef.authorId}`">
					<span style=""> {{ commentRef.author }}</span>
				</a>
				<br/>
				{{ commentRef.content }}
				<br/>
				<span style="font-size: 12px;color: #999;"> {{ commentRef.createdAt }}</span>
			</div>
			<div style="display: flex;align-items: center;">
				<span style="width: 60px;"><LikeButton api="/api/auth/user/comment" v-model:info="commentRef"></LikeButton></span>
				<span style="width: 60px;" @click="showCommentForm=!showCommentForm">
					<div style="cursor: pointer;">
						<span style="display: flex; align-items: center;">
							<el-icon size="20px" style="margin-right: 4px;"><ChatLineRound /></el-icon>
							<el-text style="font-size: small;color: #999;">回复</el-text>
						</span>
					</div>
				</span>
			</div>
		</div>
		<template v-if="showCommentForm"><CommentForm/></template>
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