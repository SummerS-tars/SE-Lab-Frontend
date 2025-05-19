<script setup>
import { onBeforeUpdate, onMounted, onUpdated, ref } from 'vue';
import request from '@/request/http.js';
import { useRoute } from 'vue-router';
import PageInfiniteScroll from '@/components/PageInfiniteScroll.vue';
import FollowButton from '../FollowButton.vue';
import { useUserStore } from '@/stores/user';

let FetchSet = new Set();
const tableData = ref([]);

const route = useRoute();
const userid =  route.params.id;

const loadpage=async(page) => {
	let res=await request.get(`/api/public/user/byId/${userid}/following`,{params:{page_num:page,page_size:10}});
	if(res.records.length===0) {
		infiniteScroll.value.finishload();
		return;
	}
	res.records.forEach(item=>{
		if(!FetchSet.has(item.id)){
			FetchSet.add(item.id);
			tableData.value.push(item);
		}
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
		<li v-for="(item,index) in tableData" :key="item.id" style="list-style: none;" >
			<el-card style="margin:10px;border:0px;">
				<div class="FollowingCard">
					<div>
						<a class="link" :href="`/user/profile/${item.id}`">
							<span style="font-weight: bold;">{{ item.username }}</span>
						</a>
					</div>
					<div>
						<template v-if="useUserStore().isLogin()&&useUserStore().id==userid">
							<FollowButton :authorId="item.id"/>
						</template>
					</div>
				</div>
			</el-card>
		</li>
	</template>

</template>


<style scoped>

.FollowingCard{
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.link{
	font-weight: bold;
	color: black;
	text-decoration: none;
	font-size: large;
}

.link:hover{
	color: #007BFF;
}

</style>