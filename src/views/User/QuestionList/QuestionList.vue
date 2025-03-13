<script setup>
import { onMounted, ref } from 'vue';
import request from '@/request/http.js'
import QuestionCard from './QuestionCard.vue';
import { useRoute } from 'vue-router';
import { usePageInfiniteScroll } from '@/components/pageInfiniteScroll';

const tableData = ref([])

const route = useRoute();
const userid =  route.params.id;

let page=1;
const init=async()=>{
	tableData.value=[];
	let res= await request.get(`/api/user/byId/${userid}/question`,{page_num:0,page_cnt:10});
	if(res.message=='success'){
		res.data.forEach(item=>{
			tableData.value.push({
				id:item.id,
			});
		});
		page=1;
	}
}

onMounted(()=>{
	init();
})

usePageInfiniteScroll(async(done)=>{
	let res= await request.get(`/api/user/byId/${userid}/question`,{page_num:page++,page_cnt:10});
	if(res.message=='success'){
		res.data.forEach(item=>{
			tableData.value.push({
				id:item.id,
			});
		});
	}
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
			<li v-for="(item,index) in tableData" :key="item.id" style="list-style: none;" >
				<QuestionCard :id="item.id" :removethis="()=>{itemDelete(index)}"/>
			</li>
		</ul>
	</template>

</template>


<style scoped>


</style>