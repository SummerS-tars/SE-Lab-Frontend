import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/Home/HomeView.vue';
import QuestionView from '@/views/Question/QuestionView.vue';
import QuestionList from '@/views/User/QuestionList/QuestionList.vue';
import AnswerList from '@/views/User/AnswerList/AnswerList.vue';
import FollowerList from '@/views/User/FollowerList/FollowerList.vue';
import FollowingList from '@/views/User/FollowingList/FollowingList.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/Login/Login.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/Login/Register.vue'),
    },
    {
      path: '/question/:id',
      name: 'question',
      component: QuestionView,
    },
    {
      path: '/user/profile/:id',
      component: () => import('@/views/User/UserView.vue'),
      children:[
          {path:'',         name:'QuestionList',  component:QuestionList},
          {path:'answer',   name:'AnswerList',    component:AnswerList},
          {path:'follower', name:'FollowerList',  component:FollowerList},
          {path:'following',name:'FollowingList', component:FollowingList},
      ]
    }
  ],
})

export default router
