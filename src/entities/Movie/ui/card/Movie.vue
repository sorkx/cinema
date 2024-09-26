<script setup>
import { 
    computed,
} from 'vue'

const props = defineProps({
    movie: {
        type: Object,
    },
})

const ratingColorClass = computed(() => {
    if (props.rating >= 7) {
        return 'green'
    } else if (props.rating > 5) {
        return 'yellow'
    } else {
        return 'red'
    }
})
</script>

<template>
	<div 
		class="card-item" 
		@click="handlerClick"
	>
		<div class="card-content">
			<router-link
				:to="{ name: 'MovieDetails', params: { id: movie.kinopoiskId || movie.imdbId } }"
			>
				<div class="card-background">
					<img
						v-if="movie.posterUrlPreview" 
						:src="movie.posterUrlPreview"
						class="card-img" 
						loading="lazy"
					/>
					<div class="card-background__darkened" />
				</div>
			</router-link>
			<div class="card-info">
				<div class="card-name">
					{{ movie.nameRu || movie.nameEn }}
				</div>
				<div class="card-genre">
					{{ movie.genre }}
				</div>
				<div :class="['card-rating', ratingColorClass]">
					{{ movie.ratingImdb || movie.ratingKinopoisk }}
				</div>
			</div>
		</div>
	</div>
</template>

<style src="./style.scss" lang="scss" scoped />