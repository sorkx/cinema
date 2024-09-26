<script setup>
import {
    storeToRefs,
} from 'pinia'
import {
    onMounted,
	ref,
} from 'vue'
import { 
    movieModel,
} from '@/entities/Movie'
import {
    MovieLists,
} from '@/widgets/Movie/MovieLists'

const isLoading = ref(false)

const movieStore = movieModel()
const { 
    movies, 
} = storeToRefs(movieStore)

const fetchMovies = () => {
    isLoading.value = true
    movieStore.fetchMoviesData()
    isLoading.value = false
}

onMounted(async () => {
    await fetchMovies()
})
</script>


<template>
    <div class="main-page content-container">
        <div class="main-page--wrapper">
            <div class="main-page--section">
                <MovieLists 
					:movies="movies"
					:is-loading="isLoading"
				/>
            </div>
        </div>
    </div>
</template>

