<script setup>
import IconLike from '@/components/icons/IconLike.vue';
import { ChatLineRound} from '@element-plus/icons-vue';
import request from '@/request/http';
import { useAnswerStore } from '@/stores/answer';
import { useUserStore } from '@/stores/user';
import { ElMessage } from 'element-plus';
import { computed, onMounted, ref, watch } from 'vue';

const props=defineProps({
	id:{default:''},
});

const comments=ref(0);

</script>


<template>
	<div style="cursor: pointer;">
		<span style="display: flex; align-items: center;">
            <el-icon size="20px" style="margin-right: 4px;"><ChatLineRound /></el-icon>
            {{comments}}
        </span>
	</div>
</template>


<style scoped>

</style>