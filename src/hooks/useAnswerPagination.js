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
    try {
      let res = await request.get(apiEndpoint, {
        params: {
          page_num: page,
          page_size: 10,
          sort: order
        }
      });
      if (res.code === 200) {
        items.value = res.data.items;
        totalItems.value = res.data.totalItems;
        totalPages.value = Math.ceil(res.data.totalItems / 10);
      } else {
        console.error(res.message);
      }
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  const handleSort = () => {
    sortOrder.value = sortOrder.value === 'time+' ? 'time-' : 'time+';
    currentPage.value = 1;
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
