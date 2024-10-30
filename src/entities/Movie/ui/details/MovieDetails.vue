<script setup>
import {
    ModuleWrapper,
} from '@/shared/ui/ModuleWrapper'
import {
    // RatingDisplay,
    RatingStars,
} from '@/shared/ui/Ratings'
import {
    StaffCard,
} from '@/entities/Staff'
import {
    Movie,
    Episode,
} from '@/entities/Movie'
import {
    VButton,
} from '@/shared/ui/buttons'
import {
    UISymbol,
} from '@/shared/ui/UISymbol'
import {
    computed,
    ref,
    onMounted,
} from 'vue'

const props = defineProps({
    movie: {
        type: Object,
        default: () => {},
    },
    staff: {
        type: Array,
        default: () => [],
    },
    similars: {
        type: Array,
        default: () => [],
    },
    seasons: {
        type: Array,
        default: () => [],
    },
    trailers: {
        type: Array,
        default: () => [],
    },
    id: {
        type: String,
        default: '',
    },
    type: {
        type: String,
        default: '',
    }
})

const showAll = ref(false)
const showTrailers = ref(false)
const selectedSeason = ref(null)

const directors = computed(() => props.staff.filter(member => member.professionKey === 'DIRECTOR'))

const actors = computed(() => props.staff.filter(member => member.professionKey === 'ACTOR'))

const currentSeason = computed(() => props.seasons.find(season => season.number === selectedSeason.value))

const countries = computed(() => props.movie?.countries.map((item) => item.country)[0])

const trailersFilter = computed(() => props.trailers.filter(trailer => trailer.site === 'YOUTUBE'))

const modificationAgeLimits = computed(() => {
    const age = props.movie?.ratingAgeLimits
    const ageSlice = props.movie?.ratingAgeLimits?.slice(3, age.length) || 0

    return `${ageSlice}+`
})

const genres = computed(() => {
    return props.movie?.genres.map((item) => {
        const char = item.genre.charAt(0)
        return char.toUpperCase() + item.genre.slice(1)
    })[0]
})

