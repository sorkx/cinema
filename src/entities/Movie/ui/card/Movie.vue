<script setup>
import {
    onMounted,
    ref,
} from 'vue'
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

const imageLoaded = ref(false)

function onImageLoad() {
    imageLoaded.value = true
}

onMounted(() => {
    if (props.movie.posterUrlPreview) {
        const img = new Image()
        img.onload = onImageLoad
        img.src = props.movie.posterUrlPreview
    }
})
</script>

<template>
	<div class="movie-card">
		<span class="movie-card__image-container">
			<img
				v-if="props.movie.posterUrlPreview && imageLoaded"
				:src="props.movie.posterUrlPreview"
				@load="onImageLoad"
				:alt="movie.nameRu || movie.nameEn"
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