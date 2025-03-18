import { ref } from 'vue';
import request from '@/request/http';

export function usePagination() {
  const currentPage = ref(1);
  const totalItems = ref(0);
  const totalPages = ref(1);
  // const items = ref([]);
  const items = ref([
    {id: 1, title: 'title1', author: 'author1', createdTime: '2021-01-01'},
  ]);
  const sortOrder = ref('time-');

  const fetchItems = async (page = currentPage.value, order = sortOrder.value) => {
    try {
      // 获取问题数量
      let countRes = await request.get(`/api/public/questionsNum`);
      totalItems.value = countRes.date.count;
      totalPages.value = Math.ceil(totalItems.value / 10);

      // 获取问题ID列表，临时变量res为id列表
      let res = await request.get(`/api/auth/questions`, {
        params: {
          page_num: page,
          page_size: 10,
          sort: order
        }
      });

      if (res.code === 200) {
        items.value = [];
        for (let id of res.data) {
          let detailRes = await request.get(`/api/public/question/byId/${id}`);
          if (detailRes.code === 200) {
            items.value.push({
              id: detailRes.data.id,
              title: detailRes.data.title,
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

  const deleteQuestion = async (id) => {
    try {
      let res = await request.post(`/api/auth/question/delete`, {
          params: { id }
        }
      );
      if (res.code === 200) {
        fetchItems(currentPage.value, sortOrder.value);
      } else {
        console.error(res.message);
      }
    } catch (error) {
      console.error('Error deleting question:', error);
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
    deleteQuestion,
  };
}
