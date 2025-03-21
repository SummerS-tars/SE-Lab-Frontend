<script setup>
import MarkdownEditBox from '@/components/Header/MarkdownEditBox.vue';
import request from '@/request/http';
import { ElMessage } from 'element-plus';
import { nextTick, onMounted, reactive, ref, watch } from 'vue';

const props=defineProps({
	id: {default:''},
	EditBoxid: {default:''},
	content: {default:''},
});

const emit = defineEmits(['update:content']);

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
	await request.post('/api/auth/answer/modify', {id:props.id, content:EditBox.value.getContent()});
	ElMessage.success('修改成功');
	emit('update:content',EditBox.value.getContent());
	resetForm();
	close();
};

</script>


<template>
	<el-dialog v-model="visible" width="80%">
		<MarkdownEditBox ref="EditBox" :id=props.EditBoxid :content=props.content></MarkdownEditBox>
		<template #footer>
			<el-button type="primary" @click="submitForm()">确认修改</el-button>
			<el-button @click="close()">取消</el-button>
		</template>
	</el-dialog>

</template>


<style scoped>


</style>