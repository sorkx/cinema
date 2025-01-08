<script setup>
import {
    ROUTE_NAMES,
} from '@/shared/lib/constants'
import { 
    useImageLoader,
} from '@/shared/lib/use/useImageLoader'
import {
    VLoader,
} from '@/shared/ui/VLoader'
import {
    UISymbol,
} from '@/shared/ui/UISymbol'
import {
    favoritesModel,
} from '@/entities/Favorites'

const props = defineProps({
    nameRu: {
        type: String,
        default: '',
    },
    nameEn: {
        type: String,
        default: '',
    },
    kinopoiskId: {
        type: [String, Number],
        default: '',
    },
    filmId: {
        type: [String, Number],
        default: '',
    },
    imdbId: {
        type: [String, Number],
        default: '',
    },
    nameOriginal: {
        type: String,
        default: '',
    },
    posterUrlPreview: {
        type: String,
        default: '',
    }
})

const favoriteStore = favoritesModel()

const { 
    imageLoaded, 
    imageSrc, 
    isLoading, 
    imageRef
} = useImageLoader(props.posterUrlPreview)
</script>

<template>
	<div class="movie-card">
		<span
			ref="imageRef" 
			class="movie-card__image-container"
		>
			<img
				v-if="!isLoading && imageLoaded"
				:src="imageSrc"
				:alt="props.nameRu || props.nameEn"
				loading="eager"
				transition="fade"
				transitionall="true"
				class="movie-card__image movie__image--inner"
			/>
			<VLoader 
				v-else
				class="movie-card__image"
				modificator="movie"
				data-size="middle"
				data-media="small"
				:logo-loader="true"
			/>
		</span>
		
		<router-link
			:to="{ 
				name: ROUTE_NAMES.CONTENT_DETAILS, 
				params: { 
					type: 'movie', 
					id: props.kinopoiskId || props.imdbId || props.filmId,
				} 
			}"
			class="movie-card__overlay"
		/>
			<button 
				v-if="favoriteStore.isFavorite(props.kinopoiskId)"
				@click="favoriteStore.removeFromFavorites(props.kinopoiskId)" 
				class="movie-card__remove"
			>
				<UISymbol name="cross" />
			</button>
		<div class="movie-card__info">
			<p class="movie-card__title">
				{{ props.nameRu || props.nameOriginal }}
			</p>
		</div>
	</div>
</template>

<style src="./styles.scss" lang="scss" scoped />