<script setup>
import request from '@/request/http';
import { onMounted, ref, watch } from 'vue';
import { onBeforeRouteUpdate, useRoute } from 'vue-router';
import Header from '@/components/Header/Header.vue';
import AnswerCardList from './AnswerCardList.vue';
import FollowButton from '../User/FollowButton.vue';
import MarkdownContent from '@/components/MarkdownContent.vue';
import AnswerEditBoxForm from './AnswerEditBoxForm.vue';
import { useUserStore } from '@/stores/user';
import { ElMessage } from 'element-plus';
import { useQuestionStore } from '@/stores/question';
import Copyright from '@/components/Copyright.vue';
import router from '@/router';
import CommentDetailList from './Comment/CommentDetailList.vue';
import ReplyDetailList from './Comment/ReplyDetailList.vue';

const questionid =  useRoute().params.id;

const questionInfo = useQuestionStore().getQuestion(questionid);

const answerEditBox = ref();

const writeAnswer = () =>{
  if(!useUserStore().token()) {
    ElMessage.error('请先登录后再进行操作');
    return;
  }
  answerEditBox.value.open();
};

const detailAnswer = ref({visible:false,id:null});
const detailComment = ref({visible:false,id:null}); 
const setDetail=(detail,newId)=>{
  if(newId)detail.value.visible=true;
  else detail.value.visible=false;
  detail.value.id=newId;
}

const setDetailfromRoute=(route)=>{
  if(route.query.answerId){
    setDetail(detailAnswer,route.query.answerId);
    setDetail(detailComment,null);
  }
  else if(route.query.commentId){
    setDetail(detailAnswer,null);
    setDetail(detailComment,route.query.commentId);
  }
  else{
    setDetail(detailAnswer,null);
    setDetail(detailComment,null);
  }
};

onMounted(()=>{
  setDetailfromRoute(useRoute());
});

onBeforeRouteUpdate((to, from, next) => {
  setDetailfromRoute(to);
  next();
});
const clearRouteQuery = () => {
  router.push(`/question/${questionid}`);
}

</script>


<template>
	<div class="common-layout">
    <el-container>
      <el-header style="padding: 0;">
        <Header style="width:100%"></Header>
      </el-header>
      <el-main>
        <el-card style="max-width: 800px;margin: 0 auto;">
          <template #header>
            <div class="card-header">
              <div class="nav">
                <div>
                  <div style="margin-left: 20px;">
                    <span class="question-title">{{questionInfo.title}}</span>
                  </div>
                  <br/>
                  <span style="font-size: 14px;color: #999;margin-left: 8%;">创建时间: {{ questionInfo.createdAt }}</span>
                </div>
                <div style="font-weight: bold; font-size: 16px; margin-right: 30px;">
                  created by 
                  <router-link :to="`/user/profile/${questionInfo.author.id}`" class="nav-user">
                    {{ questionInfo.author.username }}
                  </router-link>
                  <FollowButton :authorId="questionInfo.author.id"></FollowButton>
                </div>
              </div>
              <MarkdownContent :id="`question-content`" :content="questionInfo.content"></MarkdownContent>
              <div style="margin: 20px 0px 0px 20px">
                <el-button type="primary" plain @click="writeAnswer">写回答</el-button>
					      <AnswerEditBoxForm ref="answerEditBox" :id="questionid"></AnswerEditBoxForm>
                <span style="font-size: 14px;color: #999;margin-left: 8%;"> 回答数 {{ questionInfo.answerCount }}</span>
              </div>
            </div>
          </template>
          <AnswerCardList :id="questionid"></AnswerCardList>
        </el-card>
        <el-dialog v-model="detailAnswer.visible"
          title="回答评论"
          :before-close="clearRouteQuery"
          align-center
        >
          <CommentDetailList :answerId="detailAnswer.id"/>
        </el-dialog>
        <el-dialog v-model="detailComment.visible" 
          title="评论回复"
          :before-close="clearRouteQuery"
          align-center
        >
          <ReplyDetailList :commentId="detailComment.id"></ReplyDetailList>
        </el-dialog>
      </el-main>
      <Copyright></Copyright>
    </el-container>
  </div>
</template>


<style scoped>
.nav{
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
  white-space: nowrap;
}

.nav-user{
	/* text-decoration: none; */
  font-size: large;
	color: black;
  margin-right: 20px;
}

.question-title{
  font-weight: bold;
  font-size: x-large;
  width: 400px;
  white-space: normal;
}
</style>