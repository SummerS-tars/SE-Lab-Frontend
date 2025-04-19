<script setup>
import Copyright from '@/components/Copyright.vue';
import Header from '@/components/Header/Header.vue';
import { computed, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter();
const route = useRoute();

const nameToIndexMap = {
  ['LikeMessageList']: '0',
  ['CommentMessageList']: '1',
};

const activeIndex = ref(computed(() => {
	return nameToIndexMap[route.name] || '0';
}));

const handleSelect = (key, keyPath) => {
	if(key=='0') {
		router.push(`/notifications/`);
	}
	else if(key=='1') {
		router.push(`/notifications/comment`);
	}
};

const likeMessageCount=ref(0);
const commentMessageCount=ref(0);

onMounted(()=>{
	
})

</script>


<template>
	<el-container style="min-height: 101vh;">
		<el-header style="padding: 0;"><Header style="width:100%"></Header></el-header>
		<el-main>
				<el-card style="max-width: 1000px;min-height: 80vh;margin: 0 auto;">
					<template #header>
						<div class="card-header">
							<span style="font-weight: bold;">通知中心</span>
						</div>
					</template>
					<el-menu
						:default-active="activeIndex"
						class="el-menu-demo"
						style="height: 40px;"
						mode="horizontal"
						@select="handleSelect"
					>
						<el-menu-item index="0">点赞 {{ likeMessageCount }}</el-menu-item>
						<el-menu-item index="1">评论 {{ commentMessageCount }}</el-menu-item>
					</el-menu>

					<RouterView></RouterView>

				</el-card>
			</el-main>
		<Copyright></Copyright>
	</el-container>
</template>


<style scoped>


</style>