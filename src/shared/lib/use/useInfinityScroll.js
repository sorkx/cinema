import { 
    ref, 
    onMounted,
    onBeforeUnmount,
} from 'vue'

export const useInfinityScroll = ({ fetchData, fetchNextPage }) => {
    const scrollComponent = ref(null)
    let observer = null

    const handleIntersection = async (entries) => {
        for (const entry of entries) {
            if (entry.isIntersecting) {
                await fetchNextPage()
            }
        }
    }

    onMounted(() => {
        fetchData()
	
        observer = new IntersectionObserver(handleIntersection, {
            root: null,       
            rootMargin: '150px',
            threshold: 0.5,
        })

	
        if (scrollComponent.value) {
            observer.observe(scrollComponent.value)
        }
    })
	
    onBeforeUnmount(() => {
        if (observer && scrollComponent.value) {
            observer.unobserve(scrollComponent.value)
        }
    })

    return {
        scrollComponent,
    }
}