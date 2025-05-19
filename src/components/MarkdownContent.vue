<script setup>
import Cherry from 'cherry-markdown';
import { nextTick, onBeforeMount, onMounted, onUnmounted, ref, watch } from 'vue';

const props = defineProps({
	id:{default:''},
	content:{default:''},
  maxHeight:{default:undefined}
});

watch(()=>props.content,() => {
  if(!cherryInstance.value)return;
  cherryInstance.value.setValue(props.content);
});

const cherryInstance=ref(null);

onBeforeMount(async() => {
  await nextTick();
  cherryInstance.value = new Cherry({
    id: props.id,
    value: props.content,
    editor:{
      defaultModel: 'previewOnly',
    }
  });

  cherryInstance.value.wrapperDom.style.boxShadow = 'none';
  cherryInstance.value.previewer.getDom().style.border = 'none';
  if(props.maxHeight){
    cherryInstance.value.previewer.getDom().style.maxHeight = props.maxHeight;
  }
});

</script>


<template>
	<div @click.prevent.stop>
		<div :id="props.id"></div>
	</div>
</template>


<style scoped>


</style>