<script setup>
import IconLike from '@/components/icons/IconLike.vue';
import request from '@/request/http';
import { useUserStore } from '@/stores/user';
import { ElMessage } from 'element-plus';
import { ref, watch } from 'vue';

const props=defineProps({
	id:{default:''},
	like:{default:false},
	likes:{default:0},
})


watch(()=>props.like,(newVal)=>{like.value=newVal;})
watch(()=>props.likes,(newVal)=>{likes.value=newVal;})

const like=ref(props.like);
const likes=ref(props.likes);

const onClick=()=>{
	if(!useUserStore().token)return;
	if(like.value){
		request.post('/api/auth/user/answer/unlike',{id:props.id});
		like.value=false;
		likes.value--;
	}
	else{
		request.post('/api/auth/user/answer/like',{id:props.id});
		like.value=true;
		likes.value++;
	}
}

</script>


<template>
	<div @click="onClick"  class="like-button">
		<span><IconLike :like='like' style="margin-right: 4px;"/>{{likes}}</span>
	</div>
</template>


<style scoped>

.like-button{
	background-color: transparent;
}

</style>