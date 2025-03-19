<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import { usePagination } from '@/hooks/useAnswerPagination';
import MarkdownContent from '@/components/MarkdownContent.vue';
import request from '@/request/http';
import { useRoute } from 'vue-router';

const { currentPage, totalItems, totalPages, items, fetchItems, handleSort, nextPage, prevPage , deleteAnswer } = usePagination();
const route = useRoute();

const dialogVisible = ref(false);
const dialogContent = ref('');
const relatedQuestionId = ref(null); // 存储选中的问题ID，0表示不限制问题ID

// 显示回答详情的浮窗
const showDetails = (id) => {
  const answer = items.value.find((item) => item.id === id);
  if (answer) {
    dialogContent.value = answer.content;
    dialogVisible.value = true;
  } else {
    console.error('Answer not found');
  }
};

onMounted(() => {
  relatedQuestionId.value = Number(route.params.questionId) ;

  // // test
  // console.log('relatedQuestionId: ', relatedQuestionId.value);

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
      回答管理页面
    </div>
    <br>
    <div class="info-box">
      <table>
        <thead>
          <tr>
            <th>回答ID</th>
            <th>相关问题ID</th>
            <th>回答作者</th>
            <th @click="handleSort">创建时间</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="answer in items" :key="answer.id">
            <td>{{ answer.id }}</td>
            <td>{{ answer.questionId }}</td>
            <td>{{ answer.author }}</td>
            <td>{{ answer.createdTime }}</td>
            <td>
              <el-button type="primary" plain @click="showDetails(answer.id)">详情</el-button>
              <el-button type="danger" plain @click="deleteAnswer(answer.id)">删除</el-button>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="pagination">
        <span>总回答数: {{ totalItems }}</span>
        <span>总页数: {{ totalPages }}</span>
        <div class="page-controls">
          <el-button @click="prevPage" :disabled="currentPage === 1"><</el-button>
          <span>{{ currentPage }}</span>
          <el-button @click="nextPage" :disabled="currentPage >= totalPages">></el-button>
        </div>
      </div>
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
</style>