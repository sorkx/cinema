import { 
    defineStore, 
} from 'pinia'
import {
    ref,
} from 'vue'
import {
    CINEMA_NAMES,
} from '@/shared/constants'

export const useMovieStore = defineStore('movie', () => {
    const films = ref([])
    const series = ref([])
    const selectedMovieDetails = ref(null)
    const filmsLoaded = ref(false)
    const seriesLoaded = ref(false)

    const fetchDataByCategory = async (category) => {
        try {
            const res = await fetch(`https://kinopoiskapiunofficial.tech/api/v2.2/films?type=${category}&page=1`, {
                method: 'GET',
                headers: {
                    'X-API-KEY': import.meta.env.VITE_API_KEY,
                    'Content-Type': 'application/json',
                },
            })

            if (!res.ok) {
                throw new Error(`Ошибка при загрузке ${category}: ${res.statusText}`)
            }

            const { 
                items
			 } = await res.json()

			 const categoryMapping = {
                [CINEMA_NAMES.FILM]: { data: films, loaded: filmsLoaded },
                [CINEMA_NAMES.TV_SERIES]: { data: series, loaded: seriesLoaded },
            }
	
            const { data, loaded } = categoryMapping[category] || {}
	
            if (data && loaded) {
                data.value = items.map((item) => {
                    const slug = item.nameOriginal || item.nameRu

                    return {
                        ...item,
                        slug: slug.toLowerCase().split(' ').join('').replace(/[:.'",-]/g, '')
                    }
                })
                loaded.value = true

                console.log('data.value', data.value)
            }
        } catch (error) {
            console.error(`Ошибка при загрузке ${category}:`, error)
        }
    }

    const fetchAllCategories = async () => {
        const promises = []

        if (!filmsLoaded.value) {
            promises.push(fetchDataByCategory(CINEMA_NAMES.FILM))
        }

        if (!seriesLoaded.value) {
            promises.push(fetchDataByCategory(CINEMA_NAMES.TV_SERIES))
        }

        await Promise.all(promises)
    }

    const fetchMovieDetails = async (id) => {
        try {
            const res = await fetch(`https://kinopoiskapiunofficial.tech/api/v2.2/films/${id}`, {
                method: 'GET',
                headers: {
                    'X-API-KEY': import.meta.env.VITE_API_KEY,
                    'Content-Type': 'application/json',
                },
            })
	
            selectedMovieDetails.value = await res.json()
	
            console.log('selectedMovie.value', selectedMovieDetails.value)
        } catch (error) {
            console.error('Error fetching movie details:', error)
        }
    }

    return {
        films,
        series,
        fetchAllCategories,
        fetchDataByCategory,
        fetchMovieDetails,
        selectedMovieDetails,
    }

})