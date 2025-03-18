import { ref } from 'vue';
import request from '@/request/http';

export function usePagination() {
  const currentPage = ref(1);
  const totalItems = ref(0);
  const totalPages = ref(1);
  const items = ref([
    {id: 1, questionId: 1 , author: 'author1', createdTime: '2021-01-01'},
  ]);
  const sortOrder = ref('time-');

  const fetchItems = async (page = currentPage.value, order = sortOrder.value, questionId = '') => {
    try {
      // 获取回答数量
      let countRes = await request.get(`/api/public/answersNum`, {
        params: { questionId }
      });
      totalItems.value = countRes;
      totalPages.value = Math.ceil(totalItems.value / 10);

      // 获取回答ID列表，临时变量res为id列表
      let res = await request.get(`/api/auth/answers`, {
        params: {
          page_num: page,
          page_size: 10,
          sort: order
        }
      });

      if (res.code === 200) {
        items.value = [];
        for (let id of res) {
          let detailRes = await request.get(`/api/public/answer/byId/${id}`);
          if (detailRes.code === 200) {
            items.value.push({
              id: detailRes.data.id,
              questionId: detailRes.data.questionId,
              author: detailRes.data.author,
              createdTime: detailRes.data.timestamp,
              content: detailRes.data.content,
            });
          }
        }
      } else {
        console.error(res.message);
      }
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  const deleteAnswer = async (id) => {
    try {
      let res = await request.post(`/api/auth/answer/delete`, {
          params: { id }
        }
      );
      if (res.code === 200) {
        fetchItems(currentPage.value, sortOrder.value);
      } else {
        console.error(res.message);
      }
    } catch (error) {
      console.error('Error deleting answer:', error);
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
    deleteAnswer,
  };
}
