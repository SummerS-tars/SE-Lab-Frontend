<script setup>
import { onBeforeUpdate, onMounted, onUpdated, ref } from 'vue';
import request from '@/request/http.js';
import AnswerCard from './AnswerCard.vue';
import { useUserStore } from '@/stores/user';
import PageInfiniteScroll from '@/components/PageInfiniteScroll.vue';

const props=defineProps({
	id:{default:''},
});

const loadpage=async(page) => {
	let res=await request.get(`/api/auth/answers/byQuestionId/${props.id}`,{params:{page_num:page,page_size:10,sort:'likes-'}});
	if(res.records.length===0) {
		infiniteScroll.value.finishload();
		return;
	}
	res.records.forEach(item=>{
		tableData.value.push({
			id:item.id,
		});
	});
};

const infiniteScroll=ref();

const tableData = ref([]);

onMounted(async() => {
	let flag=false;
  if(useUserStore().token()) {
	loadpage(infiniteScroll.value.getPage()+1).then(() => {
		infiniteScroll.value.setPage(1);
	});
	infiniteScroll.value.setCallback(async() => {
		await loadpage(infiniteScroll.value.getPage()+1).then(() => {
			infiniteScroll.value.addPage();
		});
	});
	flag=true;
  }
  if(!flag) {
    let res=await request.get(`/api/public/answers/byQuestionId/${props.id}`);
		res.forEach(item=>{
			tableData.value.push({
				id:item.id,
			});
		});
  }
});

onBeforeUpdate(() => {
	infiniteScroll.value.onBeforeUpdate();
});

onUpdated(() => {
	infiniteScroll.value.onUpdated();
});

</script>

<template>
	<PageInfiniteScroll ref="infiniteScroll"></PageInfiniteScroll>
  <template v-if="tableData.length==0">
		<el-empty></el-empty>
	</template>
	<template v-else>
		<ul>
			<li v-for="(item,index) in tableData" :key="item.id" style="list-style: none;" >
				<AnswerCard :id="item.id"></AnswerCard>
			</li>
		</ul>
	</template>
	<template v-if="useUserStore().token()">
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