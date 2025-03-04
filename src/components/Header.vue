<script setup>
import { ElMessage,ElNotification as notify} from 'element-plus';
import { User, Setting} from '@element-plus/icons-vue';



</script>

<template>
    <div class="nav">
        <div>
            <el-link href="/" :underline="false">
                <img src="@/assets/Mu_Silk.png" alt="logo" style="height: 50px; margin-right: 15px;">
                <el-text type="primary" style="margin: left;font-size:20px; text-align: center;">矢呼</el-text>
            </el-link>
        </div>
        <template v-if="true">
            <div>
                <el-link href="/login">登录</el-link>
                <el-link href="/register">注册</el-link>
            </div>
        </template>
    </div>
</template>

<style scoped>
.nav{
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.el-link{
    margin-right: 8px;
}

</style>
