<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import { usePagination } from '@/hooks/useQuestionPagination';
import MarkdownContent from '@/components/MarkdownContent.vue';
import request from '@/request/http';
import { useRouter } from 'vue-router';

const { currentPage, totalItems, items, sortOrder, fetchItems, handleSort ,fetchPage, deleteQuestion } = usePagination();
const router = useRouter();
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
  }
};

const goToAnswerManagement = () => {
  router.push({
    name: 'AnswerManagement',
    query:{
      questionId:selectedQuestionId.value
    },
  });
};

onMounted(() => {
  // 初始加载数据，默认按创建时间降序排列
  fetchItems(currentPage.value);
});

const handleSortChange = ({ prop, order }) => {
  if (prop === 'createdTime') {
    if ((order === 'ascending')&& sortOrder.value==='time-') {
      handleSort();
    } else if ((order === 'descending' || order === null)&&sortOrder.value==='time+') {
      handleSort();
    }
  }
};

</script>

<template>
  <div>
    <div class="head" style="font-weight: bold;">
      问题管理页面
    </div>
    <br>
    <div class="info-box">
      <el-table :data="items" border @sort-change="handleSortChange">
        <el-table-column prop="id" label="问题ID" min-width="80"/>
        <el-table-column prop="title" label="问题标题" min-width="400"/>
        <el-table-column prop="author" label="问题作者" min-width="100"/>
        <el-table-column prop="createdTime" label="创建时间" sortable="custom" min-width="200"/>
        <el-table-column prop="answerCount" label="回答数" min-width="80"/>
        <el-table-column label="操作" min-width="200">
          <template #default="{ row }">
            <el-button type="primary" plain @click="showDetails(row.id)">详情</el-button>
            <el-button type="danger" plain @click="deleteQuestion(row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        layout="jumper, prev, pager, next, total"
        :total="totalItems"
        :current-page="currentPage"
        :page-size="10"
        @current-change="fetchPage"
      />
    </div>

    <!-- 使用MarkdownContent组件显示问题详情 -->
    <el-dialog v-model="dialogVisible" title="问题详情">
      <MarkdownContent :id="'question-content'" :content="dialogContent"></MarkdownContent>
      <template #footer>
        <el-button type="primary" @click="goToAnswerManagement">查看相关回答</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped>
@import '../../assets/styles/adminMainView.css';

.el-table :deep(.el-table__header-wrapper th) {
  background-color: #f5f7fa; 
  color: #303133; 
  font-size: 14px; 
  font-weight: bold; 
}

</style>