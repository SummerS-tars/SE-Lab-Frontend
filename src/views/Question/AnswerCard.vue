<script setup>
import IconLike from '@/components/icons/IconLike.vue';
import request from '@/request/http';
import { useUserStore } from '@/stores/user';
import { ElMessage } from 'element-plus';
import { computed, onMounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import FollowButton from '../User/FollowButton.vue';
import LikeButton from '../../components/LikeButton.vue';
import MarkdownContent from '@/components/MarkdownContent.vue';
import { useAnswerStore } from '@/stores/answer';
import CommentForm from './Comment/CommentForm.vue';
import CommentList from './Comment/CommentList.vue';
import CommentButton from '@/views/Question/Comment/CommentButton.vue';

const props=defineProps({
	id:{default:''},
});

const answerInfo=computed(()=>useAnswerStore().getAnswer(props.id));

const showComments=ref(false);

</script>

<template>
	<el-card style="margin:10px;border:0px">
		<template #header >
			<div style="justify-content: space-between;display: flex;align-items: center;">
				<div>
					answer by
					<a class="link" :href="`/user/profile/${answerInfo.authorId}`">
						<span style="font-weight: bold;"> {{ answerInfo.author }}</span>
					</a>
					<br/>
					<span style="font-size: 14px;color: #999;">回答时间: {{ answerInfo.createdAt }}</span>
				</div>
				<div>
					<FollowButton :authorId="answerInfo.authorId"></FollowButton>
				</div>
			</div>
			
		</template>

		<MarkdownContent :id="`answer-content${props.id}`" :content="answerInfo.content"></MarkdownContent>
		
		<template #footer>
			<div class="card-footer" style="display: flex; ">
				<span style="width: 60px;"><LikeButton api="/api/auth/user/answer" :params="{id:props.id}" v-model:info="answerInfo"></LikeButton></span>
				<span @click="showComments=!showComments" style="width: 60px;"><CommentButton :id="props.id" :comments="answerInfo.commentCount"></CommentButton></span>
			</div>
			<template v-if="showComments" >
				<CommentForm api="/api/auth/comment/create" :params="{answerId:props.id}"></CommentForm>
				<CommentList :answerId="props.id"></CommentList>
			</template>
		</template>
	</el-card>
</template>

<style scoped>

.link{
	font-weight: bold;
	color: black;
	text-decoration: none;
	font-size: large;
}

.link:hover{
	color: #007BFF;
}
</style>