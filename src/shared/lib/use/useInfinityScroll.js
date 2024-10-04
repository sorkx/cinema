import { 
    ref, 
    onMounted, 
    onUnmounted,
} from 'vue'

export const useInfinityScroll = ({ fetchDataByCategory, fetchNextPage, category }) => {
    const scrollComponent = ref(null)

    const onScroll = async () => {
        const element = scrollComponent.value

        if (element.getBoundingClientRect().bottom < window.innerHeight) {
            await fetchNextPage(category)
        }
    }

    onMounted(async () => {
        await fetchDataByCategory(category, 1)
        window.addEventListener('scroll', onScroll)
    })

    onUnmounted(() => {
        window.removeEventListener('scroll', onScroll)
    })

    return {
        scrollComponent,
    }
}