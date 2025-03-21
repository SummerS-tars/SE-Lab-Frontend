<script setup>
import { onBeforeUpdate, onMounted, onUpdated, ref } from 'vue';
import request from '@/request/http.js';
import PageInfiniteScroll from '@/components/PageInfiniteScroll.vue';
import QuestionCard from '../User/QuestionList/QuestionCard.vue';

const tableData = ref([]);

const infiniteScroll=ref();
const loadpage=async(page) => {
	let res=await request.get('/api/auth/questions',{params:{page_num:page,page_size:10,sort:'time-'}});
	if(res.records.length===0) {
		infiniteScroll.value.finishload();
		return;
	}
	res.records.forEach(item=>{
		tableData.value.push(item);
	});
};

onMounted(async() => {
	infiniteScroll.value.setCallback(async() => {
		await loadpage(infiniteScroll.value.getPage());
	});
	infiniteScroll.value.initLoad();
});

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
		<li v-for="(item,index) in tableData" :key="index" style="list-style: none;" >
			<QuestionCard :id="item.id"></QuestionCard>
		</li>
	</template>

</template>


<style scoped>


</style>