import { ref } from 'vue';
import request from '@/request/http';

export function usePagination(apiEndpoint) {
  const currentPage = ref(1);
  const totalItems = ref(0);
  const totalPages = ref(0);
  const items = ref([]);

  const fetchItems = async (page) => {
    // 假设有接口可以获取列表
    // let res = await request.get(`${apiEndpoint}?page=${page}`);
    // items.value = res.data;
    // totalItems.value = res.total;
    // totalPages.value = Math.ceil(res.total / 10);
  };

  const nextPage = () => {
    if (currentPage.value < totalPages.value) {
      currentPage.value++;
      fetchItems(currentPage.value);
    }
  };

  const prevPage = () => {
    if (currentPage.value > 1) {
      currentPage.value--;
      fetchItems(currentPage.value);
    }
  };

  return {
    currentPage,
    totalItems,
    totalPages,
    items,
    fetchItems,
    nextPage,
    prevPage,
  };
}
