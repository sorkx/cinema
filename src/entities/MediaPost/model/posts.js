import { 
    defineStore, 
} from 'pinia'
import {
    ref,
} from 'vue'
import {
    ApiPosts,
} from '../api'

export const useMediaPosts = defineStore('news', () => {
    const posts = ref([])
    const isLoading = ref(false)
    const currentPage = ref(1)
    const totalPages = ref(1)

    const setInitialLoading = (value) => {
        isLoading.value = value
    }

    const fetchMediaPosts = async (page) => {
        setInitialLoading(true)

        const { items, totalPages: apiTotalPages } = await ApiPosts.getMediaPosts(page)
		
        if (items.length > 0) {
            if (page === 1) {
                posts.value = items
            } else {
                posts.value = [...posts.value, ...items] 
            }  
            currentPage.value = page
            totalPages.value = apiTotalPages
        }

        setInitialLoading(false)
    }

    const fetchNextPostsPage = async () => {
        if (isLoading.value) return

        if (currentPage.value < totalPages.value) {
            await fetchMediaPosts(currentPage.value + 1)
        }
    }


    return {
        posts,
        currentPage,
        totalPages,
        isLoading,
        fetchMediaPosts,
        fetchNextPostsPage,
    }
})