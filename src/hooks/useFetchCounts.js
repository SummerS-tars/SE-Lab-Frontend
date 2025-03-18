import { ref } from 'vue';
import request from '@/request/http';

export function useFetchCounts() {
  const questionCount = ref(0);
  const answerCount = ref(0);

  // TODO: 问题数量、回答数量请求接口
  const fetchQuestionCount = async () => {
    // 假设有接口可以获取问题的数量
    // let questionRes = await request.get('/api/admin/question/count');
    // questionCount.value = questionRes.count;
  };

  const fetchAnswerCount = async () => {
    // 假设有接口可以获取回答的数量
    // let answerRes = await request.get('/api/admin/answer/count');
    // answerCount.value = answerRes.count;
  };

  return {
    questionCount,
    answerCount,
    fetchQuestionCount,
    fetchAnswerCount,
  };
}
