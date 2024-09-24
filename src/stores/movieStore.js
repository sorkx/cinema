import { 
    defineStore, 
} from 'pinia'
import {
    ref,
} from 'vue'

export const useMovieStore = defineStore('movie', () => {
    const cards = ref([])
    const selectedMovie = ref(null)
    const isMovieDetailsOpen = ref(false)

    const fetchData = async () => {
        const res = await fetch('https://kinopoiskapiunofficial.tech/api/v2.2/films?type=FILM&page=1&order=RATING', {
            method: 'GET',
            headers: {
                'X-API-KEY': import.meta.env.VITE_API_KEY,
                'Content-Type': 'application/json',
            },
        })
	
        const { 
            items,
        } = await res.json()
	
        cards.value = items.map((item) => ({
            ...item,
            genre: item.genres.map(genre => genre.genre).join(', ')
			   }))
	
    }

    const openMovieDetails = async (id) => {
        try {
            const res = await fetch(`https://kinopoiskapiunofficial.tech/api/v2.2/films/${id}`, {
                method: 'GET',
                headers: {
                    'X-API-KEY': import.meta.env.VITE_API_KEY,
                    'Content-Type': 'application/json',
                },
            })
	
            selectedMovie.value = await res.json()
	
            isMovieDetailsOpen.value = true
	
            console.log('selectedMovie.value', selectedMovie.value)
        } catch (error) {
            console.error('Error fetching movie details:', error)
        }
    }

    const closeMovieDetails = () => {
        isMovieDetailsOpen.value = false
        selectedMovie.value = null
    }

    return {
        cards,
        selectedMovie,
        isMovieDetailsOpen,
        fetchData,
        openMovieDetails,
        closeMovieDetails
    }

})