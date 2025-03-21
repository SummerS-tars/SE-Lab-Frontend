<script setup>
import { onMounted, onUnmounted, ref, watch } from 'vue';
import { usePagination } from '@/hooks/useAnswerPagination';
import MarkdownContent from '@/components/MarkdownContent.vue';
import request from '@/request/http';
import { onBeforeRouteUpdate, useRoute } from 'vue-router';
import { ElMessage } from 'element-plus';

const { currentPage, totalItems, totalPages, items, sortOrder, fetchItems, handleSort, fetchPage , deleteAnswer , relatedQuestionId} = usePagination();
const route = useRoute();

const dialogVisible = ref(false);
const dialogContent = ref('');

// 显示回答详情的浮窗
const showDetails = (id) => {
  const answer = items.value.find((item) => item.id === id);
  if (answer) {
    dialogContent.value = `相关问题id：${answer.questionId}\n作者：${answer.author}\n创建时间：${answer.createdTime}\n${answer.content}`;
    dialogVisible.value = true;
  } else {
    ElMessage.error('回答未找到');
  }
};

onBeforeRouteUpdate((to, from, next)=>{
  relatedQuestionId.value = to.query.questionId || 0;
  fetchItems(currentPage.value , sortOrder.value, relatedQuestionId.value);
  next();
});


onMounted(() => {
  relatedQuestionId.value = route.query.questionId || 0;

  // // test

  // 初始加载数据，默认按创建时间降序排列
  fetchItems(currentPage.value , sortOrder.value, relatedQuestionId.value);
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
      回答管理页面
    </div>
    <br>
    <div class="info-box">
      <el-table :data="items" border @sort-change="handleSortChange">
        <el-table-column prop="id" label="回答ID" min-width="80"/>
        <el-table-column prop="questionId" label="相关问题ID" min-width="120"/>
        <el-table-column prop="author" label="问题作者" min-width="100"/>
        <el-table-column prop="createdTime" label="创建时间" sortable="custom" min-width="200"/>
        <el-table-column label="操作" min-width="200">
          <template #default="{ row }">
            <el-button type="primary" plain @click="showDetails(row.id)">详情</el-button>
            <el-button type="danger" plain @click="deleteAnswer(row.id)">删除</el-button>
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
    <!-- 使用MarkdownContent组件显示回答详情 -->
    <el-dialog v-model="dialogVisible" title="回答详情">
      <div>
        <MarkdownContent :id="'answer-content'" :content="dialogContent"></MarkdownContent>
      </div>
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