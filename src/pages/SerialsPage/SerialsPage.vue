<script setup>
import {
    MovieLists,
} from '@/widgets/Movie/MovieLists'
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
    series,
} = storeToRefs(store)

onMounted(async () => {
    await store.fetchAllPages(CINEMA_NAMES.TV_SERIES)
})

</script>

<template>
	<MovieLists 
		:movies="series"
		title="Сериалы"
	/>
</template>