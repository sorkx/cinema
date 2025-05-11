<script setup>
import {
    computed
} from 'vue'
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
import {
    MovieCardHover
} from '@/entities/Movie/ui/card/ui/MovieCardHover'
import {
    useHover
} from '@/shared/lib/use/useHover'

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
    },
    ratingKinopoisk: {
        type: [String, Number],
        default: '',
    },
    ratingImdb: {
        type: [String, Number],
        default: '',
    },
    type: {
        type: String,
        default: '',
    },
    year: {
        type: String,
        default: '',
    },
    genres: {
        type: Array,
        default: () => [],
    },
    countries: {
        type: Array,
        default: () => [],
    },
    ratingAgeLimits: {
        type: String,
        default: '',
    },
    removeHoverPopup: {
        type: Boolean,
        default: false
    }
})

const favoriteStore = favoritesModel()

const { 
    imageLoaded, 
    imageSrc, 
    isLoading, 
    imageRef
} = useImageLoader(props.posterUrlPreview)

const modifiedRating = computed(() => {
    let rating
    
    if (props.ratingKinopoisk) {
        rating = props.ratingKinopoisk
    } else if (props.ratingImdb) {
        rating = props.ratingImdb
    } else {
        return 0
    }

    const isInteger = Number.isInteger(Number(rating))

    if (isInteger) {
        // return `${rating}.0`
				 return rating
    } else {
        return String(rating)
    }
})

const emit = defineEmits(['on-card-click'])

const { isVisible, hover, blur, coordinates } = useHover(0, props.removeHoverPopup);
</script>

<template>
	<div
		class="movie-card"
		@mouseover="hover"
    @mouseleave="blur(false)" 
		@click="emit('on-card-click')"
	>
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
			<div class="movie-card__info-row">
				<div class="movie-card__rating">
					{{ modifiedRating }}
				</div>
				<p class="movie-card__title">
					{{ props.nameRu || props.nameOriginal }}
				</p>
			</div>
			<span class="movie-card__source">
				Кинопоиск
			</span>
		</div>
	</div>
	<Transition name="bounce">
		<Teleport to="body">
			<MovieCardHover 
				@hide="blur(true)" 
				v-if="isVisible" 
				:name-ru="props.nameRu"
				:name-en="props.nameEn"
				:kinopoisk-id="props.kinopoiskId"
				:imdb-id="props.imdbId"
				:rating-imdb="props.ratingImdb"
				:rating-kinopoisk="props.ratingKinopoisk"
				:year="props.year"
				:genres="props.genres"
				:countries="props.countries"
				:type="props.type"
				:rating-age-limits="props.ratingAgeLimits"
				:coordinates="coordinates" 
			/>
		</Teleport>
	</Transition>
	<Teleport to="body">
    <div 
			v-if="isVisible" 
			@mousemove="blur(true)" 
			class="movie-card-holder" 
		/>
  </Teleport>
</template>

<style src="./styles.scss" lang="scss" scoped />