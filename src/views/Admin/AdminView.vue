<script setup lang="js" name="AdminHomeView">
import Header from '@/components/Header/Header.vue';

</script>

<template>
  <div class="common-layout">
    <el-container style="height: 100vh;">
      <el-header style="padding: 0;">
        <Header style="width:100%;height: 100%;"></Header>
      </el-header>

      <el-main class="container">
        <div class="background">
          <RouterView class="admin-home-container"></RouterView>
        </div>
      </el-main>
      
    </el-container>
  </div>
</template>

<style scoped>
  
</style>