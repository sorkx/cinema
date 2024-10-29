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

const imageRef = ref(null)
const imageSrc = ref('')
const imageLoaded = ref(false)
const isLoading = ref(true)

onMounted(() => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && props.movie.posterUrlPreview) {
                const img = new Image()
                img.src = props.movie.posterUrlPreview
                img.onload = () => {
                    imageSrc.value = props.movie.posterUrlPreview
                    imageLoaded.value = true
                    isLoading.value = false
                }
                img.onerror = () => {
                    isLoading.value = false
                }
                observer.disconnect()
            }
        });
    }, {
        threshold: 0.1
    })

    if (imageRef.value) {
        observer.observe(imageRef.value)
    }
})
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