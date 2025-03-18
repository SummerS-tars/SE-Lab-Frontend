import { ref } from 'vue';
import request from '@/request/http';

export function useFetchCounts() {
  const questionCount = ref(0);
  const answerCount = ref(0);

  // TODO: 问题数量、回答数量请求接口
  const fetchQuestionCount = async () => {
    try {
      let countRes = await request.get(`/api/public/questionNum`);
      // test
      // console.log('@',countRes.count);
      //   if (countRes.code === 200) {
      //     questionCount.value = countRes.count;
      //   } else {
      //     console.error(countRes.message);
      //   }
      questionCount.value = countRes.count;
    } catch (error) {
      console.error('Error fetching question count:', error);
    }
  };

  const fetchAnswerCount = async () => {
    try {
      let countRes = await request.get(`/api/public/answerNum`);
      answerCount.value = countRes.count;
    } catch (error) {
      console.error('Error fetching answer count:', error);
    }  
  };

  return {
    questionCount,
    answerCount,
    fetchQuestionCount,
    fetchAnswerCount,
  };
}
