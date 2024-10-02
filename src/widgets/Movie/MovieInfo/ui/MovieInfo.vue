<script setup>
import {
    MovieDetails,
    movieModel,
} from '@/entities/Movie'
import {
    staffModel,
} from '@/entities/Staff'
import {
    SpinnerLoader,
} from '@/shared/ui/SpinnerLoader'
import {
    storeToRefs,
} from 'pinia'
import {
    computed,
    onMounted,
    ref,
    watch,
} from 'vue'
import { 
    useRoute,
} from 'vue-router'

const route = useRoute()

const staffDetailsStore = staffModel()
const movieDetailsStore = movieModel()

let { 
    selectedMovieDetails,
    similars,
    seasons,
    boxOffice,
} = storeToRefs(movieDetailsStore)

let {
    staff,
} = storeToRefs(staffDetailsStore)

const loading = ref(false)

const productId = computed(() => +route.params.id)

const fetchData = async (id) => {
    const promises = []

    try {
        promises.push(
            movieDetailsStore.fetchMovieDetails(id),
            staffDetailsStore.fetchStaff(id),
            movieDetailsStore.fetchMovieSimilars(id),
            movieDetailsStore.fetchSerialSeasons(id),
            movieDetailsStore.fetchMovieBoxOffice(id),        
        )
        await Promise.all(promises)
    } catch (error) {
        console.error('Ошибка при загрузке данных:', error)
    }
}

watch(
    () => route.params.id,
    (newId, oldId) => {
        if (newId !== oldId) {
            fetchData(+newId)
        }
    }
)

onMounted(async () => {
    loading.value = true
    await fetchData(productId.value)
    loading.value = false
})
</script>

<template>
	<SpinnerLoader v-if="loading" />

	<MovieDetails 
		v-else
		:movie="selectedMovieDetails"
		:staff="staff"
		:similars="similars"
		:seasons="seasons"
		:boxOffice="boxOffice"
	/>
</template>
  
<style src="./style.scss" lang="scss" scoped />