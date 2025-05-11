<script setup>
import {
    computed
} from 'vue'
import useScreen from '@/shared/lib/use/useScreen'
import {
    MovieRating
} from '@/entities/Movie/ui/details/ui/MovieRating'
import {
    MovieInfoGroup
} from '@/entities/Movie/ui/details/ui/MovieInfoGroup'
import {
    MovieCardPreview
} from '@/entities/Movie/ui/card/ui/MovieCardPreview'
import {
    VButton
} from '@/shared/ui/VButton'

const props = defineProps({
    coordinates: {
        type: Object,
        required: true
    },
    active: {
        type: Boolean,
        default: false
    },
    last: {
        type: Boolean,
        default: false
    },
    nameRu: {
        type: String,
        default: '',
    },
    nameEn: {
        type: String,
        default: '',
    },
    kinopoiskId: {
        type: String,
        default: '',
    },
    imdbId: {
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
    }
})

const { isMinLaptopXl } = useScreen();

const movieGenres = computed(() => props.genres.map((genre) => genre.genre))	
const countries = computed(() => props.countries.map((item) => item.country))
</script>

<template>
	<div
		v-bind="$attrs"
    class="movie-card-hover"
    :style="`left: ${props.coordinates.left}px; top: ${props.coordinates.top}px;`"
    :class="{ active, last }"
	>
		<div class="movie-card-hover__body">
			<MovieCardPreview :rating-age-limits="ratingAgeLimits" />
		</div>
		<div class="movie-card-hover__footer">
			<div class="movie-card-hover__info">
				<div class="movie-card-hover__title">
					{{ props.nameRu || props.nameEn }}
				</div>
				<div class="movie-card-hover__labels">
					<MovieRating :rating="props.ratingKinopoisk" name="kp" :size="isMinLaptopXl ? 'normal' : 'small'" />
					<MovieRating :rating="props.ratingImdb" name="imdb" :size="isMinLaptopXl ? 'normal' : 'small'" />
					<MovieInfoGroup class="movie-card-hover__group" gap="16px">
						<span v-if="movieGenres[0]">{{ movieGenres[0] }}</span>
						<span v-if="countries[0]">{{ countries[0] }}</span>
						<span v-if="props.year">{{ props.year }}</span>
					</MovieInfoGroup>
				</div>
			</div>
			<div class="movie-card-hover__controls">
				<router-link 
					:to="`/movie/${props.kinopoiskId}`"
					class="movie-card-hover__button"
				>
					<VButton 
						data-size="small"
						data-appearance="fill"
						modificator="color-main media-normal"
					>
						{{ type === 'FILM' ? 'Перейти к фильму' : 'Перейти к сериалу' }}
					</VButton>
				</router-link>
			</div>
		</div>
	</div>
</template>

<style src="./styles.scss" lang="scss" scoped />