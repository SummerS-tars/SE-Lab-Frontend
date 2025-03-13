import { ElMessage } from "element-plus"
import { nextTick, onBeforeMount, onBeforeUpdate, onMounted, onUnmounted, onUpdated, ref } from "vue";

export function usePageInfiniteScroll(loadMoreCallback){
    const loading = ref(false);

    let scrollPositionCurrent = 0;
    const handleScroll = () => {
        if(loading.value) return;
        const scrollPosition = window.scrollY + window.innerHeight;
        const pageHeight = document.documentElement.scrollHeight;
        if (scrollPosition >= pageHeight-1000) { 
            loading.value = true;
            loadMoreCallback(()=>{
                loading.value = false;
            });
        }
    }

    onMounted(()=>{
        window.addEventListener('scroll',handleScroll);
    });

    onUnmounted(()=>{
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
};