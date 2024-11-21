import { 
    ref, 
    onMounted,
    onBeforeUnmount,
} from 'vue'
import throttle from 'lodash.throttle'

export const useInfinityScroll = ({ fetchData, fetchNextPage }) => {
    const scrollComponent = ref(null)
    const isLoading = ref(false)
    let observer = null

    const throttledFetchNextPage = throttle(async () => {
        if (!isLoading.value) {
            try {
                isLoading.value = true
                await fetchNextPage()
            } catch (error) {
                console.error('Error loading more items:', error)
            } finally {
                isLoading.value = false
            }
        }
    }, 1000)

    const handleIntersection = async (entries) => {
        for (const entry of entries) {
            if (entry.isIntersecting) {
                throttledFetchNextPage()
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
        isLoading,
    }
}