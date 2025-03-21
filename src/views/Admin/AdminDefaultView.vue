<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useFetchCounts } from '@/hooks/useFetchCounts';

const currentTime = ref(new Date().toLocaleString());
const { questionCount, answerCount, fetchQuestionCount, fetchAnswerCount } = useFetchCounts();

let intervalId;

onMounted(() => {
  // 初始加载数据
  fetchQuestionCount();
  fetchAnswerCount();
  intervalId = setInterval(() => {
    currentTime.value = new Date().toLocaleString();
  }, 1000);
});
</script>

<template>
  <div>
    <div class="head" style="font-weight: bold;">
      管理主页
    </div>
    <br>
    <div class="info-box">
      <p>当前时间: {{ currentTime }}</p>
      <br>
      <p>当前所有问题数量: {{ questionCount }}</p>
      <br>
      <p>当前所有回答数量: {{ answerCount }}</p>
    </div>
  </div>
</template>

<style scoped>
@import '../../assets/styles/adminMainView.css';

.info-box {
  font-size: 18px;
}
</style>