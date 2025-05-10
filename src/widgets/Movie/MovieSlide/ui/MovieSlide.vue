<script setup>
import {
    computed
} from 'vue'
import {
    MovieRating,
} from '@/entities/Movie/ui/details/ui/MovieRating'
import {
    MovieInfoGroup
} from '@/entities/Movie/ui/details/ui/MovieInfoGroup'
import {
    VButton,
} from '@/shared/ui/VButton'

const props = defineProps({
    movie: {
        type: Object,
        default: () => ({}),
    },
    active: {
        type: Boolean,
        default: false,
    }
})

const movieGenres = computed(() => props.movie?.genres.map((genre) => genre.genre).join(', '))	
const countries = computed(() => props.movie?.countries.map((item) => item.country))
const filmDuration = computed(() => {
    const totalMinutes = props.movie?.duration

    if (totalMinutes === null || isNaN(totalMinutes)) return '0 ч. 0 мин.'

    if (totalMinutes < 60) {
        return `${totalMinutes} мин`
    } else {
        const hours = Math.floor(totalMinutes / 60)
        const minutes = totalMinutes % 60

        return  minutes === 0
            ? `${hours} ч`
            : `${hours} ч ${minutes} мин`
    }
})

const naviateTo = (path) => {
    window.location.href = path
}
</script>

<template>
	<div class="movie-slide" :class="{ active }" @click="naviateTo(`/movie/${props.movie.kinopoiskId}`)">
		<div class="movie-slide__image">
			<img 
				:src="props.movie.posterUrl"
				:alt="props.movie.nameRu || props.movie.nameEn"
			/>
		</div>
		<div class="movie-slide__overlay container">
			<div
				class="movie-slide__content" 
				data-swiper-parallax-x="30%"
        data-swiper-parallax-opacity="0"
				:class="{ active }"
			>
				<div class="movie-slide__title">
					{{ props.movie.nameRu || props.movie.nameEn }}
				</div>
				<div class="movie-slide__genres">
					{{ movieGenres }}
					<span>
						16+
					</span>
				</div>
				<div class="movie-slide__description">
					Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quibusdam iste nemo ipsa, sequi sed temporibus rerum 
					eos soluta blanditiis esse nostrum quae exercitationem inventore similique, eaque distinctio ut odio natus.
				</div>
				<div class="movie-slide__filters">
					<div class="movie-slide__filters-item">
						<MovieRating :rating="props.movie?.ratingKinopoisk" name="kp" />
						<MovieRating :rating="props.movie?.ratingImdb" name="imdb" />
					</div>
					<MovieInfoGroup class="movie-slide__info-group">
						<span v-if="props.movie?.year">{{ props.movie?.year }}</span>
						<span v-if="countries[0]">{{ countries[0] }}</span>
						<span v-if="filmDuration">{{ filmDuration }}</span>
					</MovieInfoGroup>
				</div>
				<router-link
					:to="`/movie/${props.movie.kinopoiskId}`"
					target="_blank"
				>
					<VButton 
						data-size="large"
						data-appearance="fill"
						modificator="color-main media-normal"
						class="movie-header__control movie-header__button movie-slide__button"
					>
						<div class="movie-slide__button-text">
							Перейти к фильму
						</div>
					</VButton>
				</router-link>
			</div>
		</div>
	</div>
</template>

<style src="./styles.scss" lang="scss" scoped />