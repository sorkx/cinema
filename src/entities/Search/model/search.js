import { 
    defineStore, 
} from 'pinia'
import {
    ref,
} from 'vue'
import {
    ApiSearch,
} from '../api'

export const useSearchStore = defineStore('search', () => {
    const keywordMovies = ref([])
    const searchMovies = ref([])
    const searchCount = ref([])
    const currentPage = ref(1)	
    const isLoading = ref(false)

    const fetchKeywordMovie = async (word, page = 1) => {
        isLoading.value = true

        const { films, pagesCount } = await ApiSearch.searchByKeyword(word, page)

        if (films.length > 0) {
            if (page === 1) {
                searchMovies.value = films
            } else {
                searchMovies.value = [...searchMovies.value, ...films]
            }
            searchCount.value = pagesCount
            keywordMovies.value = word
            currentPage.value = page
        }
	

        isLoading.value = false
    }

    const fetchNextPageMovies = async (keyword) => {
        if (isLoading.value) return

        if (currentPage.value < searchCount.value) {
            await fetchKeywordMovie(keyword, currentPage.value + 1)
        }
    }

    const resetSearch = () => {
        searchMovies.value = []
        searchCount.value = 0
        currentPage.value = 1
        keywordMovies.value = ''
    }

    return {
        keywordMovies,
        searchCount,
        searchMovies,
        currentPage,
        isLoading,
        fetchKeywordMovie,
        fetchNextPageMovies,
        resetSearch,
    }
})