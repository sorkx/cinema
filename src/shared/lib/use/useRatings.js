import { 
    computed,
} from 'vue'

export function useRatings(movie) {
    const ratings = computed(() => {

        const result = []

        if (movie.value?.ratingImdb) {
            result.push({
                value: movie.value?.ratingImdb,
                source: 'imdb'
            })
        }
	
        if (movie.value?.ratingKinopoisk) {
            result.push({
                value: movie.value?.ratingKinopoisk,
                source: 'movie'
            })
        }
	
        return result
    })

    return { ratings }
}
