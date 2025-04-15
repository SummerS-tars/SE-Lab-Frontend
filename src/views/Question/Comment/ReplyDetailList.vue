<script setup>
import request from '@/request/http';
import { useCommentStore } from '@/stores/comment';
import { useUserStore } from '@/stores/user';
import { computed, onMounted, ref } from 'vue';
import { onBeforeRouteUpdate, useRoute } from 'vue-router';
import CommentCard from './CommentCard.vue';
import MarkdownContent from '@/components/MarkdownContent.vue';
import SubCommentCard from './SubCommentCard.vue';

const tableData = ref([]);
let FetchSet = new Set();

const problemId=useRoute().params.id;

const props=defineProps({
	commentId:{default:''},
});

const commentInfo=computed(()=>useCommentStore().get(props.commentId));

const answerId=computed(()=>{
	return useCommentStore().getCommentAnswerId(props.commentId);
});

let page=1;
const loadpage=async(page) => {
	if(!props.commentId)return;
	let res=await request.get(`/api/public/reply/byCommentId/${props.commentId}`,{params:{page_num:page,page_size:5,sort:'likes-'}});
	res.records.forEach(item=>{
		if(!FetchSet.has(item.replyId)){
			const commmentRef=ref(item);
			commmentRef.value.answerId=answerId.value;
			commmentRef.value.fatherCommentId=props.commentId;
			commmentRef.value.id=item.replyId;
			if(useUserStore().token()) {
				request.get(`/api/auth/user/reply/like`,{params:{replyId:item.replyId}}).then(res=>{
					commmentRef.value.liked=res.liked;
				});
			}
			useCommentStore().set(commmentRef);

			FetchSet.add(item.replyId);
			tableData.value.push({id:item.replyId});
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
	if(!to.query.commentId){
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
				<a class="comment-link" :href="`/user/profile/${commentInfo?.userId}`">
					<span style=""> {{ commentInfo?.username }}</span>
				</a>
				<br/>
				{{ commentInfo?.content }}
				<br/>
				<span style="font-size: 12px;color: #999;"> {{ commentInfo?.createdAt }}</span>
			</div>
			<div style="display: flex;align-items: center;">
				<span style="width: 60px;"><LikeButton api="/api/auth/user/comment" v-model:info="commentInfo"></LikeButton></span>
				<span @click="showCommentForm=!showCommentForm" style="width: 60px;"><CommentButton :id="props.id"></CommentButton></span>
			</div>
		</div>

		<template #footer>
			 <ul v-infinite-scroll="load" infinite-scroll-distance="200" class="infinite-list" style="overflow: auto">
				<li v-for="(item,index) in tableData" :key="item.id" style="list-style: none;overflow: auto;">
					<SubCommentCard :commentId="item.id"/>
				</li>
			</ul>
		</template>
	</el-card>
</template>

<style>

.comment-link{
	font-weight: bold;
	color: black;
	text-decoration: none;
	font-size: large;
}

.comment-link:hover{
	color: #007BFF;
}

.infinite-list {
  height: 400px;
  padding: 0;
  margin: 0;
  list-style: none;
}
</style>