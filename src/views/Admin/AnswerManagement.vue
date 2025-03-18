<script setup>
import { ref, onMounted } from 'vue';
import { usePagination } from '@/hooks/usePagination';

const { currentPage, totalItems, totalPages, items, fetchItems, nextPage, prevPage } = usePagination('/api/admin/answers');

onMounted(() => {
  fetchItems(currentPage.value);
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
            <th>回答作者</th>
            <th>创建时间</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="answer in items" :key="answer.id">
            <td>{{ answer.id }}</td>
            <td>{{ answer.author }}</td>
            <td>{{ answer.createdTime }}</td>
            <td>
              <el-button type="primary" plain>详情</el-button>
              <el-button type="danger" plain>删除</el-button>
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
          <el-button @click="nextPage" :disabled="currentPage === totalPages">></el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import '../../assets/styles/adminMainView.css';
</style>