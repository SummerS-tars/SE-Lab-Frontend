<script setup>
import request from '@/request/http';
import { onMounted, ref } from 'vue';
import CommentCard from './CommentCard.vue';
import router from '@/router';
import { useRoute } from 'vue-router';
import { useCommentStore } from '@/stores/comment';
import { useUserStore } from '@/stores/user';

const tableData = ref([]);
let FetchSet = new Set();

const problemId=useRoute().params.id;

const props=defineProps({
	answerId:{default:''},
})
const loadpage=async(page) => {
	let res=await request.get(`/api/public/comments/byAnswerId/${props.answerId}`,{params:{page_num:page,page_size:3,sort:'likes-'}});
	res.records.forEach(item=>{
		if(!FetchSet.has(item.commentId)){
			const commmentRef=ref(item);
			commmentRef.value.id=item.commentId;
			commmentRef.value.answerId=props.answerId;
			if(useUserStore().token()) {
				request.get(`/api/auth/user/comment/like`,{params:{commentId:item.commentId}}).then(res=>{
					commmentRef.value.liked=res.liked;
				});
			}
			useCommentStore().set(commmentRef);

			FetchSet.add(item.commentId);
			tableData.value.push({id:item.commentId});
		}
	});
};

onMounted(()=>{
	loadpage(1);
})

const showComments=()=>{
	router.push({path:`/question/${problemId}`,query:{answerId:props.answerId}});
}

</script>


<template>
	<div style="display: flex; flex-direction: column;">
		<ul>
			<li v-for="(item,index) in tableData" :key="item.id" style="list-style: none;" >
				<CommentCard :commentId="item.id"/>
			</li>
		</ul>
		<el-button @click="showComments" type="primary" style="width: 50%;margin: 10px auto;">查看全部评论</el-button>
	</div>
</template>


<style scoped>


</style>