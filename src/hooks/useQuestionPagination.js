import { computed, ref } from 'vue';
import request from '@/request/http';
import { useFetchCounts } from './useFetchCounts';
import { ElMessage } from 'element-plus';

const { questionCount , fetchQuestionCount } = useFetchCounts();

export function usePagination() {
  const currentPage = ref(1);
  const totalItems = computed(() => questionCount.value);
  const totalPages = computed(() => Math.ceil(totalItems.value / 10));
  const items = ref([]);
  const sortOrder = ref('time-');

  const fetchItems = async (page = currentPage.value, order = sortOrder.value) => {
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

    for(let question of questionRes.records) {
      items.value.push({
        id: question.id,
        title: question.title,
        author: question.author,
        createdTime: question.createdAt,
        answerCount: question.answerCount,
        content: question.content,
      });
    }
  };

  const deleteQuestion = async (id) => {
    await request.post(`/api/auth/question/delete`,{id});
    ElMessage.success('删除成功');
    fetchItems(currentPage.value, sortOrder.value);
  };

  const handleSort = () => {
    sortOrder.value = sortOrder.value === 'time+' ? 'time-' : 'time+';
    currentPage.value = 1;
    fetchItems(currentPage.value, sortOrder.value);
  };

  const handleSortChange = ({ prop, order }) => {
    if (prop === 'createdTime') {
      if ((order === 'ascending')&& sortOrder.value==='time-') {
        handleSort();
      } else if ((order === 'descending' || order === null)&&sortOrder.value==='time+') {
        handleSort();
      }
    }
  };

  const fetchPage = (page) => {
    currentPage.value = page;
    fetchItems(currentPage.value, sortOrder.value);
  };

  return {
    currentPage,
    totalItems,
    totalPages,
    items,
    sortOrder,
    fetchItems,
    handleSort,
    handleSortChange,
    fetchPage,
    deleteQuestion,
  };
}
