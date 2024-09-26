<script setup>
import {
    MovieDetails,
    movieModel,
} from '@/entities/Movie'
import {
    storeToRefs,
} from 'pinia'
import {
    computed,
    onMounted,
	onBeforeMount,
	ref,
} from 'vue'
import { 
    useRoute,
} from 'vue-router'

const route = useRoute()

const movieDetailsStore = movieModel()
let { 
    selectedMovieDetails, 
} = storeToRefs(movieDetailsStore)

const loading = ref(false)

const productId = computed(() => +route.params.id)

console.log('productId', productId.value)

const fetchMovieDetails = async () => {
    loading.value = true
    await movieDetailsStore.fetchMovieDetails(productId.value)
    loading.value = false
    console.log('selectedMovie', selectedMovieDetails)
}

onBeforeMount(async () => {
    await fetchMovieDetails()
})

</script>

<template>
	<div v-if="loading">
		Loading...
	</div>
	<MovieDetails 
		v-else
		:movie="selectedMovieDetails"
	/>
</template>
  
<style src="./style.scss" lang="scss" scoped />