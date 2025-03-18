<script setup>
import { onMounted, ref } from 'vue';
import request from '@/request/http.js'
import { useRoute } from 'vue-router';
import FollowerCard from './FollowerCard.vue';
import { usePageInfiniteScroll } from '@/components/pageInfiniteScroll';

const tableData = ref([])

const route = useRoute();
const userid =  route.params.id;

let page=1;

onMounted(async()=>{
  let res=await request.get(`/api/public/user/byId/${userid}/follower`,{params:{page_num:1,page_size:10}});
	res.records.forEach(item=>{
		tableData.value.push({
			username:item.username,
			id:item.id,
		});
	});
	console.log(res.records);
});

usePageInfiniteScroll(async(done)=>{
	let res=await request.get(`/api/public/user/byId/${userid}/follower`,{params:{page_num:++page,page_cnt:10}});
	res.records.forEach(item=>{
		tableData.value.push({
			username:item.username,
			id:item.id,
		});
	});
	done();
})

</script>

<template>
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