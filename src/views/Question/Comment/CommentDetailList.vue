<script setup>
import request from '@/request/http';
import { useCommentStore } from '@/stores/comment';
import { useUserStore } from '@/stores/user';
import { computed, onMounted, ref } from 'vue';
import { onBeforeRouteUpdate, useRoute } from 'vue-router';
import CommentCard from './CommentCard.vue';
import { useAnswerStore } from '@/stores/answer';
import MarkdownContent from '@/components/MarkdownContent.vue';

const tableData = ref([]);
let FetchSet = new Set();

const problemId=useRoute().params.id;

const props=defineProps({
	answerId:{default:''},
});

const answerInfo=computed(()=>useAnswerStore().getAnswer(props.answerId));


let page=1;
const loadpage=async(page) => {
	let res=await request.get(`/api/public/comments/byAnswerId/${props.answerId}`,{params:{page_num:page,page_size:3,sort:'likes-'}});
	res.records.forEach(item=>{
		if(!FetchSet.has(item.id)){
			FetchSet.add(item.id);
			tableData.value.push({id:item.id});

			const commmentRef=ref(item);
			commmentRef.value.answerId=props.answerId;
			if(useUserStore().token()) {
				request.get(`/api/auth/user/comment/like`,{params:{answerId:props.answerId, commentId:item.id}}).then(res=>{
					commmentRef.value.liked=res.liked;
				});
			}
			useCommentStore().set(commmentRef);
		}
	});
};

const initData=()=>{
	onloading.value=true;
	tableData.value=[];
	FetchSet.clear();
	page=1;
	loadpage(page);
	onloading.value=false;
}

onMounted(()=>{
	initData();
});

onBeforeRouteUpdate((to, from, next) => {
	if(!to.query.answerId){
		next();
		return;
	}
	initData();
	next();
	return;
});

const onloading=ref(true);
const load = async() => {
	if(onloading.value) return;
	onloading.value=true;
	try{
		page++;
		loadpage(page);
	}finally{
		onloading.value=false;
	}
}
</script>

<template>
	<el-card>
		<div style="justify-content: space-between;display: flex;align-items: center;">
			<div>
				answer by
				<a class="link" :href="`/user/profile/${answerInfo?.authorId}`">
					<span style="font-weight: bold;"> {{ answerInfo?.author }}</span>
				</a>
				<br/>
				<span style="font-size: 14px;color: #999;">回答时间: {{ answerInfo?.createdAt}}</span>
			</div>
			<div>
				<FollowButton :authorId="answerInfo"></FollowButton>
			</div>
		</div>
		<MarkdownContent :id="`CommentDetail-answer-content${props.answerId}`" :content="answerInfo?.content"></MarkdownContent>

		<template #footer>
			 <ul v-infinite-scroll="load" infinite-scroll-distance="200" class="infinite-list" style="overflow: auto">
				<li v-for="(item,index) in tableData" :key="item.id" style="list-style: none;overflow: auto;">
					<CommentCard :commentId="item.id"></CommentCard>
				</li>
			</ul>
		</template>
	</el-card>
</template>

<style>

.link{
	font-weight: bold;
	color: black;
	text-decoration: none;
	font-size: large;
}

.link:hover{
	color: #007BFF;
}

.infinite-list {
  height: 400px;
  padding: 0;
  margin: 0;
  list-style: none;
}
</style>