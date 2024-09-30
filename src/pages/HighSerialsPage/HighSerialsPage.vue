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
    series,
} = storeToRefs(store)

onMounted(async () => {
    await store.fetchHighPages(CINEMA_NAMES.TV_SERIES)
})

</script>

<template>
	<MovieLists 
		:movies="series"
		title="Сериалы с рейтингом 9+" 
	/>
</template>