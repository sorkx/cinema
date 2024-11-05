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
    MovieCategoryRow,
} from '@/widgets/Movie'
import {
    CINEMA_NAMES,
} from '@/shared/lib/constants'

const isLoading = ref(true)

const movieStore = movieModel()

const { 
    state, 
} = storeToRefs(movieStore)

const fetchData = async () => {
    isLoading.value = true

    await movieStore.fetchCollectionData(CINEMA_NAMES.TOP_POPULAR_ALL, 1),
	
    isLoading.value = false
}

onMounted(async () => await fetchData())
</script>

<template>
	<MovieCategoryRow 
		:items="state.collections.TOP_POPULAR_ALL?.data"
		:loading="isLoading"
		title="Популярное"
		to="browse/popular"
		class="popular"
	/>
</template>

<style src="./styles.scss" lang="scss" scoped />