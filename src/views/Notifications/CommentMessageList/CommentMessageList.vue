<script setup>
import { onBeforeUpdate, onMounted, onUpdated, ref } from 'vue';
import request from '@/request/http.js';
import { useRoute } from 'vue-router';
import PageInfiniteScroll from '@/components/PageInfiniteScroll.vue';
import MarkdownContent from '@/components/MarkdownContent.vue';

const tableData = ref([]);

const route = useRoute();
const userid =  route.params.id;

const loadpage=async(page) => {
	let res=await request.get(`/api/auth/notify/comments/page`,{params:{page_num:page,page_size:5,sort:'time-'}});
	console.log(res);
	if(res.records.length===0) {
		infiniteScroll.value.finishload();
		return;
	}
	res.records.forEach(item=>{
		tableData.value.push(item);
	});
};

onMounted(async() => {
	infiniteScroll.value.setCallback(async() => {
		await loadpage(infiniteScroll.value.getPage());
	});
	infiniteScroll.value.initLoad();
});

const infiniteScroll=ref();

onBeforeUpdate(() => {
	infiniteScroll.value.onBeforeUpdate();
});

onUpdated(() => {
	infiniteScroll.value.onUpdated();
});

const messageType = (item) => {
  if (item.answer) return "回答";
  else return "评论";
};

const content = (item) => {
  if (item.answer) return item.answer.content;
  if (item.comment) return item.comment.content;
  if (item.reply) return item.reply.content;
};

const userId = (item) => {
  if (item.comment) return item.comment.userId;
  if (item.reply) return item.reply.userId;
};

const username = (item) => {
  if (item.comment) return item.comment.username;
  if (item.reply) return item.reply.username;
};

const hrefQuery = (item) => {
  if (item.comment) return { answerId: item.comment.answerId };
  if (item.reply) return { commentId: item.reply.commentId };
};

</script>

<template>
	<PageInfiniteScroll ref="infiniteScroll"/>
  <template v-if="tableData.length==0">
		<el-empty></el-empty>
	</template>
	<template v-else>
		<li v-for="(item,index) in tableData" :key="index" style="list-style: none;" >
			<el-card class="message-card">
				<div v-if="item" class="message-content">
					<div class="user-info">
						<a :href="`/user/profile/${userId(item)}`" class="username">{{ username(item) }}</a>
						回复了你的
						<router-link
							:to="{
							path: `/question/${item.questionId}`,
							query: hrefQuery(item),
							}"
							class="message-type-link"
						>
							{{ messageType(item) }}
						</router-link>
					</div>

				<!-- 时间 -->
				<div class="time">{{ item.createdAt }}</div>

				<!-- 内容展示 -->
				<div class="message-body">
					<MarkdownContent
					v-if="messageType(item) === '回答'"
					:id="`comment-message-answer-content-${index}`"
					:content="content(item)"
					class="markdown-content"
					/>
					<div v-else class="text-content markdown-content">{{ content(item) }}</div>
				</div>
				</div>

				<div v-else class="invalid-message">
				<span>通知已失效或不存在</span>
				</div>
			</el-card>
		</li>
	</template>
</template>


<style scoped>
.message-card {
  margin-top: 10px;
  border-radius: 8px;
  transition: box-shadow 0.3s ease;
}

.message-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.message-content {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.user-info {
  font-size: 16px;
  color: #555;
}

.username {
  color: #555;
  text-decoration: none;
  font-weight: bold;
  margin-right: 5px;
}

.username:hover {
  color: #333;
}
  
.time {
	font-size: 12px;
	color: #999;
}
  
/* 超链接样式 */
.message-type-link {
  color: #555;
  text-decoration: none;
  font-weight: bold;
  margin-left: 5px;
}

.message-type-link:hover {
  color: #333;
}

.message-body {
  font-size: 14px;
  color: #444;
  line-height: 1.5;
}

.markdown-content,
.text-content {
  background-color: #f8f9fa;
  border: 1px solid #eaecef;
  border-radius: 6px;
  padding: 14px;
  word-break: break-word;
}

.text-content {
  white-space: pre-wrap;
}

.invalid-message {
  color: #999;
  font-style: italic;
}
</style>