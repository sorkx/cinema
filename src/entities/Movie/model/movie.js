import { 
    defineStore, 
} from 'pinia'
import {
    ref,
    reactive
} from 'vue'
import {
    CINEMA_NAMES,
} from '@/shared/lib/constants'
import {
    Api,
} from '../api'

export const useMovieStore = defineStore('movie', () => {
    const similars = ref([])
    const seasons = ref([])
    const boxOffice = ref([])
    const trailers = ref([])
    const genresMovie = ref([])
    const isLoading = ref(false)
    const selectedMovieDetails = ref(null)
    const state = reactive({
        categories: {},
        collections: {},
    })

    const setInitialLoading = (value) => {
        isLoading.value = value
    }

    const fetchData = async (type, category, page, apiFunction) => {
        setInitialLoading(true)

        const target = state[type]
	
        const { items, totalPages } = await apiFunction(category, page)
	
        if (!target[category]) {
            target[category] = {
                data: [],
                pagination: { current: 1, total: 1 },
            }
        }
	
        if (page === 1) {
            target[category].data = items
        } else {
            target[category].data = [...target[category].data, ...items]
        }

        target[category].pagination.current = page
        target[category].pagination.total = totalPages

        console.log('state', state)

        setInitialLoading(false)
    }

    const fetchNextPage = async (type, category, apiFunction) => {
        if (isLoading.value) return
	
        const target = state[type][category]
        if (!target) {
            console.warn(`No data found for ${type} with category ${category}`);
            return
        }
	
        if (target.pagination.current < target.pagination.total) {
            await fetchData(type, category, target.pagination.current + 1, apiFunction)
        }
    }

    const fetchCategoryData = async (category, page = 1, genres, ratingTo, yearTo, order) => {
        await fetchData('categories', category, page, (category, page) => 
            Api.getCategories(category, page, genres, ratingTo, yearTo, order)
		  )
    }
	
    const fetchCategoryNextPage = async (category, genres, ratingTo, yearFrom, order) => {
        await fetchNextPage('categories', category, (category, page) => 
		  Api.getCategories(category, page, genres, ratingTo, yearFrom, order)
        )
    }
	
	
    const fetchCollectionData = async (category, page = 1) => {
        await fetchData('collections', category, page, Api.getMovieCollections)
    }

    const fetchCollectionNextPage = async (category) => {
        await fetchNextPage('collections', category, Api.getMovieCollections)
    }	

    const fetchAllCategories = async () => {
        await Promise.all([
            fetchCollectionData(CINEMA_NAMES.TOP_POPULAR_ALL, 1),
            fetchCollectionData(CINEMA_NAMES.TOP_250_MOVIES, 1),
            fetchCollectionData(CINEMA_NAMES.TOP_250_TV_SHOWS, 1),
        ])
    }

    const fetchMovieDetails = async (id) => {
        const data = await Api.getMovieDetails(id)
        selectedMovieDetails.value = data
    }

    const fetchMovieSimilars = async (id) => {
        const data = await Api.getMovieSimilars(id)
        similars.value = data
    }

    const fetchSerialSeasons = async (id) => {
        const data = await Api.getSerialSeasons(id)
        seasons.value = data
    }

    const fetchMovieBoxOffice = async (id) => {
        const data = await Api.getMovieBoxOffice(id)
        boxOffice.value = data
    }

    const fetchMovieTrailers = async (id) => {
        const data = await Api.getMovieTrailers(id)
        trailers.value = data
    }

    const fetchMovieFilters = async () => {
        const { genres } = await Api.getMovieFilters()

        genresMovie.value = genres.filter(genre => genre.id <= 24)
    }

    return {
        similars,
        seasons,
        boxOffice,
        trailers,
        genresMovie,
        state,
        isLoading,
        fetchMovieFilters,
        fetchCategoryData,
        fetchCategoryNextPage,
        fetchCollectionNextPage,
        fetchCollectionData,
        fetchNextPage,
        fetchMovieTrailers,
        fetchMovieBoxOffice,
        fetchSerialSeasons,
        fetchMovieSimilars,
        fetchAllCategories,
        fetchMovieDetails,
        selectedMovieDetails,
    }

})