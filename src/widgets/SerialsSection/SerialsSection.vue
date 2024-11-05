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

    await movieStore.fetchCategoryData(CINEMA_NAMES.TV_SERIES, 1),
	
    isLoading.value = false
}

onMounted(async () => await fetchData())
</script>

<template>
	<MovieCategoryRow 
		:items="state.categories.TV_SERIES?.data"
		:loading="isLoading"
		title="Сериалы"
		to="browse/serials"
		class="series"
	/>
</template>

<style src="./styles.scss" lang="scss" scoped />