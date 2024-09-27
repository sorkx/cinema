<script setup>
import {
    RatingDisplay,
} from '@/shared/ui/RatingDisplay'
import {
    useRatings,
} from '@/shared/lib/use/useRatings'
import {
    computed,
} from 'vue'

const props = defineProps({
    movie: {
        type: Object,
    }
})

const { ratings } = useRatings(computed(() => props.movie))
</script>

<template>
	<div v-if="props.movie" class="movie-details">
		<h2>{{ props.movie?.nameRu || props.movie?.nameEn }}</h2>
		<img :src="props.movie?.coverUrl" alt="Movie poster" />
		<p>{{ props.movie?.description }}</p>
		<div class="movie__head--ratings">
			<RatingDisplay 
				v-for="rating in ratings"
				:key="rating.source"
				:rating="rating.value"
				:source="rating.source"
			/>
		</div>
	</div>
</template>
  
<style src="./style.scss" lang="scss" scoped />