<script setup>
import FollowButton from '@/views/User/FollowButton.vue'
import CommentForm from './CommentForm.vue'
import { ChatLineRound } from '@element-plus/icons-vue'
import { computed, ref } from 'vue'
import LikeButton from '@/components/LikeButton.vue'
import CommentButton from '@/views/Question/Comment/CommentButton.vue'
import { useCommentStore } from '@/stores/comment'
import MoreOperatorButton from './MoreOperatorButton.vue'
import { useUserStore } from '@/stores/user'

const props = defineProps({
  commentId: {
    default: ''
  }
})

const showCommentForm = ref(false)

const commentRef = computed(() => useCommentStore().get(props.commentId))
const answerId = computed(() => commentRef.value.answerId)

const createReplyParams = computed(() => ({
  answerId: answerId.value,
  commentId: commentRef.value.fatherCommentId,
  replyType: 'CITE',
  replyTo: props.commentId
}))

const isDirectReply = () => commentRef.value.replyType === 'DIRECT'

const showDelete = computed(() => {
  if (!useUserStore().token()) return false
  return commentRef.value.userId === useUserStore().id
})
</script>

<template>
  <div class="sub-comment-item">
    <!-- 头部 -->
    <div class="comment-header">
      <div class="author-info">
        <router-link :to="`/user/profile/${commentRef.userId}`" class="author">{{ commentRef.username }}</router-link>
        <span v-if="!isDirectReply()"> > </span>
        <router-link :to="`/user/profile/${commentRef.replyToUserId}`" class="author">{{ commentRef.replyToUsername }}</router-link>
      </div>

      <!-- 更多操作按钮 -->
      <div class="more-button">
        <MoreOperatorButton
          deleteApi="/api/auth/reply/delete"
          :params="{ id: props.commentId }"
          :showDelete="showDelete"
          :copyContent="commentRef.content"
        />
      </div>
    </div>

    <!-- 内容 -->
    <div class="comment-content">
      {{ commentRef.content }}
    </div>

    <!-- 底部 -->
    <div class="comment-footer">
      <span class="time">{{ commentRef.createdAt }}</span>

      <div class="action-buttons">
        <!-- 点赞 -->
        <LikeButton api="/api/auth/user/reply" :params="{ id: props.commentId }" v-model:info="commentRef" />

        <!-- 回复按钮 -->
        <CommentButton @click="showCommentForm = !showCommentForm" comments="回复" />
      </div>
    </div>

    <!-- 回复表单 -->
    <div v-if="showCommentForm" class="reply-form">
      <CommentForm api="/api/auth/reply/create" :params="createReplyParams" />
    </div>
  </div>
</template>

<style scoped>
.sub-comment-item {
  padding: 12px;
  padding-right: 0px;
  margin-bottom: 8px;
}

.comment-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6px;
}

.author {
  color: #333;
  font-weight: bold;
  text-decoration: none;
  transition: all 0.3s ease;
}

.author:hover {
  color: #555;
  /* text-decoration: underline; */
}

.author-info {
  display: flex;
  align-items: center;
  gap: 4px;
  font-weight: bold;
}

.comment-link {
  text-decoration: none;
  color: black;
}

.comment-link:hover {
  color: #007bff;
}

.more-button {
  cursor: pointer;
  font-size: 16px;
}

.comment-content {
  margin: 6px 0;
  color: #555;
}

.comment-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 8px;
  font-size: 13px;
}

.time {
  color: #999;
  font-size: 0.95em;
}

.action-buttons {
  display: flex;
  align-items: center;
  gap: 12px;
}
</style>