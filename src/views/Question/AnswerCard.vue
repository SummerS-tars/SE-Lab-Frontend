<script setup>
import IconLike from '@/components/icons/IconLike.vue';
import request from '@/request/http';
import { useUserStore } from '@/stores/user';
import { ElMessage } from 'element-plus';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import FollowButton from '../User/FollowButton.vue';

const props=defineProps({
	id:{default:''},
	author:{default:{id:'',username:'',liked:false}},
	createAt:{default:''},
	content:{default:''},
});

const router = useRouter();

let cherryInstance = ref(null);

let tableData= ref([]);

onMounted(async()=>{
  cherryInstance = new Cherry({
    id: `answer-content${props.id}`,
    value: props.content,
    editor:{
      defaultModel: 'previewOnly',
    }
  });

  cherryInstance.wrapperDom.style.boxShadow = 'none';
  cherryInstance.previewer.getDom().style.border = 'none';
});

</script>

<template>
	<el-card style="margin:10px;border:0px">
		<template #header >
			<div style="justify-content: space-between;display: flex;align-items: center;">
				<div>
					answer by
					<a class="link" :href="`/user/profile/${props.author.id}`">
						<span style="font-weight: bold;"> {{ $props.author.username }}</span>
					</a>
					<br/>
					<span style="font-size: 14px;color: #999;"> {{ $props.createAt }}</span>
				</div>
				<div>
					<FollowButton :author="props.author"></FollowButton>
				</div>
			</div>
			
		</template>
		
		<div @click.prevent.stop>
			<div :id="`answer-content${props.id}`"></div>
		</div>
		<template #footer>
			<div class="card-footer">
				<span>
					<IconLike :like='like'/>
					<!-- {{$props.likes}} -->
				</span>
			</div>
		</template>
	</el-card>
</template>

<style scoped>

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