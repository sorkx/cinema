import { 
    defineStore, 
} from 'pinia'
import {
    ref,
} from 'vue'

export const useMovieStore = defineStore('movie', () => {
    const movies = ref([])
    const selectedMovieDetails = ref(null)

    const fetchMoviesData = async () => {
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
	
        movies.value = items.map((item) => ({
            ...item,
            genre: item.genres.map(genre => genre.genre).join(', ')
        }))

        console.log('movies.value', movies.value)
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
        movies,
        fetchMoviesData,
        fetchMovieDetails,
        selectedMovieDetails,
    }

})