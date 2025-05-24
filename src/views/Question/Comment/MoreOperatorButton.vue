<script setup>
import IconLike from '@/components/icons/IconLike.vue';
import { MoreFilled} from '@element-plus/icons-vue';
import request from '@/request/http';
import { useAnswerStore } from '@/stores/answer';
import { useUserStore } from '@/stores/user';
import { ElMessage, ElMessageBox } from 'element-plus';
import { computed, onMounted, ref, watch } from 'vue';

const props=defineProps({
	deteteApi:{default:''},
	params:{default:''},
	showDelete:{default:true},
	copyContent:{default:''},
});

const onClickCopy = () => {
	// navigator.clipboard.writeText(props.copyContent).then(() => {
	// 	ElMessage.success('复制成功');
	// })
	const textArea = document.createElement("textarea");
	textArea.value = props.copyContent;
	document.body.appendChild(textArea);
	textArea.select();
	try {
		const successful = document.execCommand('copy');
		const msg = successful ? '成功' : '不成功';
		ElMessage.success('复制成功');
	} catch (err) {
		ElMessage.error('复制失败');
	}
	document.body.removeChild(textArea);
};

const onClickDelete = () => {
	if(!props.showDelete)return;

	ElMessageBox.confirm('确认删除吗?').then(async() => {
		await request.post(props.deteteApi,props.params);
		ElMessage.success('删除成功');
		window.location.reload();
	});
};

</script>


<template>
	<el-popover
		placement="bottom"
		trigger="hover"
		width="auto"
		popper-class="customPopper"
	>
    <template #reference>
      <div style="cursor: pointer;">
				<span style="display: flex; align-items: center;">
            <el-icon size="12px" style="margin-right: 4px;"><MoreFilled /></el-icon>
        </span>
			</div>
    </template>
		<div style="display: flex; flex-direction: column;">
			<el-button @click="onClickCopy" link style="margin: 0 auto;">复制</el-button>
    	<el-button v-if="props.showDelete" @click="onClickDelete" link style="margin: 0 auto;">删除</el-button>
		</div>
  </el-popover>
</template>


<style lang="scss">
.customPopper {
  min-width: 60px!important;
}
</style>