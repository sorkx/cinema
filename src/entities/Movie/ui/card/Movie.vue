<script setup>
import {
    computed,
} from 'vue'
import {
    UISymbol,
} from '@/shared/ui/UISymbol'
import {
    ROUTE_NAMES,
} from '@/shared/lib/constants'
import {
    RatingDisplay,
} from '@/shared/ui/RatingDisplay'
import {
    useRatings,
} from '@/shared/lib/use/useRatings'

const props = defineProps({
    movie: {
        type: Object,
    },
})

const { ratings } = useRatings(computed(() => props.movie))
</script>

<template>
	<router-link
		:to="{ 
			name: ROUTE_NAMES.CONTENT_DETAILS, 
			params: { 
				type: props.movie.type === 'FILM' ? 'film' : 'serial', 
				id: props.movie.kinopoiskId || props.movie.imdbId,
			} 
		}"
		class="movie"
	>
		<div class="movie__body">
			<UISymbol
					name="vertical"
					class="movie__image" 
					loading="lazy"
			/>
			<div class="movie__overlay">
				<img
					:src="props.movie.posterUrlPreview"
					class="movie__image movie__image--inner" 
					loading="lazy"
				/>
				<div class="movie__content">
					<RatingDisplay 
						v-for="rating in ratings"
						:key="rating.source"
						:rating="rating.value"
						:source="rating.source"
						:class="`movie__${rating.source}`"
						size="small"
					/>
				</div>
			</div>
		</div>
		<div class="movie__title">
			{{ props.movie.nameRu || props.movie.nameOriginal }}
		</div>
	</router-link>
</template>

<style src="./style.scss" lang="scss" scoped />

<!-- <div class="card-info">
	<div class="card-name">
		{{ props.movie.nameRu || props.movie.nameEn }}
	</div>
	<div class="card-genre">
		{{ props.movie.genre }}
	</div>
	<div>
		{{ props.movie.ratingImdb || props.movie.ratingKinopoisk }}
	</div>
</div> -->