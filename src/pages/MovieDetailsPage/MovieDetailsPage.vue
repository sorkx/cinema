<script setup>
import {
    MovieDetails,
} from '@/entities/MovieDetails'
import { 
    movieModel, 
} from '@/entities/Movie/model'
import {
    storeToRefs,
} from 'pinia'

const movieStore = movieModel()
const { 
    cards, 
    isMovieDetailsOpen, 
    selectedMovie, 
} = storeToRefs(movieStore)

const fetchMovies = () => {
    movieStore.fetchData()
}
</script>

<template>
	<MovieDetails 
		v-if="selectedMovie" 
		:movie-details="selectedMovie" 
	/>
</template>