<script setup>
import MarkdownContent from '@/components/MarkdownContent.vue';
import request from '@/request/http';
import { ElMessage } from 'element-plus';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import AnswerEditBoxForm from './AnswerEditBoxForm.vue';
import { useUserStore } from '@/stores/user';

const route = useRoute();
const userid =  route.params.id;

const props=defineProps({
    questionid:{default:''},
    answerid:{default:''},
	removethis:{default:()=>{}}
})

const questionInfo=ref({});
const answerInfo=ref({});

onMounted(async() =>{
	request.get(`/api/public/question/byId/${props.questionid}`).then(res=>{
		questionInfo.value.title=res.title;
	})
	request.get(`/api/public/answer/byId/${props.answerid}`).then(res=>{
		answerInfo.value.createAt=res.createdAt;
		answerInfo.value.content=res.content;
	})
})

const deleteAnswer=async()=>{
	if(!confirm('确定删除吗？'))return;
	let res=await request.post(`/api/auth/answer/delete`,{id:props.answerid});
	props.removethis();
	ElMessage.success('删除成功');
}

const EditBox = ref();

</script>

<template>
	<el-card style="margin:10px;border:0px">
		<template #header>
			<a class="link" :href="`/question/${id}`">
				<span style="font-weight: bold;">{{ questionInfo.title }}</span>
			</a>
            <br/>
			<span style="font-size: 14px;color: #999;">回答时间: {{  answerInfo.createAt }}</span>
		</template>
        <MarkdownContent :id="props.answerid+` answer-content`" :content="answerInfo.content"/>
		<template #footer>
			<div class="card-footer" style="display: flex;justify-content: flex-end">
                <template v-if="useUserStore().token&&userid==useUserStore().id">
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