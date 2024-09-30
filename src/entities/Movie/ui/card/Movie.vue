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
} from '@/shared/ui/Ratings'
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
				type: 'movie', 
				id: props.movie.kinopoiskId || props.movie.imdbId || props.movie.filmId,
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

<style src="./styles.scss" lang="scss" scoped />