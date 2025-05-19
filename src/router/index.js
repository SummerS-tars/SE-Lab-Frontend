import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/Home/HomeView.vue';
import QuestionView from '@/views/Question/QuestionView.vue';
import QuestionList from '@/views/User/QuestionList/QuestionList.vue';
import AnswerList from '@/views/User/AnswerList/AnswerList.vue';
import FollowerList from '@/views/User/FollowerList/FollowerList.vue';
import FollowingList from '@/views/User/FollowingList/FollowingList.vue';
import LoginForm from '@/views/Login/LoginForm.vue';
import RegisterForm from '@/views/Login/RegisterForm.vue';
import AdminDefaultView from '@/views/Admin/AdminDefaultView.vue';
import QuestionManagement from '@/views/Admin/QuestionManagement.vue';
import AnswerManagement from '@/views/Admin/AnswerManagement.vue';
import request from '@/request/http';
import { ref } from 'vue';
import { useQuestionStore } from '@/stores/question';
import { useProfileStore } from '@/stores/profile';
import { useUserStore } from '@/stores/user';
import { ElMessage } from 'element-plus';
import LikeMessageList from '@/views/Notifications/LikeMessageList/LikeMessageList.vue';
import CommentMessageList from '@/views/Notifications/CommentMessageList/CommentMessageList.vue';
import InviteMessageList from '@/views/Notifications/InviteMessageList/InviteMessageList.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {requiresAuth: true}
    },
    {
      path: '/',
      component: () => import('@/views/Login/LoginView.vue'),
      children:[
        {path:'login',         name:'Login',  component:LoginForm,
          beforeEnter: (to,from,next) => {
            if(useUserStore().isLogin()) {
              next(from);
            }else{
              next();
            }
          },
        },
        {path:'register',     name:'Register',component:RegisterForm},
      ],
    },
    {
      path: '/admin_home',
      component: () => import('@/views/Admin/AdminView.vue'),
      children:[
        {path:'', name:'AdminHome' , component:AdminDefaultView},
        {path:'question', name:'QuestionManagement', component:QuestionManagement}, 
        {path:'answer', name:'AnswerManagement', component:AnswerManagement}, 
      ],
      beforeEnter: (to,from,next) => {
        if(useUserStore().isadmin) {
          next();
        }else{
          next(from);
          ElMessage.error('没有管理员权限');
        }
      },
    },
    {
      path: '/question/:id',
      name: 'question',
      component: QuestionView,
      beforeEnter: async(to,from,next) => {
        const questionId=to.params.id;
        try{
          let res=await request.get(`/api/public/question/byId/${questionId}`);
          const questionInfo = ref({});
          questionInfo.value.id = questionId;
          questionInfo.value.title = res.title;
          questionInfo.value.createdAt = res.createdAt;
          questionInfo.value.author = {
            id: res.authorId,
            username: res.author,
          };
          questionInfo.value.content = res.content;
          questionInfo.value.answerCount = res.answerCount;
          useQuestionStore().setQuestion(questionInfo);
          next();
        }catch(e) {
          next({path: '/notFound'});
        }
      },
    },
    {
      path: '/user/profile/:id',
      component: () => import('@/views/User/UserView.vue'),
      children:[
        {path:'',         name:'QuestionList',  component:QuestionList},
        {path:'answer',   name:'AnswerList',    component:AnswerList},
        {path:'follower', name:'FollowerList',  component:FollowerList},
        {path:'following',name:'FollowingList', component:FollowingList},
      ],
      beforeEnter: async(to,from,next) => {
        const userId=to.params.id;
        try{
          let res = await request.get(`/api/public/user/byId/${userId}`);
          const userInfo=ref({});
          userInfo.value.username=res.username;
          userInfo.value.email=res.email;
          userInfo.value.follower=res.numfollower;
          userInfo.value.following=res.numfollowing;
          userInfo.value.id=userId;

          res = await request.get( `/api/public/questionNum/byUserId/${userId}`); 
          userInfo.value.questionCount=res.count;

          res = await request.get( `/api/public/answerNum/byUserId/${userId}`); 
          userInfo.value.answerCount=res.count;

          useProfileStore().setProfile(userInfo);
          next();
        }catch(e) {
          next({path: '/notFound'});
        }
      },
    },
    {
      path: '/notifications',
      name: 'Notifications',
      component: () => import('@/views/Notifications/NotificationsView.vue'),
      meta: {requiresAuth: true},
      children:[
        {path:'',         name:'LikeMessageList',  component:LikeMessageList},
        {path:'comment',   name:'CommentMessageList',    component:CommentMessageList},
        {path: 'invite',    name: 'InviteMessageList',  component: InviteMessageList}
      ],
      beforeEnter: async(to,from,next) => {
        if(to.name=='LikeMessageList'){
          await request.post(`/api/auth/notify/likes/check`);
          console.log("checked");
          next();
        }
        else if(to.name=='CommentMessageList'){
          await request.post(`/api/auth/notify/comments/check`);
          console.log("checked");
          next();
        }
        else{
          next();
        }
      },
    },
    {
      path: '/:pathMatch(.*)*', 
      name: 'NotFound',
      component: () => import('@/views/NotFoundView.vue'),
    },
  ],
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = useUserStore().isLogin();
  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ name: 'Login' });
  } else {
    next();
  }
});


export default router;
