<script setup>
import request from '@/request/http';
import Cherry from 'cherry-markdown';
import { ElMessage } from 'element-plus';
import { nextTick, onMounted, reactive, ref, watch } from 'vue';

const visible = ref(false);

const resetForm = () => {ruleForm.title='';}
const open = () =>{visible.value = true;resetForm();};
const close = () =>{visible.value = false;};

defineExpose({open, close});

let cherryInstance=null;

watch(visible,async(newValue)=>{
	if(newValue){
		await nextTick();
		if (!cherryInstance) {
      cherryInstance = new Cherry({
        id: 'markdown-container',
        value: '# title',
      });
    }
	}
	else {
		if (cherryInstance) {
			cherryInstance.destroy();
			cherryInstance = null;
		}
	}
});

const ruleFormRef = ref();

const ruleForm = reactive({
	title: '',
});

const rules = reactive({
	title: [{
		validator: (rule, value, callback) => {
			if (title === "") {
				callback(new Error("请输入标题"));
			} else {
				callback();
			}
		},
		trigger: "blur",
	}],
});

const submitForm = (formEl) => {
	if(!formEl) return;
	formEl.validate(async (valid) =>{
		if(valid){
			let res=await request.post("/api/question/create", {title:ruleForm.title, content:cherryInstance.getMarkdown()});
			if(res.message=='success'){
				ElMessage.success('发布成功');
				return true;
			}
			else{
				ElMessage.error(res.message);
			}
		}
		else{
			ElMessage.error('发布失败，内容不完整');
		}
		return false;
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

			<el-form-item label="标题" prop="username">
				<el-input v-model="ruleForm.title" type="text" autocomplete="off"/>
			</el-form-item>
			<el-form-item>
				<div @click.prevent.stop style="margin: auto;">
					<div id="markdown-container"></div>
				</div>
			</el-form-item>
		</el-form>

	<template #footer>
		<el-button type="primary" @click="if(submitForm(ruleFormRef))close();">发布</el-button>
		<el-button @click="close()">取消</el-button>
	</template>

	</el-dialog>

</template>


<style scoped>


</style>