<script setup>
import { onBeforeUpdate, onMounted, onUpdated, ref } from 'vue';
import request from '@/request/http.js';
import AnswerCard from './AnswerCard.vue';
import { useRoute } from 'vue-router';
import PageInfiniteScroll from '@/components/PageInfiniteScroll.vue';

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
	res.records.forEach(item=>{
		if(!FetchSet.has(item.id)){
			FetchSet.add(item.id);
			tableData.value.push({
				questionid:item.questionId,
				answerid:item.id,
			});
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

</script>

<template>
	<PageInfiniteScroll ref="infiniteScroll"/>
  <template v-if="tableData.length==0">
		<el-empty></el-empty>
	</template>
	<template v-else>
		<ul>
			<li v-for="(item,index) in tableData" :key="item.id" style="list-style: none;" >
				<AnswerCard :questionid="item.questionid" :answerid="item.answerid" :removethis="() => {itemDelete(item.answerid)}"/>
			</li>
		</ul>
	</template>

</template>


<style scoped>


</style>