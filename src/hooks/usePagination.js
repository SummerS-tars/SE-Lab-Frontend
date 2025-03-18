import { ref } from 'vue';
import request from '@/request/http';

export function usePagination(apiEndpoint) {
  const currentPage = ref(1);
  const totalItems = ref(0);
  const totalPages = ref(0);
  const items = ref([]);
  const sortKey = ref('createdTime');
  const sortOrder = ref('desc');

  const fetchItems = async (page, sortKey = 'createdTime', sortOrder = 'desc') => {
    // 假设有接口可以获取列表，并支持排序参数
    // let res = await request.get(`${apiEndpoint}?page=${page}&sortKey=${sortKey}&sortOrder=${sortOrder}`);
    // items.value = res.data;
    // totalItems.value = res.total;
    // totalPages.value = Math.ceil(res.total / 10);
  };

  const handleSort = (key) => {
    // 切换排序键和排序顺序
    if (sortKey.value === key) {
      sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc';
    } else {
      sortKey.value = key;
      sortOrder.value = 'desc';
    }
    // 将当前页面设置为1
    currentPage.value = 1;
    // 根据新的排序键和排序顺序获取数据
    fetchItems(currentPage.value, sortKey.value, sortOrder.value);
  };

  const nextPage = () => {
    if (currentPage.value < totalPages.value) {
      currentPage.value++;
      fetchItems(currentPage.value, sortKey.value, sortOrder.value);
    }
  };

  const prevPage = () => {
    if (currentPage.value > 1) {
      currentPage.value--;
      fetchItems(currentPage.value, sortKey.value, sortOrder.value);
    }
  };

  return {
    currentPage,
    totalItems,
    totalPages,
    items,
    sortKey,
    sortOrder,
    fetchItems,
    handleSort,
    nextPage,
    prevPage,
  };
}
