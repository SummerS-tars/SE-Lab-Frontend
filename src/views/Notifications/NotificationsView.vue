<script setup>
import Copyright from '@/components/Copyright.vue';
import Header from '@/components/Header/Header.vue';
import request from '@/request/http';
import { computed, onMounted, ref } from 'vue';
import { onBeforeRouteUpdate, useRoute, useRouter } from 'vue-router';

const router = useRouter();
const route = useRoute();

const nameToIndexMap = {
  LikeMessageList: '0',
  CommentMessageList: '1',
  InviteMessageList: '2',
};

const activeIndex = ref(computed(() => {
  return nameToIndexMap[route.name] || '0';
}));

const handleSelect = (key) => {
  if (key === '0') {
    router.push(`/notifications/`);
  } else if (key === '1') {
    router.push(`/notifications/comment`);
  } else if (key === '2') {
    router.push(`/notifications/invite`);
  }
};

const likeMessageCount = ref(0);
const commentMessageCount = ref(0);
const inviteMessageCount = ref(0); 

onMounted(async () => {
  const [likeRes, commentRes, inviteRes] = await Promise.all([
    request.get(`/api/auth/notify/likes/count`),
    request.get(`/api/auth/notify/comments/count`),
    request.get(`/api/auth/notify/invitations/count`) 
  ]);

  likeMessageCount.value = likeRes.count;
  commentMessageCount.value = commentRes.count;
  inviteMessageCount.value = inviteRes.count;
});

onBeforeRouteUpdate(async (to, from, next) => {
  if (to.name === 'LikeMessageList') {
    await request.post(`/api/auth/notify/likes/check`);
  } else if (to.name === 'CommentMessageList') {
    await request.post(`/api/auth/notify/comments/check`);
  } else if (to.name === 'InviteMessageList') {
    await request.post(`/api/auth/notify/invitations/check`);
  }

  next();
});
</script>

<template>
  <el-container style="min-height: 101vh;">
    <el-header style="padding: 0;">
      <Header style="width:100%" />
    </el-header>
    <el-main>
      <el-card style="max-width: 1000px; min-height: 80vh; margin: 0 auto;">
        <template #header>
          <div class="card-header">
            <span style="font-weight: bold;">通知中心</span>
          </div>
        </template>
        <el-menu
          :default-active="activeIndex"
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect"
          style="height: 40px;"
        >
          <el-menu-item index="0">点赞 {{ likeMessageCount }}</el-menu-item>
          <el-menu-item index="1">评论 {{ commentMessageCount }}</el-menu-item>
          <el-menu-item index="2">邀请 {{ inviteMessageCount }}</el-menu-item>
        </el-menu>

        <router-view></router-view>
      </el-card>
    </el-main>
    <Copyright />
  </el-container>
</template>

<style scoped>
.card-header {
  font-size: 18px;
}
.el-menu-demo {
  border-bottom: none;
}
</style>