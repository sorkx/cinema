import { 
    defineStore, 
} from 'pinia'
import {
    ref,
    onMounted,
} from 'vue'

export const useFavoritesStore = defineStore('favorites', () => {
    const favorites = ref([])

    const addToFavorites = (movie) => {
        if (!favorites.value.some(m => m.id === movie.kinopoiskId)) {
            favorites.value = [...favorites.value, movie]
            localStorage.setItem('favorites', JSON.stringify(favorites.value))
        }
    }

    const removeFromFavorites = (movieId) => {
        favorites.value = favorites.value.filter(movie => movie.kinopoiskId !== movieId)
        localStorage.setItem('favorites', JSON.stringify(favorites.value))
    }

    const isFavorite = (movieId) => favorites.value.some(movie => movie.kinopoiskId === movieId)

    const loadFavorites = () => {
        const saved = localStorage.getItem('favorites')

        if (saved) {
            favorites.value = JSON.parse(saved)
        }
    }

    onMounted(() => {
        loadFavorites()
    })

    return {
        favorites,
        addToFavorites,
        removeFromFavorites,
        isFavorite,
        loadFavorites
    }
})