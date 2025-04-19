<script setup>
import { onBeforeUpdate, onMounted, onUpdated, ref } from 'vue';
import LikeMessageCard from './LikeMessageCard.vue';
import request from '@/request/http.js';
import { useRoute } from 'vue-router';
import PageInfiniteScroll from '@/components/PageInfiniteScroll.vue';

const tableData = ref([]);

const route = useRoute();
const userid =  route.params.id;

const loadpage=async(page) => {
	let res=await request.get(`/api/auth/notify/likes/page`,{params:{page_num:page,page_size:5,sort:'time-'}});
	console.log(res);
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
		<li v-for="(item,index) in tableData" :key="index" style="list-style: none;" >
			<LikeMessageCard :messageInfo="item" :index="index"/>
		</li>
	</template>
</template>


<style scoped>


</style>