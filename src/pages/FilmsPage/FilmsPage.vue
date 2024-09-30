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
} from 'vue'

const store = movieModel()
const { 
    films,
} = storeToRefs(store)

onMounted(async () => {
    await store.fetchAllPages(CINEMA_NAMES.FILM)
})

</script>

<template>
	<MovieLists 
		:movies="films"
		title="Фильмы"
	/>
</template>