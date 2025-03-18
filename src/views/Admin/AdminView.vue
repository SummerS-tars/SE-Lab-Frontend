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
          <div class="content-box">
            <router-view></router-view>
          </div>
          
        </el-main>
      </el-container>
      
    </el-container>
  </div>
</template>

<style scoped>
.sidebar {
  background-color:rgb(52, 170, 132, 0.6);
  padding: 25px;
  height: 100%; /* 使侧边栏高度与el-container高度一致 */
  overflow: auto; /* 添加滚动条 */
}

.container {
  padding: 25px;
  background-color: rgb(250, 233, 209);
  height: 100%; /* 使主要内容区域高度与el-container高度一致 */
}

.content-box {
  background-color: rgb(240, 240, 240 , 0.5);
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  height: 94%;
}
</style>