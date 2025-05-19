<script setup >
import Header from '@/components/Header/Header.vue';
import request from '@/request/http';
import { useUserStore } from '@/stores/user';
import { ElMessage } from 'element-plus';
import { computed, ref } from 'vue';
import { onBeforeRouteUpdate, useRoute, useRouter } from 'vue-router';
import FollowButton from './FollowButton.vue';
import { useProfileStore } from '@/stores/profile';
import Copyright from '@/components/Copyright.vue';

const router = useRouter();
const route = useRoute();
const userid =  route.params.id;

const user=useProfileStore().getProfile(userid);

const nameToIndexMap = {
  ['QuestionList']: '0',
  ['AnswerList']: '1',
  ['FollowerList']: '2',
  ['FollowingList']: '3',
};

const activeIndex = ref(computed(() => {
	return nameToIndexMap[route.name] || '0';
}));

const handleSelect = (key, keyPath) => {
	if(key=='0') {
		router.push(`/user/profile/${userid}`);
	}
	else if(key=='1') {
		router.push(`/user/profile/${userid}/answer`);
	}
	else if(key=='2'){
		router.push(`/user/profile/${userid}/commment`);
	}
};

</script>

<template>
	<el-container style="min-height: 101vh;">
      <el-header style="padding: 0;"><Header style="width:100%"></Header></el-header>
      <el-main>
				<el-card style="max-width: 1000px;margin: 0 auto; margin-bottom: 10px;">
					<div class="profile_nav">
						<div>
							<h2 style="margin-bottom: 20px;">{{ user.username }}</h2>
							<p><strong>邮箱:</strong>{{ user.email }}</p>
						</div>
						<div style="justify-items: center;display: flex;flex-direction: column;margin-right: 20px;">
							<div style="display: flex;justify-content: space-between;margin-bottom: 20px;">
								<router-link :to="`/user/profile/${userid}/follower`" class="followlink" @click="activeIndex='2'">
									<span class="followlink_title">粉丝</span>
									<span class="followlink_item">{{ user.follower }}</span>
								</router-link>
								<div style="width: 1px; background-color: #ccc; margin: 0 10px;"></div>
								<router-link :to="`/user/profile/${userid}/following`" class="followlink" @click="activeIndex='3'">
									<span class="followlink_title">关注</span>
									<span class="followlink_item">{{ user.following }}</span>
								</router-link>
							</div>
							<template v-if="useUserStore().isLogin()&&useUserStore().id==userid">
								<!-- <el-button type="primary" plain>编辑个人资料</el-button> -->
							</template>
							<template v-else>
								<FollowButton :authorId="user.id"></FollowButton>
							</template>
						</div>
					</div>
				</el-card>

				<el-card style="max-width: 1000px;margin: 0 auto;">
					<el-menu
						:default-active="activeIndex"
						class="el-menu-demo"
						style="height: 40px;"
						mode="horizontal"
						@select="handleSelect"
					>
						<el-menu-item index="0">问题 {{ user.questionCount}}</el-menu-item>
						<el-menu-item index="1">回答 {{ user.answerCount}}</el-menu-item>
					</el-menu>

					<RouterView></RouterView>

				</el-card>
			</el-main>
		<Copyright></Copyright>
	</el-container>
    
</template>

<style scoped>

.user-profile .avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-bottom: 20px;
}

.profile_nav{
	width: 100%;
	height: 100%;
	min-height: 200px;
	display: flex;
	justify-content: space-between;
	align-items: center;
  white-space: nowrap;
}

.followlink{
	justify-items: center;
	display: flex;
	flex-direction: column;
	text-decoration: none;
}

.followlink:hover span{
	color: #007BFF;
}

.followlink_title{
	color: rgb(115.2, 117.6, 122.4);
}

.followlink_item{
	font-weight: bold;
	color: black;
	text-align: center;
}

</style>