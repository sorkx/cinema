import { 
    ref, 
    onMounted,
    onBeforeUnmount,
} from 'vue'

export const useInfinityScroll = ({ fetchData, fetchNextPage }) => {
    const scrollComponent = ref(null)
    let observer = null

    onMounted(() => {
        fetchData()
	
        observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    fetchNextPage()
                }
            })
        }, {
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