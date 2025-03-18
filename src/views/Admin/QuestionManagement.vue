<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import { usePagination } from '@/hooks/usePagination';
import MarkdownContent from '@/components/MarkdownContent.vue';

const { currentPage, totalItems, totalPages, items, fetchItems, handleSort, nextPage, prevPage } = usePagination('/api/admin/questions');

const dialogVisible = ref(false);
const dialogContent = ref('');

// 显示问题详情的浮窗
const showDetails = async (id) => {
  let res = await request.get(`/api/question/byId/${id}`);
  if (res.message === 'success') {
    dialogContent.value = res.content;
    dialogVisible.value = true;
  }
};

onMounted(() => {
  // 初始加载数据，默认按创建时间降序排列
  fetchItems(currentPage.value);
});

// 清理钩子
onUnmounted(() => {
  currentPage.value = 1;
  totalItems.value = 0;
  totalPages.value = 0;
  items.value = [];
});

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
              <el-button type="danger" plain>删除</el-button>
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
          <el-button @click="nextPage" :disabled="currentPage === totalPages">></el-button>
        </div>
      </div>
    </div>
    <!-- 使用MarkdownContent组件显示问题详情 -->
    <el-dialog v-model="dialogVisible" title="问题详情">
      <MarkdownContent :id="'question-content'" :content="dialogContent"></MarkdownContent>
    </el-dialog>
  </div>
</template>

<style scoped>
@import '../../assets/styles/adminMainView.css';
</style>