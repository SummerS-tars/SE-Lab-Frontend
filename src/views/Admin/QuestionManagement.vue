<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import { usePagination } from '@/hooks/useQuestionPagination';
import MarkdownContent from '@/components/MarkdownContent.vue';
import request from '@/request/http';

const { currentPage, totalItems, totalPages, items, fetchItems, handleSort, nextPage, prevPage , deleteQuestion } = usePagination();

const dialogVisible = ref(false);
const dialogContent = ref('');
const selectedQuestionId = ref(null); // 存储选中的问题ID


// 显示问题详情的浮窗
const showDetails = (id) => {
  const question = items.value.find(q => q.id === id);
  if (question) {
    dialogContent.value = `#${question.title}\n作者：${question.author}\n创建时间：${question.createdTime}\n${question.content}`;
    dialogVisible.value = true;
    selectedQuestionId.value = id; // 存储问题ID
  } else {
    console.error('Question not found');
  }
};

onMounted(() => {
  // 初始加载数据，默认按创建时间降序排列
  fetchItems(currentPage.value);
});

// 清理钩子：不需要，离开此页面会自动清理
// onUnmounted(() => {
//   currentPage.value = 1;
//   totalItems.value = 0;
//   totalPages.value = 2;
//   items.value = [];
// });
</script>

<template>
  <div>
    <div class="head" style="font-weight: bold;">
      问题管理页面
    </div>
    <br>
    <div class="info-box">
      <table>
        <thead>
          <tr>
            <th>问题ID</th>
            <th>问题标题</th>
            <th>问题作者</th>
            <th @click="handleSort">创建时间</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="question in items" :key="question.id">
            <td>{{ question.id }}</td>
            <td>{{ question.title }}</td>
            <td>{{ question.author }}</td>
            <td>{{ question.createdTime }}</td>
            <td>
              <el-button type="primary" plain @click="showDetails(question.id)">详情</el-button>
              <el-button type="danger" plain @click="deleteQuestion(question.id)">删除</el-button>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="pagination">
        <span>总问题数: {{ totalItems }}</span>
        <span>总页数: {{ totalPages }}</span>
        <div class="page-controls">
          <el-button @click="prevPage" :disabled="currentPage === 1"><</el-button>
          <span>{{ currentPage }}</span>
          <el-button @click="nextPage" :disabled="currentPage >= totalPages">></el-button>
        </div>
      </div>
    </div>

    
    <!-- 使用MarkdownContent组件显示问题详情 -->
    <el-dialog v-model="dialogVisible" title="问题详情">
      <MarkdownContent :id="'question-content'" :content="dialogContent"></MarkdownContent>
      <template #footer>
        <el-button type="primary" @click="goToAnswerManagement">查看相关回答</el-button> // TODO: 添加此方法，不知道怎么将问题id传递过去
      </template>
    </el-dialog>
  </div>
</template>

<style scoped>
@import '../../assets/styles/adminMainView.css';
</style>