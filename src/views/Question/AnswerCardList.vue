<script setup>
import { computed, onBeforeUpdate, onMounted, onUpdated, ref } from 'vue';
import request from '@/request/http.js';
import AnswerCard from './AnswerCard.vue';
import { useUserStore } from '@/stores/user';
import PageInfiniteScroll from '@/components/PageInfiniteScroll.vue';
import { useAnswerStore } from '@/stores/answer';

const props=defineProps({
	id:{default:''},
});

const nomore=ref(false);
const loadpage=async(page) => {
	let res=await request.get(`/api/auth/answers/byQuestionId/${props.id}`,{params:{page_num:page,page_size:10,sort:'likes-'}});
	if(res.records.length===0) {
		nomore.value=true;
		return;
	}
	res.records.forEach(item=>{
		const answerRef=ref(item);
		answerRef.value.liked=false;
		if(useUserStore().isLogin()) {
			request.get(`/api/auth/user/answer/like`,{params:{id:item.id}}).then(res=>{
				answerRef.value.liked=res.liked;
			});
		}
		useAnswerStore().setAnswer(answerRef);

		if(!FetchSet.has(item.id)){
			FetchSet.add(item.id);
			tableData.value.push({
				id:item.id,
			});
		}
	});
};

const infiniteScroll=ref();

const tableData = ref([]);
let FetchSet = new Set();

onMounted(async() => {
  	if(useUserStore().isLogin()) {
		infiniteScroll.value.setCallback(async() => {
			await loadpage(infiniteScroll.value.getPage());
		});
		infiniteScroll.value.initLoad();
  	}
	else{
		let res=await request.get(`/api/public/answers/byQuestionId/${props.id}`);
		res.forEach(item=>{
			if(!FetchSet.has(item.id)){
				FetchSet.add(item.id);
				tableData.value.push({
					id:item.id,
				});

				const answerRef=ref(item);
				answerRef.value.liked=false;
				useAnswerStore().setAnswer(answerRef);
			}
		});
	}	
});

onBeforeUpdate(() => {
	infiniteScroll.value.onBeforeUpdate();
});

onUpdated(() => {
	infiniteScroll.value.onUpdated();
});

</script>

<template>
	<PageInfiniteScroll ref="infiniteScroll"></PageInfiniteScroll>
  <template v-if="tableData.length==0">
		<el-empty></el-empty>
	</template>
	<template v-else>
		<ul>
			<li v-for="(item,index) in tableData" :key="item.id" style="list-style: none;" >
				<AnswerCard :id="item.id"></AnswerCard>
			</li>
		</ul>
	</template>
	<template v-if="useUserStore().isLogin()">
		<el-card v-if="!nomore" style="margin:10px;border:0px">
			<el-skeleton :rows="5"/>
		</el-card>
	</template>
	<template v-else>
		<div style="text-align: center;">
			<a href="/login" class="href">登录</a>
			<span style="font-size: large;">以浏览更多内容。</span>
		</div>
	</template>
</template>


<style scoped>

.href{
	font-size: large;
	color: rgb(121.3, 187.1, 255)
}

.href :hover{
	color: rgb(159.5, 206.5, 255)
}

</style>