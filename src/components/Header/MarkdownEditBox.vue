<script setup>
import { uploadFile } from '@/request/upload';
import Cherry from 'cherry-markdown';
import { ElMessage } from 'element-plus';
import { ref } from 'vue';

const props = defineProps({
	id:{default:''},
	content:{default:''},
});

let cherryInstance=ref(null);
const init = ()=> {
	if (!cherryInstance.value) {
    cherryInstance.value = new Cherry({
      id: props.id,
      value: props.content,
			fileUpload: uploadImage,
    });
  }
};

const destroy = () => {
	if(cherryInstance.value){
		cherryInstance.value.destroy();
		cherryInstance.value = null;
	}
};
const setContent = () =>{}; 
const getContent = () =>{
	return cherryInstance.value.getMarkdown();
};

defineExpose({init,destroy,setContent, getContent});
const uploadImage = async(file,callback) => {
	if(!/image/i.test(file.type))return;
	let res=await uploadFile('/api/auth/upload/image',file)
	if(res.message=='success'){
		callback(res.url,{
			width: '300px',
      height: 'auto'
		});
	}
	else{
		ElMessage.error(res.message);
	}
}

</script>


<template>
    <div @click.prevent.stop style="margin: auto;">
        <div :id=props.id></div>
    </div>
</template>


<style scoped>


</style>