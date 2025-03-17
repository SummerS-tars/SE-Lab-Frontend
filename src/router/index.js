import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/Home/HomeView.vue';
import QuestionView from '@/views/Question/QuestionView.vue';
import QuestionList from '@/views/User/QuestionList/QuestionList.vue';
import AnswerList from '@/views/User/AnswerList/AnswerList.vue';
import FollowerList from '@/views/User/FollowerList/FollowerList.vue';
import FollowingList from '@/views/User/FollowingList/FollowingList.vue';
import LoginForm from '@/views/Login/LoginForm.vue';
import RegisterForm from '@/views/Login/RegisterForm.vue';
import AdminLoginForm from '@/views/Login/AdminLoginForm.vue';
import AdminDefaultView from '@/views/Admin/AdminDefaultView.vue';
import QuestionManagement from '@/views/Admin/QuestionManagement.vue';
import AnswerManagement from '@/views/Admin/AnswerManagement.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      beforeEnter: (to,from,next)=>{
        if(localStorage.getItem('token')){
          next()
        }else{
          next({name:'Login'})
        }
      }
    },
    {
      path: '/',
      component: () => import('@/views/Login/LoginView.vue'),
      children:[
        {path:'login',         name:'Login',  component:LoginForm},
        {path:'register',     name:'Register',component:RegisterForm},
        {path:'admin_login', name:'AdminLogin', component: AdminLoginForm},
      ],
    },
    {
      path: '/admin_home',
      component: () => import('@/views/Admin/AdminView.vue'),
      children:[
        {path:'', name:'AdminHome' , component:AdminDefaultView}, // TODO: AdminDefaultView.vue
        {path:'question', name:'QuestionManagement', component:QuestionManagement}, // TODO: QuestionManagement.vue
        {path:'answer', name:'AnswerManagement', component:AnswerManagement}, // TODO: AnswerManagement.vue
      ]
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
