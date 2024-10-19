<script setup>
import {
    UISymbol,
} from '@/shared/ui/UISymbol'
import {
    ROUTE_NAMES,
} from '@/shared/lib/constants'

const props = defineProps({
    movie: {
        type: Object,
        default: () => {},
    },
})
</script>

<template>
	<div class="movie-card">
		<span class="movie-card__image-container">
			<img
				v-if="props.movie.posterUrlPreview"
				:src="props.movie.posterUrlPreview"
				loading="eager"
				:alt="movie.nameRu || movie.nameEn"
				class="movie-card__image movie__image--inner"
			/>
			<span v-else>
				<UISymbol
					name="vertical"
					class="movie-card__image" 
					loading="eager"
				/>
			</span>
		</span>
		
		<router-link
			:to="{ 
				name: ROUTE_NAMES.CONTENT_DETAILS, 
				params: { 
					type: 'movie', 
					id: props.movie.kinopoiskId || props.movie.imdbId || props.movie.filmId,
				} 
			}"
			class="movie-card__overlay"
		/>
		<div class="movie-card__info">
			<p class="movie-card__title">
				{{ props.movie.nameRu || props.movie.nameOriginal }}
			</p>
		</div>
	</div>
</template>

<style src="./styles.scss" lang="scss" scoped />