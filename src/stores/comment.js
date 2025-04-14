import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

export const useCommentStore = defineStore('comment', () => {

    const commentList = ref({});

    function set(comment) {
        commentList.value[comment.value.id]=comment;
    }

    function get(id) {
        return commentList.value[id];
    }

    const getCommentAnswerId = (id)=>{
        return commentList.value[id].answerId;
    }

  return { set,get, getCommentAnswerId };
});
