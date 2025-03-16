<script setup lang="js" name="AdminHomeView">
import Header from '@/components/Header/Header.vue';
import AdminSideBar from '@/views/Admin/SideBar.vue';

</script>

<template>
  <div class="common-layout">
    <el-container style="height: 100vh;">
      <el-header style="padding: 0;">
        <Header style="width:100%;height: 100%;"></Header>
      </el-header>

      <el-main class="container">
        <div class="background">
          <!-- TODO: 管理员主界面 -->
          <!-- // TODO: 管理员侧边栏 -->
          <AdminSideBar></AdminSideBar>
          <!-- // TODO: 管理员主界面内容 -->
            <!-- // TODO: 问题管理 -->
            <!-- // TODO: 回答管理 -->
        </div>
      </el-main>
      
    </el-container>
  </div>
</template>

<style scoped>

</style>