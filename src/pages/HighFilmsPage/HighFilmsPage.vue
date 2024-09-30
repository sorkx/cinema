<script setup>
import {
    MovieLists,
} from '@/widgets/Movie'
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
    CINEMA_NAMES,
} from '@/shared/lib/constants'

const loading = ref(false)

const store = movieModel()
const { 
    films, 
} = storeToRefs(store)

onMounted(async () => {
    loading.value = true
    store.fetchHighPages(CINEMA_NAMES.FILM)
    loading.value = false
})
</script>

<template>
	<MovieLists 
		:movies="films" 
		title="Фильмы с рейтингом 9+" 
		:loading="loading"
	/>
</template>