<script setup>
import { nextTick, onMounted, onUnmounted } from 'vue';

let loading = false;
let nomore = false;
let scrollPositionCurrent = 0;
let page = 0;

let callback=async()=>{};

const setCallback = (call) =>{callback = call};
const setPage = (p)=>{page = p};
const getPage = ()=>{return page};
const addPage = ()=>{page++};

const getNomore = ()=>{return nomore};

const finishload = ()=>{
    nomore = true;
    window.removeEventListener('scroll',handleScroll);
};

const onBeforeUpdate = ()=>{
    scrollPositionCurrent = window.scrollY;
};

const onUpdated = ()=>{
    nextTick(()=>{
        window.scrollTo(0, scrollPositionCurrent);
    });
};

defineExpose({setCallback, setPage, getPage, addPage,finishload,getNomore,onBeforeUpdate,onUpdated});

const handleScroll = async()=>{
    if(loading) {
        return;
    }
    const scrollPosition = window.scrollY + window.innerHeight;
    const pageHeight = document.documentElement.scrollHeight;
    if (scrollPosition >= pageHeight-1000) { 
        loading = true;
        await callback();
        loading = false;
    }
};

onMounted(()=>{
    window.addEventListener('scroll',handleScroll);
});

onUnmounted(()=>{
    window.removeEventListener('scroll',handleScroll);
});

</script>


<template>
</template>


<style scoped>
</style>
