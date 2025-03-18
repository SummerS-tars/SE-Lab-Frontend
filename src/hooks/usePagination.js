import { ref } from 'vue';
import request from '@/request/http';

export function usePagination(apiEndpoint) {
  const currentPage = ref(1);
  const totalItems = ref(0);
  const totalPages = ref(0);
  const items = ref([
    {id: 1, title: 'title1', author: 'author1', createdTime: '2021-01-01'},
]);
  const sortOrder = ref('time-');

  const fetchItems = async (page = currentPage.value, order = sortOrder.value) => {
    // 假设有接口可以获取列表，并支持排序参数
    // let res = await request.get(`${apiEndpoint}?page=${page}&sortOrder=${order}`);
    // items.value = res.data;
    // totalItems.value = res.total;
    // totalPages.value = Math.ceil(res.total / 10);
  };

  const handleSort = () => {
    // 切换排序顺序
    sortOrder.value = sortOrder.value === 'time+' ? 'time-' : 'time+';
    // 将当前页面设置为1
    currentPage.value = 1;
    // 根据新的排序顺序获取数据
    fetchItems(currentPage.value, sortOrder.value);
  };

  const nextPage = () => {
    if (currentPage.value < totalPages.value) {
      currentPage.value++;
      fetchItems(currentPage.value, sortOrder.value);
    }
  };

  const prevPage = () => {
    if (currentPage.value > 1) {
      currentPage.value--;
      fetchItems(currentPage.value, sortOrder.value);
    }
  };

  return {
    currentPage,
    totalItems,
    totalPages,
    items,
    sortOrder,
    fetchItems,
    handleSort,
    nextPage,
    prevPage,
  };
}
