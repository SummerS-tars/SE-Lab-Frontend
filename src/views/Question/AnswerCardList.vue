<script setup>
import { nextTick, onMounted, onUnmounted, ref } from 'vue';
import request from '@/request/http.js'
import { ElMessage } from 'element-plus';
import AnswerCard from './AnswerCard.vue';
import { useUserStore } from '@/stores/user';

const props=defineProps({
	id:{default:''},
})

const tableData = ref([])
const page = ref(0);

onMounted(async()=>{
	let flag=false;
  if(useUserStore().token){
    let res=await request.get(`/api/auth/question/byId/${props.id}/answer/mostlikes`,{page_num:0,page_size:10});
    if(res.message==='success'){
      res.data.forEach(item=>{
        tableData.value.push({
					id:item.id,
					author:item.author,
					createAt:item.createAt,
          content:item.content,
        });
      });
      flag=true;
			page.value=1;
    }
  }
  if(!flag){
    let res=await request.get(`/api/question/byId/${props.id}/answer/mostlikes`);
    if(res.message==='success'){
      res.data.forEach(item=>{
        tableData.value.push({
					id:item.id,
          author:item.author,
					createAt:item.createAt,
          content:item.content,
        });
      });
    }
  }
	nextTick(()=>{
		if(flag){
			window.scrollTo(0,0);
			window.addEventListener('scroll',handleScroll);
		}
	});
});

onUnmounted(()=>{
	window.removeEventListener('scroll',handleScroll);
});

const handleScroll = () =>{
	const scrollPositionCurrent = window.scrollY + window.innerHeight;
  const pageHeight = document.documentElement.scrollHeight;
  if (scrollPositionCurrent >= pageHeight-1000) { 
    load();
  }
}

let onloading=ref(false);

const load = async() =>{
	if(onloading.value || !useUserStore().token)return;
	onloading.value=true;
	const scrollPositionCurrent = window.scrollY;
	let res=await request.get(`/api/question/byId/${props.id}/answer/mostlikes`,{page_name:tableData.length/5,page_size:5});
	if(res.message==='success'){
		res.data.forEach(item=>{
			tableData.value.push({
				id:item.id,
				author:item.author,
				createAt:item.createAt,
				content:item.content,
			});
		});
		page.value++;
	}
	nextTick(()=>{
		window.scrollTo({left:0,top:scrollPositionCurrent});
		onloading.value=false;
	});
}

</script>

<template>
  <template v-if="tableData.length==0">
		<el-empty></el-empty>
	</template>
	<template v-else>
		<ul>
			<li v-for="(item,index) in tableData" :key="index" style="list-style: none;" >
				<AnswerCard :id="item.id" :author="item.author" :createAt="item.createAt" :content="item.content"></AnswerCard>
			</li>
		</ul>
	</template>
	<template v-if="useUserStore().token">
		<template v-if="onloading">
			<el-card style="margin:10px;border:0px">
				<el-skeleton :rows="5"/>
			</el-card>
		</template>
		<template v-else>
			empty
		</template>
	</template>
	<template v-else>
		<div style="text-align: center;">
			<a href="/login" class="href">登录</a>
			<span style="font-size: large;">以浏览更多内容。</span>
		</div>
	</template>
</template>


<style scoped>

.href{
	font-size: large;
	color: rgb(121.3, 187.1, 255)
}

.href :hover{
	color: rgb(159.5, 206.5, 255)
}

</style>