<script setup>
import request from '@/request/http';
import { onMounted, ref } from 'vue';
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
})
const loadpage=async(page) => {
	let res=await request.get(`/api/auth/reply/byCommentId/${props.commentId}`,{params:{page_num:page,page_size:10,sort:'likes-'}});
	res.records.forEach(item=>{
		if(!FetchSet.has(item.id)){
			FetchSet.add(item.id);
			tableData.value.push(item.id);

			const commmentRef=ref(item);
			if(useUserStore().token()) {
				request.get(`/api/auth/user/comment/like`,{params:{id:props.id}}).then(res=>{
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
			<li v-for="(item,index) in tableData" :key="item" style="list-style: none;" >
				<SubCommentCard :id="item"></SubCommentCard>
			</li>
		</ul>
		<el-button @click="showReplys" style="margin: 0 auto;">查看全部回复</el-button>
	</div>
</template>


<style scoped>


</style>