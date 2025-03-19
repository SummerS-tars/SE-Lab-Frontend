<script setup>
import { onBeforeUpdate, onMounted, onUpdated, ref } from 'vue';
import request from '@/request/http.js'
import QuestionCard from './QuestionCard.vue';
import { useRoute } from 'vue-router';
import PageInfiniteScroll from '@/components/PageInfiniteScroll.vue';

const tableData = ref([])

const route = useRoute();
const userid =  route.params.id;

const loadpage=async(page)=>{
	let res= await request.get(`/api/public/questions/byUserId/${userid}`,{params:{page_num:page,page_size:10,sort:'time-'}});
	if(res.records.length===0){
		infiniteScroll.value.finishload();
		return;
	}
	res.records.forEach(item=>{
		tableData.value.push({
			id:item.id,
		});
	});
}

onMounted(async()=>{
	loadpage(infiniteScroll.value.getPage()+1).then(()=>{
		infiniteScroll.value.setPage(1);
	});
	infiniteScroll.value.setCallback(()=>{
		loadpage(infiniteScroll.value.getPage()+1).then(()=>{
			infiniteScroll.value.addPage();
		});
	});
});

const infiniteScroll=ref();

onBeforeUpdate(()=>{
	infiniteScroll.value.onBeforeUpdate();
})

onUpdated(()=>{
	infiniteScroll.value.onUpdated();
})

const itemDelete=(index)=>{
	init();
}


</script>

<template>
	<PageInfiniteScroll ref="infiniteScroll"/>
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