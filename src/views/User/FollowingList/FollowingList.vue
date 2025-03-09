<script setup>
import { onMounted, ref } from 'vue';
import request from '@/request/http.js'
import { ElMessage } from 'element-plus';
import { useRouter } from 'vue-router';
import FollowingCard from './FollowingCard.vue';

const tableData = ref([])

const router = useRouter();
const userid =  router.currentRoute.value.params.id;

onMounted(async()=>{
    let res=await request.get(`/api/user/byId/${userid}/follower`,{page_num:0,page_cnt:10});
	if(res.message=='success'){
		res.data.forEach(item=>{
			tableData.value.push({
                username:item.username,
				id:item.id,
			});
		});
	}
	
});

</script>

<template>
  <template v-if="tableData.length==0">
		<el-empty></el-empty>
	</template>
	<template v-else>
		<li v-for="(item,index) in tableData" :key="index" style="list-style: none;" >
			<FollowingCard :username="item.username" :id="item.id"/>
		</li>
	</template>

</template>


<style scoped>


</style>