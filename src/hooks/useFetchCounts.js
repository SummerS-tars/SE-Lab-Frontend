import { ref } from 'vue';
import request from '@/request/http';

export function useFetchCounts() {
  const questionCount = ref(0);
  const answerCount = ref(0);

  const fetchQuestionCount = async () => {
    let countRes = await request.get(`/api/public/questionNum`);
    questionCount.value = countRes.count;
  };

  const fetchAnswerCount = async (id = 0) => {
    if( id !== 0 ) {
      let countRes = await request.get(`/api/auth/answers/byQuestionId/${id}`, {
        params: {
          page_num : 1,
          page_size : 1,
          sort: "time-",
        }
      });
      answerCount.value = countRes.total;
    } else {
      let countRes = await request.get(`/api/public/answerNum`);
      answerCount.value = countRes.count;
    }
  };

  return {
    questionCount,
    answerCount,
    fetchQuestionCount,
    fetchAnswerCount,
  };
}
