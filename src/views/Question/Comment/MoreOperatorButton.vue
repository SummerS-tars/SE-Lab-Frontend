<script setup>
import IconLike from '@/components/icons/IconLike.vue';
import { MoreFilled} from '@element-plus/icons-vue';
import request from '@/request/http';
import { useAnswerStore } from '@/stores/answer';
import { useUserStore } from '@/stores/user';
import { ElMessage } from 'element-plus';
import { computed, onMounted, ref, watch } from 'vue';

const props=defineProps({
	id:{default:''},
	comments:{default:0}
});

</script>


<template>
	<div style="cursor: pointer;">
		<span style="display: flex; align-items: center;">
            <el-icon size="20px" style="margin-right: 4px;"><MoreFilled /></el-icon>
        </span>
	</div>
</template>


<style scoped>

</style>