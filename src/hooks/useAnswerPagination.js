import { ref, computed } from 'vue';
import request from '@/request/http';
import { useFetchCounts } from './useFetchCounts';
import { ElMessage } from 'element-plus';

const { answerCount, fetchAnswerCount } = useFetchCounts();

export function usePagination() {
  const currentPage = ref(1);
  const totalItems = computed(() => answerCount.value);
  const totalPages = computed(() => Math.ceil(totalItems.value / 10));
  const relatedQuestionId = ref(0);
  const items = ref([]) ;
  const sortOrder = ref('time-');

  const fetchItems = async (page = currentPage.value, order = sortOrder.value, questionId = relatedQuestionId.value) => {
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
    for(let answer of res.records) {
      items.value.push({
        id: answer.id,
        questionId: answer.questionId,
        author: answer.author,
        createdTime: answer.createdAt,
        content: answer.content,
      });
    }
  };

  const deleteAnswer = async (id) => {
    await request.post(`/api/auth/answer/delete`, {
        params: { id }
      }
    );
    ElMessage.success('删除成功');
    fetchItems(currentPage.value, sortOrder.value);
  };

  const handleSort = () => {
    sortOrder.value = sortOrder.value === 'time+' ? 'time-' : 'time+';
    currentPage.value = 1;
    fetchItems(currentPage.value, sortOrder.value);
  };

  const fetchPage = (page) => {
    currentPage.value = page;
    fetchItems(currentPage.value, sortOrder.value);
  }

  return {
    currentPage,
    totalItems,
    totalPages,
    items,
    sortOrder,
    fetchItems,
    handleSort,
    fetchPage,
    deleteAnswer,
    relatedQuestionId,
  };
}
