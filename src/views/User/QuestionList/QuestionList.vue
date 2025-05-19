<script setup>
import { onBeforeUpdate, onMounted, onUpdated, ref } from 'vue';
import request from '@/request/http.js';
import { useRoute } from 'vue-router';
import PageInfiniteScroll from '@/components/PageInfiniteScroll.vue';
import MarkdownContent from '@/components/MarkdownContent.vue';
import QuestionEditBoxForm from './QuestionEditBoxForm.vue';
import { useUserStore } from '@/stores/user';
import { ElMessage, ElMessageBox } from 'element-plus';

let FetchSet = new Set();
const tableData = ref([]);

const route = useRoute();
const userid =  route.params.id;

const loadpage=async(page) => {
	let res= await request.get(`/api/public/questions/byUserId/${userid}`,{params:{page_num:page,page_size:10,sort:'time-'}});
	if(res.records.length===0) {
		infiniteScroll.value.finishload();
		return;
	}
	res.records.forEach(item=>{
		if(!FetchSet.has(item.id)){
			FetchSet.add(item.id);
			tableData.value.push(item);
		}
	});
};

onMounted(async() => {
	infiniteScroll.value.setCallback(async() => {
		await loadpage(infiniteScroll.value.getPage());
	});
	infiniteScroll.value.initLoad();
});

const infiniteScroll=ref();

onBeforeUpdate(() => {
	infiniteScroll.value.onBeforeUpdate();
});

onUpdated(() => {
	infiniteScroll.value.onUpdated();
});

const deleteQuestion=async(questionInfo) => {
	console.log(questionInfo);
	if(questionInfo.answerCount>0) {
		ElMessage.error('问题已存在回答，不能删除');
		return;
	}
	ElMessageBox.confirm('确认删除吗?').then(async() => {
		await request.post(`/api/auth/question/delete`,{id:questionInfo.id});
		window.location.reload();
		ElMessage.success('删除成功');
	});	
};

</script>

<template>
	<PageInfiniteScroll ref="infiniteScroll"/>
  <template v-if="tableData.length==0">
		<el-empty></el-empty>
	</template>
	<template v-else>
		<ul>
			<li v-for="(item,index) in tableData" :key="item.id" style="list-style: none;" >
				<el-card style="margin:10px;border:0px">
					<template #header>
						<a class="link" :href="`/question/${item.id}`">
							<span style="font-weight: bold;">{{ item.title }}</span>
						</a>
						<br/>
						<span style="font-size: 14px;color: #999;">创建时间: {{ item.createdAt }}</span>
					</template>
					<MarkdownContent :id="` problem-content`+id" :content="item.content"/>
					<template #footer>
						<div class="card-footer" style="display: flex;justify-content: space-between">
							<span style="font-size: 16px;font-weight: bold;"> 回答数： {{ item.answerCount }}</span>
							<div>
								<template v-if="useUserStore().isLogin()&&userid==useUserStore().id">
									<el-button type="primary" plain @click="$refs[`questionEditBox-${item.id}`][0].open()">编辑</el-button>
									<el-button type="danger" plain @click="deleteQuestion(item)">删除</el-button>
								</template>
								<QuestionEditBoxForm 
									:ref="`questionEditBox-${item.id}`"
									:id = "item.id"
									:EditBoxid="`question-editbox-${item.id}`" 
									v-model:title="item.title" 
									v-model:content="item.content">
								</QuestionEditBoxForm>
							</div>
						</div>
					</template>
				</el-card>
			</li>
		</ul>
	</template>

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