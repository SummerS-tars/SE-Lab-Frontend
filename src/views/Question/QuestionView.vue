<script setup>
import request from '@/request/http';
import { onBeforeMount, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import Header from '@/components/Header.vue';
import { useUserStore } from '@/stores/user';
import AnswerCardList from './AnswerCardList.vue';
import { timePickerDefaultProps } from 'element-plus';
import FollowButton from '../User/FollowButton.vue';
import MarkdownContent from '@/components/MarkdownContent.vue';

const router = useRouter();
const questionid =  router.currentRoute.value.params.id;

const questionInfo = ref({
  title: '',
  createAt: '',
  content: '',
  author:{default:{id:'',username:'',liked:false}},
});

let tableData= ref([]);

onMounted(async() => {
	let res=await request.get(`/api/question/byId/${questionid}`);
  questionInfo.value.title = res.title;
  questionInfo.value.createAt = res.createAt;
  questionInfo.value.author = res.author;
  questionInfo.value.content = res.content;
});


</script>


<template>
	<div class="common-layout">
    <el-container>
      <el-header style="padding: 0;"><Header style="width:100%"></Header></el-header>

      <el-main>
        <el-card style="max-width: 800px;margin: 0 auto;">
          <template #header>
            <div class="card-header">
              <div class="nav">
                <div>
                  <span style="font-weight: bold;font-size: x-large;margin-left: 8%;">{{questionInfo.title}}</span>
                  <br/>
                  <span style="font-size: 14px;color: #999;margin-left: 8%;"> {{ questionInfo.createAt }}</span>
                </div>
                <div style="font-weight: bold; font-size: 16px; margin-right: 40px;">
								created by 
								<router-link :to="`/user/profile/${questionInfo.author.id}`" class="nav-user">
									{{ questionInfo.author.username }}
								</router-link>
                <FollowButton :author="questionInfo.author"></FollowButton>
                </div>
              </div>
              <MarkdownContent :id="`question-content`" :content="questionInfo.content"></MarkdownContent>
            </div>
          </template>
          
          <AnswerCardList :id="questionid"></AnswerCardList>

        </el-card>
      </el-main>

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
</style>