<script setup>
import { onMounted, ref } from 'vue';
import request from '@/request/http.js'
import AnswerCard from './AnswerCard.vue';
import { useRoute } from 'vue-router';
import { usePageInfiniteScroll } from '@/components/pageInfiniteScroll';

const tableData = ref([])

const route = useRoute();
const userid =  route.params.id;

let page=1;

const init=async()=>{
	tableData.value=[];
	let res=await request.get(`/api/public/answers/byUserId/${userid}`,{params:{page_num:1,page_size:10,sort:'likes-'}});
	res.records.forEach(item=>{
		tableData.value.push({
			questionid:item.questionId,
			answerid:item.id,
		});
	});
	page=1;
}

onMounted(async()=>{
	init();
});

usePageInfiniteScroll(async(done)=>{
	let res=await request.get(`/api/public/answers/byUserId/${userid}`,{params:{page_num:++page,page_size:10,sort:'likes-'}});
	res.records.forEach(item=>{
		tableData.value.push({
			questionid:item.questionId,
			answerid:item.answerId,
		});
	});
	done();
})

const itemDelete=(index)=>{
	init();
}

</script>

<template>
  <template v-if="tableData.length==0">
		<el-empty></el-empty>
	</template>
	<template v-else>
		<ul>
			<li v-for="(item,index) in tableData" :key="answerid" style="list-style: none;" >
				<AnswerCard :questionid="item.questionid" :answerid="item.answerid" :removethis="()=>{itemDelete(index)}"/>
			</li>
		</ul>
	</template>

</template>


<style scoped>


</style>