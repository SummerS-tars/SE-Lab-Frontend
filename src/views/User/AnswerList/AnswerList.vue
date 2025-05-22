<script setup>
import { onBeforeUpdate, onMounted, onUpdated, ref } from 'vue';
import request from '@/request/http.js';
import { useRoute } from 'vue-router';
import PageInfiniteScroll from '@/components/PageInfiniteScroll.vue';
import MarkdownContent from '@/components/MarkdownContent.vue';
import LikeButton from '@/components/LikeButton.vue';
import { useUserStore } from '@/stores/user';
import AnswerEditBoxForm from './AnswerEditBoxForm.vue';
import { ElMessage, ElMessageBox } from 'element-plus';

let FetchSet = new Set();
const tableData = ref([]);

const route = useRoute();
const userid =  route.params.id;

const loadpage=async(page) => {
	let res=await request.get(`/api/public/answers/byUserId/${userid}`,{params:{page_num:page,page_size:10,sort:'likes-'}});
	if(res.records.length===0) {
		infiniteScroll.value.finishload();
		return;
	}
	res.records.forEach(async(item)=>{
		if(!FetchSet.has(item.id)){

			item.liked=false;
			if(useUserStore().isLogin()) {
				let res=await request.get(`/api/auth/user/answer/like`,{params:{id:item.id}});
				item.liked=res.liked;
			}

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
const itemDelete=(index) => {
	window.location.reload();
};

const infiniteScroll=ref();

onBeforeUpdate(() => {
	infiniteScroll.value.onBeforeUpdate();
});

onUpdated(() => {
	infiniteScroll.value.onUpdated();
});

const deleteAnswer=async(answerInfo) => {
	ElMessageBox.confirm('确认删除吗?').then(async() => {
		await request.post(`/api/auth/answer/delete`,{id:answerInfo.id});
		itemDelete(answerInfo.id);
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
				<!-- <AnswerCard :questionid="item.questionId" :answerid="item.id" :removethis="() => {itemDelete(item.id)}"/> -->
				<el-card style="margin:10px;border:0px">
					<template #header>
						<a class="link" :href="`/question/${item.questionId}`">
							<span style="font-weight: bold;">{{ item.questionTitle }}</span>
						</a>
						<br/>
						<span style="font-size: 14px;color: #999;">回答时间: {{  item.createdAt }}</span>
					</template>
					<MarkdownContent :id="`answer-content${item.id}`" :content="item.content"/>
					<template #footer>
						<div class="card-footer" style="display: flex;justify-content: space-between;">
							<div>
								<span style="width: 60px;"><LikeButton api="/api/auth/user/answer" :params="{id:item.id}" v-model:info="tableData[index]"></LikeButton></span>
							</div>
							<div style="display: flex;justify-content: flex-end">
								<template v-if="useUserStore().isLogin()&&userid==useUserStore().id">
									<el-button type="primary" plain @click="$refs[`answerEditBox-${item.id}`][0].open()">编辑</el-button>
									<el-button type="danger" plain @click="deleteAnswer(item)">删除</el-button>
								</template>
								<AnswerEditBoxForm
									:ref="`answerEditBox-${item.id}`"
									:id= "item.id"
									:EditBoxid="`answer-editbox-${item.id}`"
									v-model:content="item.content">
								</AnswerEditBoxForm>
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