<script setup>
import {
    UISymbol,
} from '@/shared/ui/UISymbol'
import {
    ROUTE_NAMES,
} from '@/shared/lib/constants'
import { 
    useImageLoader,
} from '@/shared/lib/use/useImageLoader'

const props = defineProps({
    movie: {
        type: Object,
        default: () => {},
    },
    resize: {
        type: Boolean,
        default: false
    }
})

const { 
    imageLoaded, 
    imageSrc, 
    isLoading, 
    imageRef
} = useImageLoader(props.movie.posterUrlPreview)
</script>

<template>
	<div 
		class="movie-card"
		:class="{ 'resize': props.resize }"
	>
		<span
			ref="imageRef" 
			class="movie-card__image-container"
		>
			<img
				v-if="!isLoading && imageLoaded"
				:src="imageSrc"
				:alt="props.movie.nameRu || props.movie.nameEn"
				loading="eager"
				transition="fade"
				transitionall="true"
				class="movie-card__image movie__image--inner"
			/>
			<div
				v-else 
				class="loader loader--movie movie__card-image"
			>
				<div class="logo loader-logo">
					<UISymbol 
						name="logo"
					/>
				</div>
			</div>
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