<script setup>
import MarkdownContent from '@/components/MarkdownContent.vue';
import request from '@/request/http';
import { ElMessage, ElMessageBox } from 'element-plus';
import { onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import AnswerEditBoxForm from './AnswerEditBoxForm.vue';
import { useUserStore } from '@/stores/user';
import LikeButton from '@/components/LikeButton.vue';
import { useAnswerStore } from '@/stores/answer';

const route = useRoute();
const userid =  route.params.id;

const props=defineProps({
    questionid:{default:undefined},
    answerid:{default:undefined},
	removethis:{default:() => {}},
});

const questionInfo=ref({});
const answerInfo=ref({});

const fetchData=async() => {
	if(!props.questionid||!props.answerid) {
		return;
	}
	request.get(`/api/public/question/byId/${props.questionid}`).then(res=>{
		questionInfo.value.title=res.title;
	});

	answerInfo.value.id=props.answerid;
	request.get(`/api/public/answer/byId/${props.answerid}`).then(res=>{
		answerInfo.value.author={
			id:res.authorId,
			username:res.author,
		};
		answerInfo.value.createdAt=res.createdAt;
		answerInfo.value.content=res.content;
		answerInfo.value.likes=res.likes;
	});
	if(useUserStore().token()) {
		request.get(`/api/auth/user/answer/like`,{params:{id:props.answerid}}).then(res=>{
			answerInfo.value.liked=res.liked;
		});
	}
	useAnswerStore().setAnswer(answerInfo);
};

onMounted(() => {fetchData()});
watch(()=>props,() => {fetchData()});

const deleteAnswer=async() => {
	ElMessageBox.confirm('确认删除吗?').then(async() => {
		await request.post(`/api/auth/answer/delete`,{id:props.answerid});
		props.removethis();
		ElMessage.success('删除成功');
	});
};

const EditBox = ref();

</script>

<template>
	<el-card style="margin:10px;border:0px">
		<template #header>
			<a class="link" :href="`/question/${props.questionid}`">
				<span style="font-weight: bold;">{{ questionInfo.title }}</span>
			</a>
      <br/>
			<span style="font-size: 14px;color: #999;">回答时间: {{  answerInfo.createdAt }}</span>
		</template>
        <MarkdownContent :id="props.answerid+` answer-content`" :content="answerInfo.content"/>
		<template #footer>
			<div class="card-footer" style="display: flex;justify-content: space-between;">
				<div>
					<LikeButton api="/api/auth/user/answer" v-model:info="answerInfo"></LikeButton>
				</div>
				<div style="display: flex;justify-content: flex-end">
					<template v-if="useUserStore().token()&&userid==useUserStore().id">
						<el-button type="primary" plain @click="EditBox.open()">编辑</el-button>
						<el-button type="danger" plain @click="deleteAnswer">删除</el-button>
					</template>
					<AnswerEditBoxForm
						ref="EditBox"
						:id= "props.answerid"
						:EditBoxid="`answer-editbox-${props.answerid}`"
						v-model:content="answerInfo.content">
					</AnswerEditBoxForm>
				</div>
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