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
} from '@/shared/ui/loaders'
import {
    storeToRefs,
} from 'pinia'
import {
    computed,
    // onMounted,
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
            movieDetailsStore.fetchMovieBoxOffice(id),
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
	<SpinnerLoader v-if="loading" />

	<MovieDetails 
		v-else
		:movie="selectedMovieDetails"
		:staff="staff"
		:similars="similars"
		:seasons="seasons"
		:boxOffice="boxOffice"
		:trailers="trailers"
	/>
</template>
  
<style src="./style.scss" lang="scss" scoped />