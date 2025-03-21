<script setup>
import IconLike from '@/components/icons/IconLike.vue';
import request from '@/request/http';
import { useAnswerStore } from '@/stores/answer';
import { useUserStore } from '@/stores/user';
import { ElMessage } from 'element-plus';
import { computed, onMounted, ref, watch } from 'vue';

const props=defineProps({
	id:{default:''},
})

const answerInfo=computed(()=>{
	return useAnswerStore().getAnswer(props.id);
});

const liked=computed(()=>{
	if(answerInfo===undefined)return false;
	else if(answerInfo.value===undefined)return false;
	else return answerInfo.value.liked;
})
const likes=computed(()=>{
	if(answerInfo===undefined)return 0;
	else if(answerInfo.value===undefined)return 0;
	else return answerInfo.value.likes;
})

const onClick=()=>{
	if(!useUserStore().token()) {return;}
	if(liked.value) {
		request.post('/api/auth/user/answer/unlike',{id:props.id}).then(res=>{
			answerInfo.value.liked=false;
			answerInfo.value.likes--;
		})
	}
	else{
		request.post('/api/auth/user/answer/like',{id:props.id}).then(res=>{
			answerInfo.value.liked=true;
			answerInfo.value.likes++;
		});
	}
}

</script>


<template>
	<div @click="onClick"  class="like-button">
		<span><IconLike :like='liked' style="margin-right: 4px;"/>{{likes}}</span>
	</div>
</template>


<style scoped>

.like-button{
	background-color: transparent;
}

</style>