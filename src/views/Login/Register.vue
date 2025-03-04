<script setup>
import {ref, onMounted} from 'vue';

import Header from '@/components/Header.vue';
import RegisterForm from './RegisterForm.vue';

</script>

<template>
    <el-container style="height: 100vh;">
      <el-header>
        <Header></Header>
      </el-header>

      <el-main class="container">
        <div class="background">
          <RegisterForm class="form-container"></RegisterForm>
        </div>
      </el-main> 
    </el-container>
</template>

<style scoped>
*{
  box-sizing: border-box;
}

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
