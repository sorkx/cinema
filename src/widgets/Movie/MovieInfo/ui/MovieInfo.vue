<script setup>
import {
    MovieDetails,
    movieModel,
} from '@/entities/Movie'
import {
    staffModel,
} from '@/entities/Staff'
import {
    storeToRefs,
} from 'pinia'
import {
    computed,
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
    trailers,
} = storeToRefs(movieDetailsStore)

let {
    staff,
} = storeToRefs(staffDetailsStore)

const loading = ref(false)

const fetchData = async (id) => {
    loading.value = true

    try {
        await movieDetailsStore.fetchMovieDetails(id)

        const isTvSeries = computed(() => selectedMovieDetails.value.type === 'TV_SERIES').value

        const fetchPromises = [
            staffDetailsStore.fetchStaff(id),
            movieDetailsStore.fetchMovieSimilars(id),
            movieDetailsStore.fetchMovieTrailers(id)
        ]

        if (isTvSeries) {
            fetchPromises.push(movieDetailsStore.fetchSerialSeasons(id))
        }

        await Promise.all(fetchPromises)
    } catch (error) {
        console.error('Ошибка при загрузке данных:', error)
    } finally {
        loading.value = false
    }
}

watch(() => route.params.id, fetchData, { immediate: true })
</script>

<template>
	<MovieDetails 
		:movie="selectedMovieDetails"
		:staff="staff"
		:similars="similars"
		:seasons="seasons"
		:trailers="trailers"
		:loading="loading"
	/>
</template>
  
<style src="./style.scss" lang="scss" scoped />