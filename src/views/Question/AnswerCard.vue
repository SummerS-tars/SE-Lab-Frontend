<script setup>
import IconLike from '@/components/icons/IconLike.vue';
import request from '@/request/http';
import { useUserStore } from '@/stores/user';
import { ElMessage } from 'element-plus';
import { onMounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import FollowButton from '../User/FollowButton.vue';
import LikeButton from './LikeButton.vue';
import MarkdownContent from '@/components/MarkdownContent.vue';
import { useAnswerStore } from '@/stores/answer';

const props=defineProps({
	id:{default:''},
});

const answerInfo=ref({
	author:{id:'',username:''},
});

onMounted(()=>{
	answerInfo.value.id=props.id;
	answerInfo.value.like=false;
	request.get(`/api/public/answer/byId/${props.id}`).then(res=>{
		answerInfo.value.author={
			id:res.authorId,
			username:res.author,
		};
		answerInfo.value.createAt=res.createAt;
		answerInfo.value.content=res.content;
		answerInfo.value.likes=res.likes;
	});
	if(useUserStore().token){
		request.get(`/api/auth/user/answer/like`,{params:{id:props.id}}).then(res=>{
			answerInfo.value.liked=res.liked;
		});
	}
	useAnswerStore().setAnswer(answerInfo)
});

</script>

<template>
	<el-card style="margin:10px;border:0px">
		<template #header >
			<div style="justify-content: space-between;display: flex;align-items: center;">
				<div>
					answer by
					<a class="link" :href="`/user/profile/${answerInfo.author.id}`">
						<span style="font-weight: bold;"> {{ answerInfo.author.username }}</span>
					</a>
					<br/>
					<span style="font-size: 14px;color: #999;"> {{ answerInfo.createAt }}</span>
				</div>
				<div>
					<FollowButton :authorId="answerInfo.author.id"></FollowButton>
				</div>
			</div>
			
		</template>

		<MarkdownContent :id="`answer-content${props.id}`" :content="answerInfo.content"></MarkdownContent>
		
		<template #footer>
			<div class="card-footer">
				<span>
					<LikeButton :id="props.id"></LikeButton>
				</span>
			</div>
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