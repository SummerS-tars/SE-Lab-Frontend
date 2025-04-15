<script setup>
import request from '@/request/http';
import { computed, onMounted, ref } from 'vue';
import SubCommentCard from './SubCommentCard.vue';
import router from '@/router';
import { useRoute } from 'vue-router';
import { useUserStore } from '@/stores/user';
import { useCommentStore } from '@/stores/comment';

const tableData = ref([]);
let FetchSet = new Set();

const problemId=useRoute().params.id;

const props=defineProps({
	commentId:{default:''},
});

const answerId=computed(()=>{
	return useCommentStore().getCommentAnswerId(props.commentId);
});
const loadpage=async(page) => {
	let res=await request.get(`/api/public/reply/byAnswerId/${answerId.value}/byCommentId/${props.commentId}`,{params:{page_num:page,page_size:3,sort:'likes-'}});
	res.records.forEach(item=>{
		if(!FetchSet.has(item.id)){
			FetchSet.add(item.id);
			tableData.value.push({id:item.id});

			const commmentRef=ref(item);
			commmentRef.value.answerId=answerId.value;
			commmentRef.value.fatherCommentId=props.commentId;
			if(useUserStore().token()) {
				request.get(`/api/auth/user/reply/like`,{params:{answerId:answerId.value,commentId:props.commentId, replyId:item.id}}).then(res=>{
					commmentRef.value.liked=res.liked;
				});
			}
			useCommentStore().set(commmentRef);
		}
	});
};

onMounted(()=>{
	loadpage(1);
})

const showReplys=()=>{
	router.push({path:`/question/${problemId}`,query:{commentId:props.commentId}});
}

</script>


<template>
	<div>
		<ul>
			<li v-for="(item,index) in tableData" :key="item.id" style="list-style: none;" >
				<SubCommentCard :commentId="item.id"></SubCommentCard>
			</li>
		</ul>
		<el-button @click="showReplys" style="margin: 0 auto;">查看全部回复</el-button>
	</div>
</template>


<style scoped>


</style>