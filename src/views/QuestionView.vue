<script setup>
import request from '@/request/http';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import Header from '@/components/Header.vue';

const router = useRouter();
const questionid =  router.currentRoute.value.params.id;

const title = ref('');

onMounted(async() => {
	let res=await request.get(`/api/question/byId/${questionid}`);
  title.value = res.title;
	console.log(res);
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
              <span>{{title}}</span>
            </div>
          </template>
          <RecommandedCardList></RecommandedCardList>
        </el-card>
      </el-main>

    </el-container>
  </div>
</template>


<style scoped>


</style>