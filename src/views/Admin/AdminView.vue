<script setup lang="js" name="AdminHomeView">
import Header from '@/components/Header/AdminHeader.vue';
import AdminSideBar from '@/views/Admin/SideBar.vue';

</script>

<template>
  <div class="common-layout">
    <el-container style="height: 100vh;">
      <el-header style="padding: 0;">
        <Header style="width:100%;height: 100%;"></Header>
      </el-header>

      <el-container>
        <el-aside width="200px" class="sidebar">
          <!-- 管理员侧边栏 -->
          <AdminSideBar></AdminSideBar>
        </el-aside>

        <el-main class="container">
          <!-- 挂载主要内容组件 -->
          <!-- <router-view></router-view>  -->
          
        </el-main>
      </el-container>
      
    </el-container>
  </div>
</template>

<style scoped>
.sidebar {
  background-color:rgb(52, 170, 132, 0.6);
  padding: 30px;
  height: 100%; /* 使侧边栏高度与el-container高度一致 */
}

.container {
  padding: 30px;
  background-color: rgb(250, 233, 209);
  height: 100%; /* 使主要内容区域高度与el-container高度一致 */
}
</style>