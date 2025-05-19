<script setup>
/*
实现一个评论vue组件，可以借助element ui库，要求显示评论时间，评论作者，评论内容，点赞数，回复数，
更多操作按钮（是一个内容为”...“的Icon，已实现为MoreOperatorButton组件）
与查看所有回复按钮，另外需要显示若干个回复，点击回复数按钮可以显示创建回复组件，已实现为CommentForm，
子回复组件已经实现为SubCommentList。以下代码为基础，进行一定的美化与布局，比如将时间放在左下角，
将点赞与评论按钮的位置改为右下角，将更多按钮放在右上角
*/
import { useCommentStore } from '@/stores/comment'
import { useUserStore } from '@/stores/user'
import { computed, ref } from 'vue'
import MoreOperatorButton from './MoreOperatorButton.vue'
import CommentForm from './CommentForm.vue'
import CommentButton from './CommentButton.vue'
import LikeButton from '@/components/LikeButton.vue'
import ReplyList from './ReplyList.vue'

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
  commentId: props.commentId,
  replyType: 'DIRECT',
  replyTo: 0
}))

const showDelete = computed(() => {
  if (!useUserStore().token()) return false
  return commentRef.value.userId === useUserStore().id
})

// 是否有子评论
const hasReplies = computed(() => commentRef.value.replyCount > 0)
</script>

<template>
  <div class="comment-item">
    <!-- 头部 -->
    <div class="comment-header">
      <router-link :to="`/user/profile/${commentRef.userId}`" class="author">{{ commentRef.username }}</router-link>

      <!-- 右上角更多操作 -->
      <div class="more-button">
        <MoreOperatorButton
          deleteApi="/api/auth/comment/delete"
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

    <!-- 底部信息 -->
    <div class="comment-footer">
      <span class="time">{{ commentRef.createdAt }}</span>

      <div class="action-buttons">
        <!-- 点赞 -->
        <LikeButton api="/api/auth/user/comment" :params="{ id: commentRef.id }" v-model:info="commentRef" />

        <!-- 回复按钮 -->
        <CommentButton @click="showCommentForm = !showCommentForm" :comments="commentRef.replyCount" />
      </div>
    </div>

    <!-- 回复表单 -->
    <div v-if="showCommentForm" class="reply-form">
      <CommentForm api="/api/auth/reply/create" :params="createReplyParams" style="margin-bottom: 12px" />
    </div>

    <!-- 子评论列表 -->
    <div v-if="hasReplies || showCommentForm" class="replies-section">
      <ReplyList :commentId="props.commentId" />
    </div>
  </div>
</template>

<style scoped>
.comment-item {
  padding: 16px;
  margin-bottom: 16px;
  /* background-color: #f9f9f9; */
  /* border-radius: 8px; */
}

.comment-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
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

.more-button {
  cursor: pointer;
  font-size: 16px;
}

.comment-content {
  margin: 8px 0;
  line-height: 1.5;
  color: #555;
}

.comment-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 12px;
  font-size: 14px;
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

.reply-form {
  margin-top: 12px;
}

.replies-section {
  margin-top: 12px;
  padding-left: 20px;
  border-left: 2px solid #e4e4e4;
}
</style>

