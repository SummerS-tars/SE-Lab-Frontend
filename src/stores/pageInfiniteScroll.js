import { defineStore } from "pinia"
import { onBeforeUpdate, onMounted, onUnmounted, onUpdated } from "vue";


export const usePageInfiniteScroll = defineStore('usePageInfiniteScroll', () => {
    let loading = false;
    
    let scrollPositionCurrent = 0;
    let page = 0;

    let callback=()=>{};

    const setCallback = (call) =>{callback = call;};
    const setPage = (p)=>{page = p};
    const getPage = ()=>{return page;};
    const addPage = ()=>{page++;};


    const handleScroll = ()=>{
        if(loading) return;
        const scrollPosition = window.scrollY + window.innerHeight;
        const pageHeight = document.documentElement.scrollHeight;
        if (scrollPosition >= pageHeight-1000) { 
            loading = true;
            callback();
            loading = false;
        }
    }

    onMounted(()=>{
        window.addEventListener('scroll',handleScroll);
    });

    onUnmounted(()=>{
        console.log("unmounted");
        window.removeEventListener('scroll',handleScroll);
    })

    onBeforeUpdate(()=>{
        scrollPositionCurrent = window.scrollY;
    })

    onUpdated(()=>{
        nextTick(()=>{
            console.log("updated");
            window.scrollTo(0, scrollPositionCurrent);
        })
    });

    return { setCallback, setPage, getPage, addPage }
})