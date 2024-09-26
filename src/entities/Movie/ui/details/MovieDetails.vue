<script setup>
import {
    UISymbol,
} from '@/shared/ui/UISymbol'

const props = defineProps({
    movie: {
        type: Object,
    }
})
</script>

<template>
	<div v-if="props.movie" class="movie-details">
		<h2>{{ props.movie?.nameRu || props.movie?.nameEn }}</h2>
		<img :src="props.movie?.coverUrl" alt="Movie poster" />
		<p>{{ props.movie?.description }}</p>
		<UISymbol
			name="imdb"
			:value="props.movie?.ratingImdb"
		/>
		<UISymbol
			name="movie"
			:value="props.movie?.ratingKinopoisk"
		/>
	</div>
</template>
  
<style src="./style.scss" lang="scss" scoped />