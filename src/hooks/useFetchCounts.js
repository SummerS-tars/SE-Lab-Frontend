import { ref } from 'vue';
import request from '@/request/http';

export function useFetchCounts() {
  const questionCount = ref(0);
  const answerCount = ref(0);

  const fetchQuestionCount = async () => {
    try {
      let countRes = await request.get(`/api/public/questionNum`);
      questionCount.value = countRes.count;
    } catch (error) {
      console.error('Error fetching question count:', error);
    }
  };

  const fetchAnswerCount = async (id = 0) => {
    try {
      if( id !== 0 ){
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
