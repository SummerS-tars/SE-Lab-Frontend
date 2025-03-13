<script setup>
import { nextTick, onMounted, onUnmounted, ref } from 'vue';
import request from '@/request/http.js'
import { ElMessage } from 'element-plus';
import AnswerCard from './AnswerCard.vue';
import { useUserStore } from '@/stores/user';
import { usePageInfiniteScroll } from '@/components/pageInfiniteScroll';

const props=defineProps({
	id:{default:''},
})

const tableData = ref([])
let page=1;

onMounted(async()=>{
	let flag=false;
  if(useUserStore().token){
    let res=await request.get(`/api/auth/question/byId/${props.id}/answer/mostlikes`,{page_num:0,page_size:10});
		res.data.forEach(item=>{
			tableData.value.push({
				id:item.id,
			});
		});
		flag=true;
		page=1;
  }
  if(!flag){
    let res=await request.get(`/api/question/byId/${props.id}/answer/mostlikes`);
		res.data.forEach(item=>{
			tableData.value.push({
				id:item.id,
			});
		});
  }
});

usePageInfiniteScroll(async(done)=>{
	let res=await request.get(`/api/question/byId/${props.id}/answer/mostlikes`,{page_name:page++,page_size:5});
	res.data.forEach(item=>{
		tableData.value.push({
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
		<ul>
			<li v-for="(item,index) in tableData" :key="index" style="list-style: none;" >
				<AnswerCard :id="item.id"></AnswerCard>
			</li>
		</ul>
	</template>
	<template v-if="useUserStore().token">
		<template v-if="onloading">
			<el-card style="margin:10px;border:0px">
				<el-skeleton :rows="5"/>
			</el-card>
		</template>
		<template v-else>
			<el-skeleton :rows="5"/>
		</template>
	</template>
	<template v-else>
		<div style="text-align: center;">
			<a href="/login" class="href">登录</a>
			<span style="font-size: large;">以浏览更多内容。</span>
		</div>
	</template>
</template>


<style scoped>

.href{
	font-size: large;
	color: rgb(121.3, 187.1, 255)
}

.href :hover{
	color: rgb(159.5, 206.5, 255)
}

</style>