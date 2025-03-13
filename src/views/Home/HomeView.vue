<script setup>
import Header from '@/components/Header/Header.vue';
import RecommandedCardList from './RecommendedCardList.vue';

</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-header style="padding: 0;"><Header style="width:100%"></Header></el-header>

      <el-main>
        <el-card style="max-width: 800px;margin: 0 auto;">
          <template #header>
            <div class="card-header">
              <span>推荐</span>
            </div>
          </template>
          <RecommandedCardList></RecommandedCardList>
        </el-card>
      </el-main>

    </el-container>
  </div>
</template>

<style scoped>

.container {
  height: 100px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
}

.background{
  background-color: rgba(255,255,255,0.96);
  margin: 0 auto;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0,0,0,0.8);
}

p {
  font-size: 24px;
  text-align: center;
  color: #333;
}

button {
  padding: 10px 20px;
  font-size: 16px;
  margin: 10px;
  cursor: pointer;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: white;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #0056b3;
}
</style>
