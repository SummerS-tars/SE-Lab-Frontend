<script setup>
import {ref, onMounted} from 'vue';

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
          <RouterView class="form-container"></RouterView>
        </div>
      </el-main> 
    </el-container>
  </div>
</template>

<style scoped>

.container{
  background-image: url("@/assets/Mu_Silk.png");
  align-items: stretch;
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center; 
  align-items: center; 
}

.background{
  background-color: rgba(255,255,255,0.96);
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0,0,0,0.8);
}
.form-container{
  width: 400px;
}

</style>
