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
    series,
} = storeToRefs(store)

onMounted(async () => {
    loading.value = true
    await store.fetchHighPages(CINEMA_NAMES.TV_SERIES)
    loading.value = false
})

</script>

<template>
	<MovieLists 
		:movies="series"
		title="Сериалы с рейтингом 9+" 
		:loading="loading"
	/>
</template>