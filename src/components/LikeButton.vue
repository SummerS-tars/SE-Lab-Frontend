<script setup>
import IconLike from '@/components/icons/IconLike.vue';
import request from '@/request/http';
import { useAnswerStore } from '@/stores/answer';
import { useUserStore } from '@/stores/user';
import { ElMessage } from 'element-plus';
import { computed, onMounted, ref, watch } from 'vue';

const props=defineProps({
	api:{default:'/api/auth/user/answer'},
	info:{},
});

const emit = defineEmits(['update:info']);

const liked=computed(() => props.info?.liked ?? false);
const likes=computed(() => props.info?.likes ?? 0);

const onClick=() => {
	if(!useUserStore().token()) {
		return;
	}
	if(liked.value) {
		request.post(`${props.api}/unlike`,{id:props.id}).then(res=>{
			props.info.liked=false;
			props.info.likes--;
			emit('update:info',props.info);
		});
	}
	else{
		request.post(`${props.api}/like`,{id:props.id}).then(res=>{
			props.info.liked=true;
			props.info.likes++;
			emit('update:info',props.info);
		});
	}
};

</script>


<template>
	<div @click="onClick"  class="like-button" style="cursor: pointer;">
		<span><IconLike :like='liked' style="margin-right: 4px;"/>{{likes}}</span>
	</div>
</template>


<style scoped>

.like-button{
	background-color: transparent;
}

</style>