<script setup>
import request from '@/request/http';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import Header from '@/components/Header.vue';
import Cherry from 'cherry-markdown';

const router = useRouter();
const questionid =  router.currentRoute.value.params.id;

const questionInfo = ref({});

let cherryInstance = null;

onMounted(async() => {
	let res=await request.get(`/api/question/byId/${questionid}`);
  questionInfo.value.title = res.title;
  questionInfo.value.createAt = res.createAt;
  questionInfo.value.author = res.author;

  console.log(res);

  cherryInstance = new Cherry({
    id: 'question-content',
    value: res.content,
    editor:{
      defaultModel: 'previewOnly',
    }
  });

  cherryInstance.wrapperDom.style.boxShadow = 'none';
  cherryInstance.previewer.getDom().style.border = 'none';
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
								<router-link :to="`/user/${questionInfo.author}`" class="nav-user">
									{{ questionInfo.author }}
								</router-link>
                </div>

              </div>
              <div @click.prevent.stop>
                <div id="question-content"></div>
              </div>
            </div>
          </template>
          
          

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
	color: black;
}
</style>