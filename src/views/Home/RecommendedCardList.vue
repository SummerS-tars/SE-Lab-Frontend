<script setup>
import { onMounted, ref } from 'vue';
import request from '@/request/http.js'
import { ElMessage } from 'element-plus';
import RecommendedCard from './RecommendedCard.vue';

const tableData = ref([])

onMounted(async()=>{
	let res=await request.get("/api/question/mostlikes",{count:10});
	console.log(res);
	res.forEach(item=>{
        tableData.value.push({
            title:item.title,
            abstract:item.abstract,
            likes:item.likes,
			id:item.id,
        });
    });
});

</script>

<template>
  <template v-if="tableData.length==0">
		<el-empty></el-empty>
	</template>
	<template v-else>
		<li v-for="(item,index) in tableData" :key="index" style="list-style: none;" >
			<RecommendedCard :title="item.title" :abstract="item.abstract" :likes="item.likes" :id="item.id"></RecommendedCard>
		</li>
	</template>

</template>


<style scoped>


</style>