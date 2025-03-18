import { computed, ref } from 'vue';
import request from '@/request/http';
import {  } from 'pinia';
import { useFetchCounts } from './useFetchCounts';

const { questionCount , fetchQuestionCount } = useFetchCounts();

export function usePagination() {
  const currentPage = ref(1);
  const totalItems = computed(() => questionCount.value);
  const totalPages = computed(() => Math.ceil(totalItems.value / 10));
  // const items = ref([]);
  const items = ref([
    {id: 1, title: 'title1', author: 'author1', createdTime: '2021-01-01'},
  ]);
  const sortOrder = ref('time-');

  const fetchItems = async (page = currentPage.value, order = sortOrder.value) => {
    try {
      // 获取问题数量
      fetchQuestionCount();

      // 获取问题ID列表，临时变量res为id列表
      items.value = [];
      let questionRes = await request.get(`/api/auth/questions`, {
        params: {
          page_num: page,
          page_size: 10,
          sort: order
        }
      });

      // test
      console.log('res:',questionRes);

      for(let question of questionRes.records){
        items.value.push({
          id: question.id,
          title: question.title,
          author: question.author,
          createdTime: question.createdAt,
          content: question.content,
        });
      }


      // for (let id of res) {
      //   let detailRes = await request.get(`/api/public/question/byId/${id}`);
      //   items.value.push({
      //     id: detailRes.id,
      //     title: detailRes.title,
      //     author: detailRes.author,
      //     createdTime: detailRes.createdAt,
      //     content: detailRes.content,
      //   });
      // }
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  const deleteQuestion = async (id) => {
    try {
      await request.post(`/api/auth/question/delete`,{id});
      fetchItems(currentPage.value, sortOrder.value);
      // if (res.code === 200) {
      //   fetchItems(currentPage.value, sortOrder.value);
      // } else {
      // console.error(res.message);
      // }
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
