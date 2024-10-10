<script setup>
import {
    ModuleWrapper,
} from '@/shared/ui/ModuleWrapper'
import {
    ROUTE_NAMES,
} from '@/shared/lib/constants'
import {
    RatingDisplay,
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
    useRatings,
} from '@/shared/lib/use/useRatings'
import {
    computed,
    ref,
    onMounted,
    toRef,
} from 'vue'

const props = defineProps({
    movie: {
        type: Object,
        default: () => ({}),
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
    boxOffice: {
        type: Array,
        default: () => [],
    },
    trailers: {
        type: Array,
        default: () => [],
    },
})

const typingMapping ={
    'BUDGET': 'Бюджет',
    'RUS': 'РФ',
    'USA': 'США',
    'WORLD': 'В мире',
    'MARKETING': 'Потрачено на маркетинг',
}

const showAll = ref(false)
const showTrailers = ref(false)
const selectedSeason = ref(null)

const { ratings } = useRatings(toRef(() => props.movie))

const directors = computed(() => props.staff.filter(member => member.professionKey === 'DIRECTOR'))

const actors = computed(() => props.staff.filter(member => member.professionKey === 'ACTOR'))

const currentSeason = computed(() => props.seasons.find(season => season.number === selectedSeason.value))

const countries = computed(() => props.movie?.countries.map((item) => item.country).join(', '))

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
    }).join(', ')
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

onMounted(() => {
    if (props.seasons.length > 0) {
        selectedSeason.value = props.seasons[0].number
    }
})
</script>

<template>
	<section
		v-if="props.movie"
		class="movie__page"
	>
		<div 
			class="movie__head" 
			:style="`background-image: url(${props.movie?.coverUrl || props.movie?.posterUrl})`"
		>
			<div class="movie__head--overlay">
				<div class="container">
					<div class="movie__head--original">
						{{ props.movie?.nameOriginal || props.movie?.nameEn || 'Неизвестно' }} 
					</div>
					<h1 class="v-title v-title--big movie__head--name">
						{{ props.movie?.nameRu }}
					</h1>
					<div class="movie__head--infos">
						<div class="movie__head--infos-info">
							{{ props.movie?.year }}
						</div>
						<div class="movie__head--infos-info">
							{{ modificationAgeLimits }}
						</div>
						<div 
							class="movie__head--infos-info" 
							style="text-align: start"
						>
							{{ countries }}
						</div>
						<div 
							class="movie__head--infos-info" 
							style="text-align: start"
						>
							{{ genres }}
						</div>
						<div 
							class="movie__head--infos-info" 
							style="text-align: start"
						>
							{{ filmDuration }}
						</div>
					</div>
					<div class="movie__head--desc">
						{{ props.movie?.description }}
					</div>
					<div class="movie__head--ratings">
						<RatingDisplay 
							v-for="rating in ratings"
							:key="rating.source"
							:rating="rating.value"
							:source="rating.source"
						/>
					</div>
					<div class="movie__head--bottom">
						<div class="movie__head--bottom-btns">
							<a 
								:href="props.movie?.webUrl" 
								target="_blank"
							>
								<VButton modificator="play-free">
									<span class="movie__head--play">
										Смотреть
									</span>
									<span class="movie__head--look">
										на Кинопоиске
									</span>
								</VButton>
							</a>
							<div class="movie__head--trailers">
								<a
									@click="showTrailers = !showTrailers"
								>
									<button class="movie__head--trailers-btn">
										<UISymbol name="trailers" />
									</button>
								</a>
								<Transition
									name="fade"
								>
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
							<div class="voice-acting-block">
								<div class="voice-acting__title">
									Озвучка:
								</div>
								<div class="voice-acting__name">
									<span>
										Дубляж
									</span>
								</div>
							</div>
						</div>
					</div>
					<div
						v-if="props.boxOffice.length > 0" 
						class="movie__box-office"
					>
						<div 
							v-for="box in props.boxOffice"
							:key="box.type"
							class="movie__box-office--item"
						>
							<div>
								<p class="movie__box-office--title">
									{{ typingMapping[box.type] }}
								</p>
								<p class="movie__box-office--amount">
								{{ box.symbol }} {{ box.amount.toLocaleString() }}
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div 
			v-if="props.seasons.length > 0"
			class="container"
		>
			<div class="container-head">
				<div class="container-title">
					 Сезоны и сериалы
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
		<div class="container">
			<div class="movie__body">
				<div class="movie-page__left">
					<div class="movie__body-item">
						<div 
							v-if="directors.length > 0"
							class="movie__body-title"
						>
							{{ staff[0]?.professionText }}
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
				<div
					v-if="props.movie?.ratingKinopoisk || props.movie?.ratingImdb" 
					class="movie-body__right"
				>
					<div class="movie-vote">
						<div class="movie-vote__title">
							Рейтинг
							{{ props.movie?.type === 'FILM' ? 'фильма' : 'сериала' }}
						</div>
						<RatingStars 
							:rating="props.movie?.ratingKinopoisk || props.movie?.ratingImdb || 0"
						/>
						<div class="stars-vote__values">
							<div class="movie-vote__item">
								<div class="movie-vote__value">
									{{ 
										addedZeroRating(props.movie?.ratingKinopoisk) ||
										addedZeroRating(props.movie?.ratingImdb)
									}}
								</div>
								<div class="movie-vote__label">
									ОБЩАЯ ОЦЕНКА
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div
			v-if="props.staff.length > 0" 
			class="container"
		>
			<div class="container-head">
				<h2 class="container-title">
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
		<div
			v-if="props.similars.length > 0" 
			class="container"
		>
			<div class="container-head">
				<h2 class="container-title">
					Смотреть позже
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
  
<style src="./styles.scss" lang="scss" scoped />