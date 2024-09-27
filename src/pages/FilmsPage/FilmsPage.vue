<script setup>
import {
    MovieLists,
} from '@/widgets/Movie/MovieLists'
import {
    storeToRefs,
} from 'pinia'
import {
    onMounted,
} from 'vue'
import { 
    movieModel,
} from '@/entities/Movie'
import {
    CINEMA_NAMES,
} from '@/shared/lib/constants'

const store = movieModel()
const { 
    films, 
} = storeToRefs(store)

onMounted(async () => {
    store.fetchAllPages(CINEMA_NAMES.FILM)
})
</script>

<template>
	<MovieLists :movies="films" />
</template>