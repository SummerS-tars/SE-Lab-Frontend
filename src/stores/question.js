import { ref, computed, reactive } from 'vue'
import { defineStore } from 'pinia'

export const useQuestionStore = defineStore('question', () => {

    const questionList = {}

    function setQuestion(question) {
        questionList[question.value.id]=question;
    }

    function getQuestion(id) {
        return questionList[id];
    }

  return { setQuestion,getQuestion }
})
