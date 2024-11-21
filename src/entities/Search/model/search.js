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
    const keywordMovies = ref('')
    const searchMovies = ref([])
    const searchCount = ref(null)
    const searchMoviesResult = ref(null)
    const currentPage = ref(1)	
    const isLoading = ref(false)

    const fetchKeywordMovie = async (page = 1) => {
        isLoading.value = true
	
        const { films, pagesCount, searchFilmsCountResult, keyword } = await ApiSearch.searchByKeyword(keywordMovies.value, page)
	
        if (page === 1) {
            searchMovies.value = films
        } else {
            searchMovies.value = [...searchMovies.value, ...films]
        }
        searchCount.value = pagesCount
        searchMoviesResult.value = searchFilmsCountResult
        keywordMovies.value = keyword
        currentPage.value = page
	
        isLoading.value = false
    }

    const fetchNextPageMovies = async () => {
        if (isLoading.value) return

        if (currentPage.value < searchCount.value) {
            await fetchKeywordMovie(currentPage.value + 1)
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
        searchMoviesResult,
    }
})