<script setup>
import MarkdownContent from '@/components/MarkdownContent.vue';
import request from '@/request/http';
import { useUserStore } from '@/stores/user';
import { ElMessage, ElMessageBox } from 'element-plus';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import QuestionEditBoxForm from '../User/QuestionList/QuestionEditBoxForm.vue';

const route = useRoute();
const userid =  route.params.id;

const props=defineProps({
	id:{default:''},
	removethis:{default:() => {}},
});

let questionInfo=ref({
	answerCount:0,
});

onMounted(async() => {
	let res= await request.get(`/api/public/question/byId/${props.id}`);
	questionInfo.value={
		title:res.title,
		content:res.content,
		createdAt:res.createdAt,
		answerCount:res.answerCount,
	};
});

const deleteQuestion=async() => {
	if(questionInfo.value.answerCount>0) {
		ElMessage.error('问题已存在回答，不能删除');
		return;
	}
	ElMessageBox.confirm('确认删除吗?').then(async() => {
		await request.post(`/api/auth/question/delete`,{id:props.id});
		props.removethis();
		ElMessage.success('删除成功');
	});	
};

const EditBox = ref();

</script>

<template>
	<el-card style="margin:10px;border:0px">
		<template #header>
			<a class="link" :href="`/question/${id}`">
				<span style="font-weight: bold;">{{ questionInfo.title }}</span>
			</a>
            <br/>
			<span style="font-size: 14px;color: #999;">创建时间: {{ questionInfo.createdAt }}</span>
		</template>
        <MarkdownContent :id="` problem-content`+id" :content="questionInfo.content"/>
		<template #footer>
			<div class="card-footer" style="display: flex;justify-content: space-between">
				<span style="font-size: 16px;font-weight: bold;"> 回答数： {{ questionInfo.answerCount }}</span>
				<div>
					<template v-if="useUserStore().isLogin()&&userid==useUserStore().id">
						<el-button type="primary" plain @click="EditBox.open()">编辑</el-button>
						<el-button type="danger" plain @click="deleteQuestion">删除</el-button>
					</template>
					<QuestionEditBoxForm 
						ref="EditBox" 
						:id = "props.id"
						:EditBoxid="`question-editbox-${props.id}`" 
						v-model:title="questionInfo.title" 
						v-model:content="questionInfo.content">
					</QuestionEditBoxForm>
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