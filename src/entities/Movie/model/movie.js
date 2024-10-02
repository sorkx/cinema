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
    API_URL,
    API_KEY,
} from '@/shared/api'

export const useMovieStore = defineStore('movie', () => {
    const films = ref([])
    const series = ref([])
    const similars = ref([])
    const seasons = ref([])
    const selectedMovieDetails = ref(null)
    const filmsLoaded = ref(false)
    const seriesLoaded = ref(false)
    const totalPages = ref({ [CINEMA_NAMES.FILM]: 0, [CINEMA_NAMES.TV_SERIES]: 0 })

    const fetchDataByCategory = async (category, page = 1, order= null, ratingTo = null) => {
        try {
            let url =`${API_URL}?type=${category}&page=${page}`

            if (order) {
                url +=` &order=${order}`
            }

            if (ratingTo !== null) {
                url += `&ratingTo=${ratingTo}`
            }

            const res = await fetch(url, {
                method: 'GET',
                headers: {
                    'X-API-KEY': API_KEY,
                    'Content-Type': 'application/json',
                },
            })

            if (!res.ok) {
                throw new Error(`Ошибка при загрузке ${category}: ${res.statusText}`)
            }

            const data = await res.json()

            const categoryMapping = {
                [CINEMA_NAMES.FILM]: { data: films, loaded: filmsLoaded },
                [CINEMA_NAMES.TV_SERIES]: { data: series, loaded: seriesLoaded },
            }
  
            const { data: categoryData, loaded } = categoryMapping[category] || {}
  
            if (categoryData && loaded) {
                if (page === 1) {
                    categoryData.value = data.items
                } else {
                    categoryData.value = [...categoryData.value, ...data.items]
                }
                totalPages.value[category] = data.totalPages
                loaded.value = true
            }
        } catch (error) {
            console.error(`Ошибка при загрузке ${category}:`, error)
        }
    }

    // const fetchNextPage = async (category) => {
    //     try {
    //         if (currentPage.value[category] <= totalPages.value[category]) {
    //             await fetchDataByCategory(category, currentPage.value[category])
    //             currentPage.value[category]++
    //         }
    //     } catch (error) {
    //         console.error(`Ошибка при загрузке следующей страницы ${category}:`, error)
    //     } finally {
    //         isLoading.value = false
    //     }
    // }

    // const resetPagination = (category) => {
    //     currentPage.value[category] = 1
    //     if (category === CINEMA_NAMES.FILM) {
    //         films.value = []
    //     } else if (category === CINEMA_NAMES.TV_SERIES) {
    //         series.value = []
    //     }
    // }

    // const initialFetch = async (category) => {
    //     resetPagination(category)
    //     await fetchNextPage(category)
    // }

    const fetchAllPages = async (category, page) => {
        await fetchDataByCategory(category, page)
        const promises = []
        for (let i = 2; i <= totalPages.value[category]; i++) {
            promises.push(fetchDataByCategory(category, i))
        }
        await Promise.all(promises)
    }

    const fetchHighPages = async (category, page) => {
        await fetchDataByCategory(category, page, 'RATING', 9)
        const promises = []
        for (let i = 2; i <= totalPages.value[category]; i++) {
            promises.push(fetchDataByCategory(category, i, 'RATING', 9))
        }
        await Promise.all(promises)
    }

    const fetchAllCategories = async () => {
        const promises = []

        if (!filmsLoaded.value) {
            promises.push(fetchDataByCategory(CINEMA_NAMES.FILM, 1, 'RATING', 9))
        }

        if (!seriesLoaded.value) {
            promises.push(fetchDataByCategory(CINEMA_NAMES.TV_SERIES, 1, 'RATING', 9))
        }

        await Promise.all(promises)
    }

    const fetchMovieDetails = async (id) => {
        try {
            const res = await fetch(`${API_URL}/${id}`, {
                method: 'GET',
                headers: {
                    'X-API-KEY': API_KEY,
                    'Content-Type': 'application/json',
                },
            })
	
            selectedMovieDetails.value = await res.json()
	
            console.log('selectedMovie.value', selectedMovieDetails.value)
        } catch (error) {
            console.error('Error fetching movie details:', error)
        }
    }

    const fetchMovieSimilars = async (id) => {
        try {
            const res = await fetch(`${API_URL}/${id}/similars`, {
                method: 'GET',
                headers: {
                    'X-API-KEY': API_KEY,
                    'Content-Type': 'application/json',
                },
            })
	
            const {
                items,
            } = await res.json()

            similars.value = items
	
            console.log('similars.value', similars.value)
        } catch (error) {
            console.error('Error fetching movie details:', error)
        }
    }

    const fetchSerialSeasons = async (id) => {
        try {
            const res = await fetch(`${API_URL}/${id}/seasons`, {
                method: 'GET',
                headers: {
                    'X-API-KEY': API_KEY,
                    'Content-Type': 'application/json',
                },
            })
	
            const {
                items,
            } = await res.json()

            seasons.value = items
	
            console.log('seasons.value', seasons.value)
        } catch (error) {
            console.error('Error fetching movie details:', error)
        }
    }

    return {
        films,
        series,
        similars,
        seasons,
        // fetchNextPage,
        // initialFetch,
        // resetPagination,
        fetchSerialSeasons,
        fetchMovieSimilars,
        fetchAllPages,
        fetchHighPages,
        fetchAllCategories,
        fetchDataByCategory,
        fetchMovieDetails,
        selectedMovieDetails,
    }

})