const filmDuration = computed(() => {
    const totalMinutes = props.movie?.filmLength

    if (totalMinutes === null || isNaN(totalMinutes)) return 'Длительность неизвестна'

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

const directorsDisplayed = computed(() => {
    if (showAll.value) {
        return directors.value
    } else {
        return directors.value.slice(0, 3)
    }
})

const fomrattedDirectors = computed(() => {
    return directorsDisplayed.value.map(member => 
        member.nameEn || member.nameRu
    ).join(', ')
})

const addedZeroRating = (rating) => Number.isInteger(rating) ? `${rating}.0` : rating

const toggleTrailers = (force) => {
    showTrailers.value = force ?? !showTrailers.value
}

onMounted(() => {
    if (props.seasons.length > 0) {
        selectedSeason.value = props.seasons[0].number
    }
})
</script>

<template>
	<template v-if="props.movie"> 
		<section class="movie-header wrapper breakout">
			<div class="movie-header__wrapper">
				<div class="movie-header__image">
					<img
						:src="props.movie?.coverUrl || props.movie?.posterUrl" 
						fetchpriority="high"
						:alt="props.movie.nameRu || props.movie.nameEn"
					/>
				</div>
				<div class="movie-header__overlay container">
					<div class="movie-header__content">
						<div class="movie-header__name">
							<div class="movie-header__title">
								{{ props.movie?.nameRu }}
							</div>
							<div class="movie-header__original-title">
								{{ props.movie?.nameOriginal || props.movie?.nameEn || 'Неизвестно' }}
							</div>
						</div>
						<div class="movie-header__filters">
							<div class="movie-rating movie-rating--kp">
								<UISymbol name="kp" />
								{{ addedZeroRating(props.movie?.ratingKinopoisk) }}
							</div>
							<div class="movie-rating movie-rating--imdb">
								<UISymbol name="imdb" />
								{{ addedZeroRating(props.movie?.ratingImdb) }}
							</div>
							<div 
								class="movie-info-group"
								style="gap: 16px;"
							>
								<span>
									{{ props.movie?.year }}
								</span>
								<div class="movie-info-group__divider"/>
								<span>
									{{ countries }}
								</span>
								<div class="movie-info-group__divider"/>
								<span>
									{{ genres }}
								</span>
								<div class="movie-info-group__divider"/>
								<span>
									{{ filmDuration }}
								</span>
								<div class="movie-info-group__divider"/>
								<span>
									{{ modificationAgeLimits }}
								</span>
							</div>
						</div>
						<div class="movie-header__description">
							<UISymbol 
								name="full-hd"
							/>
							<UISymbol 
								name="sound"
							/>
						</div>
						<div class=movie-header__control>
							<a
								:href="props.movie?.webUrl" 
								target="_blank"
							>
								<VButton 
									data-size="large"
								>
									Перейти на кинопоиск
								</VButton>
							</a>
							<VButton 
								@click="toggleTrailers()"
								appearance="outline"
								data-size="large"
								modificator="color-white rounded"
							>
								Трейлер
							</VButton>
							<Transition name="fade">
								<div
									v-if="showTrailers"
									class="movie-tooltip__trailers"
								>
									<div
										v-if="trailersFilter.length > 0" 
										class="trailers-list"
									>
										<a
											v-for="trailer in trailersFilter"
											:key="trailer.name"
											:href="trailer.url"
											target="_blank"
											class="trailers-list__link"
										>
											{{ trailer.name }}
										</a>
									</div>
									<div
										v-else 
										class="trailers-list__not-found"
									>
										Трейлеров не обнаружено
									</div>
								</div>
							</Transition>
						</div>
					</div>
				</div>
			</div>
		</section>
		<section
			v-if="movie.type === 'TV_SERIES' && seasons.length"
			class="wrapper seasons__wrapper"
		>
			<div class="content-right">
				<div class="wrapper-header">
					<div class="wrapper-title">
						Сезоны
					</div>
				</div>
				<div class="series-list__wrapper">
					<div class="series-list">
						<a 
							v-for="season in props.seasons"
							:key="season.number"
							class="link--module--seasons link series-list__season"
							@click="selectedSeason = season.number"
							:class="{ active: selectedSeason === season.number }"
						>
							<div 
								class="series-list__season__number"
							>
								{{ season.number }}
							</div>
						</a>
					</div>
					<div v-if="currentSeason">
						<ModuleWrapper 
							:items="currentSeason.episodes"
							swiper-type="movies"
						>
							<template #slide="{ item }">
								<Episode :item="item" />
							</template>
						</ModuleWrapper>
					</div>
				</div>
			</div>
		</section>
		<section
			v-if="props.movie?.description" 
			class="wrapper movie-description"
		>
			<div class="movie-description__info">
				<h2 class="movie-description__header">
					Описание
				</h2>
				<p class="movie-description__text">
					{{ props.movie?.description }}
				</p>
			</div>
			<div class="movie-description__votes">
				<h2 class="movie-description__header">
					Рейтинг
				</h2>
				<div class="movie-description__vote-block">
					<p class="movie-description__text">
						Оценка зрителей
					</p>
					<RatingStars 
							:rating="props.movie?.ratingKinopoisk || props.movie?.ratingImdb || 0"
						/>
				</div>
			</div>
		</section>
		<section class="wrapper full-width">
			<div class="movie__body">
				<div class="movie-page__left">
					<div class="movie__body-item">
						<div 
							v-if="directors.length > 0"
							class="movie__body-title"
						>
							{{ props.staff[0]?.professionText }}
						</div>
						<div 
							class="movie__body-desc"
						>
							{{ fomrattedDirectors }}
						</div>
						<a
							v-if="directors.length > 3"
							class="fulltext__link"
							href="javascript:void(0)"
							@click="showAll = !showAll"
						>
							{{ showAll ? 'Скрыть' : 'Читать полностью'  }}
						</a>
					</div>
				</div>
			</div>
		</section>
		<section class="wrapper staff__wrapper">
			<div
				v-if="props.staff.length > 0" 
				class="content-right"
			>
				<div class="wrapper-header">
					<h2 class="wrapper-title">
						Актерский состав
					</h2>
				</div>
				<ModuleWrapper
					:items="actors"
					swiper-type="movies"
				>
					<template #slide="{ item }">
						<StaffCard 
							:person="item"
							:key="item.staffId"
						/>
					</template>
				</ModuleWrapper>
			</div>
		</section>
		<section class="wrapper similars__wrapper">
			<div
				v-if="props.similars.length > 0" 
				class="content-right"
			>
				<div class="wrapper-header">
					<h2 class="wrapper-title">
						Смотрите также
					</h2>
				</div>
				<ModuleWrapper
					:items="props.similars"
					swiper-type="movies"
				>
					<template #slide="{ item }">
						<Movie 
							:movie="item"
							:key="item.filmId"
						/>
					</template>
				</ModuleWrapper>	
			</div>
		</section>
	</template>
</template>
  
<style src="./styles.scss" lang="scss" scoped />