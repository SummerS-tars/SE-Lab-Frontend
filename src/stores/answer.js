import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useAnswerStore = defineStore('answer', () => {

	const answerList = ref({})

	function setAnswer(answer) {
		answerList.value[answer.value.id]=answer;
	}

	function getAnswer(id) {
		return answerList.value[id];
	}

  return { setAnswer,getAnswer }
})
