<script setup>

const props=defineProps({
    messageInfo:{default:{}}
})

</script>


<template>
  <el-card style="border:0px;" class="no-border">
		<div style="justify-content: space-between;display: flex;align-items: center;">
			<div>
				<a class="comment-link" :href="`/user/profile/${commentRef.userId}`">
					<span style=""> {{ commentRef.username }}</span>
				</a>
				<br/>
				{{ commentRef.content }}
				<br/>
				<span style="font-size: 12px;color: #999;"> {{ commentRef.createdAt }}</span>
			</div>
			<div style="display: flex;align-items: center;">
				<span style="width: 60px;"><LikeButton api="/api/auth/user/comment" :params="{id:commentRef.id}" v-model:info="commentRef"></LikeButton></span>
				<span @click="showCommentForm=!showCommentForm" style="width: 60px;"><CommentButton :id="props.id" :comments="commentRef.replyCount"></CommentButton></span>
				<span><MoreOperatorButton deteteApi="/api/auth/comment/delete" :params="{id:props.commentId}" :showDelete="showDelete" :copyContent="commentRef.content"/></span>
			</div>
		</div>
	</el-card>
</template>


<style scoped>


</style>