import { ref, computed } from 'vue';
import request from '@/request/http';
import { useFetchCounts } from './useFetchCounts';

const { answerCount, fetchAnswerCount } = useFetchCounts();

export function usePagination() {
  const currentPage = ref(1);
  const totalItems = computed(() => answerCount.value);
  const totalPages = computed(() => Math.ceil(totalItems.value / 10));
  const relatedQuestionId = ref(0);
  const items = ref([]) ;
  // const items = ref([
  //   {id: 1, questionId: 1 , author: 'author1', createdTime: '2021-01-01'},
  // ]);
  const sortOrder = ref('time-');

  const fetchItems = async (page = currentPage.value, order = sortOrder.value, questionId = relatedQuestionId.value) => {
    try {
      fetchAnswerCount(questionId);

      let answerQueryApi = `/api/public/answers`;
      if(questionId !== 0) {
        answerQueryApi = `/api/auth/answers/byQuestionId/${questionId}`;
      }

      items.value = [];
      let res = await request.get(answerQueryApi, {
        params: {
          page_num: page,
          page_size: 10,
          sort: order
        }
      });
      for(let answer of res.records){
        items.value.push({
          id: answer.id,
          questionId: answer.questionId,
          author: answer.author,
          createdTime: answer.createdAt,
          content: answer.content,
        });
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
    relatedQuestionId,
  };
}
