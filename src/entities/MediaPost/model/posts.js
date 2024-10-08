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

    const fetchMediaPosts = async (page) => {
        isLoading.value = true

        const { items, totalPages: apiTotalPages } = await ApiPosts.getMediaPosts(page)
		
        if (Array.isArray(items) && items.length > 0) {
            posts.value.push(...items)   
            currentPage.value = page
            totalPages.value = apiTotalPages
        }

        isLoading.value = false
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