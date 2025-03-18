<script setup>
import { onBeforeUpdate, onMounted, onUpdated, ref } from 'vue';
import request from '@/request/http.js'
import { ElMessage } from 'element-plus';
import RecommendedCard from './RecommendedCard.vue';
import PageInfiniteScroll from '@/components/PageInfiniteScroll.vue';
import QuestionCard from '../User/QuestionList/QuestionCard.vue';


const tableData = ref([])

onMounted(async()=>{
	let res=await request.get("/api/auth/questions",{params:{page_num:1,page_size:10,sort:'time-'}});
	console.log(res);
	res.records.forEach(item=>{
		tableData.value.push(item);
  });
	// pagescroll.value.setCallback(()=>{

	// });
});

// let pagescroll=ref();

// onBeforeUpdate(()=>{
// 	pagescroll.value.onBeforeUpdate();
// });

// onUpdated(()=>{
// 	pagescroll.value.onUpdated();
// })

</script>

<template>
	<!-- <PageInfiniteScroll ref="infiniteScroll"/> -->
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