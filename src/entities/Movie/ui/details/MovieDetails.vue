<script setup>
import {
    computed,
} from 'vue'
import {
    MovieHeader,
    MovieDescription,
    MovieSeries,
    MovieCrew,
    MovieRelated,
    MovieTrailers,
} from './ui'

const props = defineProps({
    movie: {
        type: Object,
        default: () => ({}),
    },
    staff: {
        type: Array,
        default: () => [],
    },
    similars: {
        type: Array,
        default: () => [],
    },
    seasons: {
        type: Array,
        default: () => [],
    },
    trailers: {
        type: Array,
        default: () => [],
    },
    id: {
        type: String,
        default: '',
    },
    type: {
        type: String,
        default: '',
    },
    loading: {
        type: Boolean,
        default: false
    }
})

const trailersFilter = computed(() => props.trailers.filter(trailer => trailer.site === 'YOUTUBE' && trailer.name.includes('Трейлер')))
</script>

<template>
	<template v-if="props.movie"> 
		<MovieHeader 
			:item="props.movie"
			:trailers="trailersFilter"
			:loading="props.loading" 
		/>
		<MovieSeries
			v-if="props.movie.type === 'TV_SERIES' && props.seasons.length" 
			:items="props.seasons"
			:loading="props.loading"
		/>
		<MovieDescription
			:genres="props.movie.genres"
			:description="props.movie.description"
			:rating-kinopoisk="props.movie.ratingKinopoisk"
			:rating-imdb="props.movie.ratingImdb" 
			:loading="props.loading"  
		/>
		<MovieTrailers 
			v-if="trailersFilter.length > 0" 
			:items="trailersFilter"
			:loading="props.loading" 
		/>
		<MovieCrew
			v-if="props.staff.length > 0" 
			:staff="props.staff"
			:loading="props.loading"  
		/>
		<MovieRelated 
			v-if="props.similars.length > 0" 
			:items="props.similars"
			:loading="props.loading"  
		/>
	</template>
</template>
  
<style src="./styles.scss" lang="scss" scoped />