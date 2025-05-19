<script setup>
import { onBeforeUpdate, onMounted, onUpdated, ref } from 'vue';
import request from '@/request/http.js';
import { useRoute } from 'vue-router';
import PageInfiniteScroll from '@/components/PageInfiniteScroll.vue';

const tableData = ref([]);

const route = useRoute();
const userid = route.params.id;

const loadpage = async (page) => {
  let res = await request.get(`/api/auth/notify/invitations/page`, {
    params: { page_num: page, page_size: 5, sort: 'time-' },
  });

  console.log(res);
  if (res.records.length === 0) {
    infiniteScroll.value.finishload();
    return;
  }

  res.records.forEach(item => {
    tableData.value.push(item);
  });
};

onMounted(async () => {
  infiniteScroll.value.setCallback(async () => {
    await loadpage(infiniteScroll.value.getPage());
  });
  infiniteScroll.value.initLoad();
});

const infiniteScroll = ref();

onBeforeUpdate(() => {
  infiniteScroll.value.onBeforeUpdate();
});

onUpdated(() => {
  infiniteScroll.value.onUpdated();
});

// 提取邀请人ID
const inviterId = (item) => {
  return item.inviterId;
};

// 提取邀请人用户名
const inviterName = (item) => {
  return item.inviterName;
};

// 提取问题标题或 ID
const questionTitle = (item) => {
  return item.questionTitle || '未知问题';
};

// 构造跳转链接
const hrefQuery = (item) => {
  return { inviteId: item.id };
};
</script>

<template>
  <PageInfiniteScroll ref="infiniteScroll" />
  <template v-if="tableData.length == 0">
    <el-empty description="暂无邀请通知"></el-empty>
  </template>
  <template v-else>
    <li v-for="(item, index) in tableData" :key="index" style="list-style: none;">
      <el-card class="invite-card">
        <div class="invite-content">
          <div class="user-info">
            <a :href="`/user/profile/${inviterId(item)}`" class="username">{{ inviterName(item) }}</a>
            邀请你回答问题：
            <router-link
              :to="{
                path: `/question/${item.questionId}`,
                query: hrefQuery(item),
              }"
              class="question-title"
            >
              {{ questionTitle(item) }}
            </router-link>
          </div>

          <!-- 时间 -->
          <div class="time">{{ item.createdAt }}</div>
        </div>
      </el-card>
    </li>
  </template>
</template>

<style scoped>
.invite-card {
  margin-top: 10px;
  border-radius: 8px;
  transition: box-shadow 0.3s ease;
}

.invite-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.invite-content {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 10px;
}

.user-info {
  font-size: 16px;
  color: #333;
}

.username {
  color: #333;
  text-decoration: none;
  font-weight: bold;
  margin-right: 5px;
}

.username:hover {
  color: #111;
}

.question-title {
  color: #409eff;
  text-decoration: none;
  font-weight: bold;
}

.question-title:hover {
  color: #337ecc;
}

.time {
  font-size: 12px;
  color: #999;
}
</style>