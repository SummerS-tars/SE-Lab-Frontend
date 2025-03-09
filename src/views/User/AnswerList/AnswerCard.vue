<script setup>
import IconLike from '@/components/icons/IconLike.vue';
import MarkdownContent from '@/components/MarkdownContent.vue';
import request from '@/request/http';
import { onMounted, ref } from 'vue';

const props=defineProps({
    questionid:{default:''},
    answerid:{default:''},
})

const questionInfo=ref({
	title:'',
});
const answerInfo=ref({});

onMounted(async() =>{
	console.log(props.questionid);
	console.log(props.answerid);
	let res = await request.get(`/api/question/byId/${props.questionid}`);
	if(res.message=='success'){
		questionInfo.value.title=res.title;
	}
	res = await request.get(`/api/answer/byId/${props.answerid}`);
	if(res.message=='success'){
		answerInfo.value.createAt=res.createAt;
		answerInfo.value.content=res.content;
	}
})

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
                <el-button type="primary" plain>编辑</el-button>
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