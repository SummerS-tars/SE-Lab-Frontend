<script setup>
import MarkdownEditBox from '@/components/Header/MarkdownEditBox.vue';
import request from '@/request/http';
import { ElMessage } from 'element-plus';
import { nextTick, onMounted, reactive, ref, watch } from 'vue';

const props=defineProps({
	title: {default:''},
	id: {default:''},
	EditBoxid: {default:''},
	content: {default:''},
});

const emit = defineEmits(['update:title','update:content']);

const visible = ref(false);

const resetForm = () => {ruleForm.title=props.title};
const open = () => {visible.value = true;resetForm()};
const close = () => {visible.value = false};

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

const ruleFormRef = ref();

const ruleForm = reactive({
	title: '',
});

const rules = reactive({
	title: [{
		validator: (rule, value, callback) => {
			if (value === "") callback(new Error('请输入标题'));
			else if(value.length>50) callback(new Error('标题长度不能超过50'));	
			else if(value[value.length-1]!='?'&&value[value.length-1]!='？')callback(new Error('标题必须以问号结尾'));
			else callback();
		},
		trigger: "blur",
	}],
});

const submitForm = (formEl) => {
	if(!formEl) return false;
	formEl.validate(async (valid) =>{
		if(valid){
			let res=await request.post("/api/auth/question/modify", {id:props.id,title:ruleForm.title, content:EditBox.value.getContent()});
			ElMessage.success('修改成功');
			emit("update:title", ruleForm.title);
			emit("update:content",EditBox.value.getContent());
			resetForm();
			close();
		}
	});
} ;

</script>


<template>
	<el-dialog v-model="visible" width="80%">

		<el-form ref="ruleFormRef"	
		:model="ruleForm"
		:rules="rules"
		label-width="auto"
		class="demo-ruleForm">

			<el-form-item label="标题" prop="title">
				<el-input v-model="ruleForm.title" type="text" autocomplete="off"/>
			</el-form-item>
			<el-form-item>
				<MarkdownEditBox ref="EditBox" :id=props.EditBoxid :content=props.content></MarkdownEditBox>
			</el-form-item>
		</el-form>

	<template #footer>
		<el-button type="primary" @click="submitForm(ruleFormRef)">确认修改</el-button>
		<el-button @click="close()">取消</el-button>
	</template>

	</el-dialog>

</template>


<style scoped>


</style>