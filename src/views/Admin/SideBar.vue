<script setup lang="js" name="AdminSideBar">
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();

const navigateTo = (routeName) => {
  router.push({ name: routeName });
};

</script>

<template>
  <div>
    <div class="head" style="font-weight: bold;">
      管理员主页
    </div>
  <br>
  <el-menu :default-active="route.name" class="el-menu-vertical-demo">
    <el-menu-item index="AdminHome" @click="navigateTo('AdminHome')">
      <span class="content">主页</span>
    </el-menu-item>
    <el-menu-item index="QuestionManagement" @click="navigateTo('QuestionManagement')">
      <span class="content">问题管理</span>
    </el-menu-item>
    <el-menu-item index="AnswerManagement" @click="navigateTo('AnswerManagement')">
      <span class="content">回答管理</span>
    </el-menu-item>
  </el-menu>
  </div>
</template>

<style scoped>
/* 添加样式以适应新的布局 */
.head {
  font-size: 24px;
  margin-right: 30px;
}

.content {
  font-size: 20px;
  margin-right: 30px;
}

.el-menu-vertical-demo {
  width: 100%;
  height: 100%;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

</style>