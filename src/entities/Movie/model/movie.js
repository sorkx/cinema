import { 
    defineStore, 
} from 'pinia'
import {
    ref,
} from 'vue'
import {
    CINEMA_NAMES,
} from '@/shared/lib/constants'
import {
    Api,
} from '../api'

export const useMovieStore = defineStore('movie', () => {
    const films = ref([])
    const series = ref([])
    const similars = ref([])
    const seasons = ref([])
    const boxOffice = ref([])
    const trailers = ref([])
    const isLoading = ref(false)
    const selectedMovieDetails = ref(null)
    const totalPages = ref({ [CINEMA_NAMES.FILM]: 1, [CINEMA_NAMES.TV_SERIES]: 1 })
    const currentPage = ref({ [CINEMA_NAMES.FILM]: 1, [CINEMA_NAMES.TV_SERIES]: 1 })
	
    const fetchDataByCategory = async (category, page) => {
        // if (isLoading.value) return

        // isLoading.value = true

        const data = await Api.getCategories(category, page)

        const categoryMapping = {
            [CINEMA_NAMES.FILM]: { data: films },
            [CINEMA_NAMES.TV_SERIES]: { data: series },
        }
  
        const { data: categoryData } = categoryMapping[category] || {}
  
        if (categoryData) {
            if (page === 1) {
                categoryData.value = data.items
            } else {
                categoryData.value = [...categoryData.value, ...data.items]
            }
            totalPages.value[category] = data.totalPages
            currentPage.value[category] = page
        }

        // isLoading.value = false
    }

    const fetchNextPage = async (category) => {
        if (isLoading.value) return

        if (currentPage.value[category] < totalPages.value[category]) {
            isLoading.value = true
            await fetchDataByCategory(category, currentPage.value[category] + 1)	
            isLoading.value = false
        }
    }

    const fetchAllCategories = async () => {
        await Promise.all([
            fetchDataByCategory(CINEMA_NAMES.FILM, 1),
            fetchDataByCategory(CINEMA_NAMES.TV_SERIES, 1),
        ])
    }

    const fetchMovieDetails = async (id) => {
        const data = await Api.getMovieDetails(id)
        selectedMovieDetails.value = data
	
        console.log('selectedMovie.value', selectedMovieDetails.value)
    }

    const fetchMovieSimilars = async (id) => {
        const data = await Api.getMovieSimilars(id)
        similars.value = data
	
        console.log('similars.value', similars.value)
    }

    const fetchSerialSeasons = async (id) => {
        const data = await Api.getSerialSeasons(id)
        seasons.value = data
	
        console.log('seasons.value', seasons.value)
    }

    const fetchMovieBoxOffice = async (id) => {
        const data = await Api.getMovieBoxOffice(id)
        boxOffice.value = data
	
        console.log('boxOffice.value', boxOffice.value)
    }

    const fetchMovieTrailers = async (id) => {
        const data = await Api.getMovieTrailers(id)
        trailers.value = data
	
        console.log('trailers.value', trailers.value)
    }

    return {
        films,
        series,
        similars,
        seasons,
        boxOffice,
        trailers,
        totalPages,
        currentPage,
        isLoading,
        fetchNextPage,
        fetchMovieTrailers,
        fetchMovieBoxOffice,
        fetchSerialSeasons,
        fetchMovieSimilars,
        fetchAllCategories,
        fetchDataByCategory,
        fetchMovieDetails,
        selectedMovieDetails,
    }

})