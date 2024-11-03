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
        default: () => {},
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
    }
})

const trailersFilter = computed(() => props.trailers.filter(trailer => trailer.site === 'YOUTUBE' && trailer.name.includes('Трейлер')))
</script>

<template>
	<template v-if="props.movie"> 
		<MovieHeader 
			:item="props.movie"
			:trailers="trailersFilter" 
		/>
		<MovieSeries
			v-if="props.movie.type === 'TV_SERIES' && props.seasons.length" 
			:items="props.seasons"
		/>
		<MovieDescription :item="props.movie" />
		<MovieTrailers 
			v-if="trailersFilter.length > 0" 
			:items="trailersFilter"
		/>
		<MovieCrew
			v-if="props.staff.length > 0" 
			:item="props.staff" 
		/>
		<MovieRelated 
			v-if="props.similars.length > 0" 
			:items="props.similars"
		/>
	</template>
</template>
  
<style src="./styles.scss" lang="scss" scoped />