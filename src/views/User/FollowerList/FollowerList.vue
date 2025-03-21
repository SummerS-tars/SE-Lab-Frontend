<script setup>
import { onBeforeUpdate, onMounted, onUpdated, ref } from 'vue';
import request from '@/request/http.js'
import { useRoute } from 'vue-router';
import FollowerCard from './FollowerCard.vue';
import PageInfiniteScroll from '@/components/PageInfiniteScroll.vue';

const tableData = ref([])

const route = useRoute();
const userid =  route.params.id;

const loadpage=async(page)=>{
	let res=await request.get(`/api/public/user/byId/${userid}/follower`,{params:{page_num:page,page_size:10}});
	if(res.records.length===0) {
		infiniteScroll.value.finishload();
		return;
	}
	res.records.forEach(item=>{
		tableData.value.push({
			username:item.username,
			id:item.id,
		});
	});
}

onMounted(async()=>{
	loadpage(infiniteScroll.value.getPage()+1).then(()=>{
		infiniteScroll.value.setPage(1);
	});
	infiniteScroll.value.setCallback(async()=>{
		await loadpage(infiniteScroll.value.getPage()+1).then(()=>{
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

</script>

<template>
	<PageInfiniteScroll ref="infiniteScroll"/>
  <template v-if="tableData.length==0">
		<el-empty></el-empty>
	</template>
	<template v-else>
		<li v-for="(item,index) in tableData" :key="index" style="list-style: none;" >
			<FollowerCard :username="item.username" :id="item.id"/>
		</li>
	</template>
</template>


<style scoped>


</style>