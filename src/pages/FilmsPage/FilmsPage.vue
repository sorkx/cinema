<script setup>
import {
    MovieLists,
} from '@/widgets/Movie'
import {
    storeToRefs,
} from 'pinia'
import { 
    movieModel,
} from '@/entities/Movie'
import {
    CINEMA_NAMES,
} from '@/shared/lib/constants'
import { 
    onMounted,
    ref,
} from 'vue'

const loading = ref(false)

const store = movieModel()
const { 
    films,
} = storeToRefs(store)

onMounted(async () => {
    loading.value = true
    await store.fetchAllPages(CINEMA_NAMES.FILM)
    loading.value = false
})

</script>

<template>
	<MovieLists 
		:movies="films"
		title="Фильмы"
		:loading="loading"
	/>
</template>