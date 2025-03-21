<script setup>
import MarkdownEditBox from '@/components/Header/MarkdownEditBox.vue';
import request from '@/request/http';
import { ElMessage } from 'element-plus';
import { nextTick, ref, watch } from 'vue';

const props=defineProps({
	id:{default:''},
});

const visible = ref(false);
const resetForm = () => {};
const open = () =>{
	visible.value = true;
	resetForm();
};
const close = () =>{
	visible.value = false;
};

defineExpose({open, close});

const EditBox = ref();

watch(visible,async(newValue)=>{
	if(newValue) {
		await nextTick();
		EditBox.value.init();
	}
	else {
		EditBox.value.destroy();
	}
});

const submitForm = async() => {
	await request.post('/api/auth/answer/create', {questionId:props.id, content:EditBox.value.getContent()});
	ElMessage.success('发布成功');
	close();
	window.location.reload();
};

</script>


<template>
	<el-dialog v-model="visible" width="80%">

		<MarkdownEditBox ref="EditBox" id="answer-editbox" content="##example"></MarkdownEditBox>

	<template #footer>
		<el-button type="primary" @click="submitForm()">发布</el-button>
		<el-button @click="close()">取消</el-button>
	</template>

	</el-dialog>

</template>


<style scoped>


</style>