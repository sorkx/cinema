<script setup>
import {
    RatingDisplay,
    RatingStars,
} from '@/shared/ui/Ratings'
import {
    VSwiper,
} from '@/shared/ui/swipers'
import {
    StaffCard,
} from '@/entities/Staff'
import {
    Movie,
} from '@/entities/Movie'
import {
    VButton,
} from '@/shared/ui/buttons/VButton'
import {
    UISymbol,
} from '@/shared/ui/UISymbol'
import {
    useRatings,
} from '@/shared/lib/use/useRatings'
import {
    computed,
    ref,
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
})

const showAll = ref(false)

const { ratings } = useRatings(computed(() => props.movie))

const modificationAgeLimits = computed(() => {
    const age = props.movie?.ratingAgeLimits
    const ageSlice = props.movie?.ratingAgeLimits?.slice(3, age.length) || 0

    return `${ageSlice}+`
})

const countries = computed(() => props.movie?.countries.map((item) => item.country).join(', '))

const genres = computed(() => {
    return props.movie?.genres.map((item) => {
        const char = item.genre.charAt(0)
        return char.toUpperCase() + item.genre.slice(1)
    }).join(', ')
})

const directors = computed(() => {
    return props.staff.filter(member => member.professionKey === 'DIRECTOR')
})

const actors = computed(() => {
    return props.staff.filter(member => member.professionKey === 'ACTOR')
})

const filmDuration = computed(() => {
    const totalMinutes = props.movie?.filmLength ?? 'Неизвестно'

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

const addedZeroRating = (rating) => {
    return Number.isInteger(rating) ? `${rating}.0` : rating.toFixed(1)
}

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
				<div class="content-container">
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
							<a :href="props.movie?.webUrl" target="_blank">
								<v-button modificator="play-free">
									<span class="movie__head--play">
										Смотреть
									</span>
									<span class="movie__head--look">
										на Кинопоиске
									</span>
								</v-button>
							</a>
							<div class="movie__head--trailers">
								<a href="#" target="_blank">
									<button class="movie__head--trailers-btn">
										<UISymbol name="trailers" />
									</button>
								</a>
								<span class="trailers__tooltip">
									Трейлер
								</span>
							</div>
							<div class="voice-acting-block">
								<div class="voice-acting__title">
									Озвучка:
								</div>
								<div class="voice-acting__name">
									<span>Дубляж</span>
								</div>
							</div>
						</div>
					</div>
					<div class="movie__head--meta">
						<div class="movie__head--meta-item">
							<p class="movie__head--meta-title">
								Аудиодорожки и качество видео:
							</p>
							<p>480p, 720p, 1080p (Дубляж)</p>
							<p>Русский Stereo (Дубляж)</p>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="content-container">
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
				<div class="movie-body__right">
					<div class="movie-vote">
						<div class="movie-vote__title">
							Рейтинг
							{{ props.movie?.type === 'FILM' ? 'фильма' : 'сериала' }}
						</div>
						<div class="stars">
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
		</div>
		<div class="content-container">
			<div class="container-head">
				<h2 class="container-title">
					Актерский состав
				</h2>
			</div>
			<div class="module">
				<div class="module__slider">
					<VSwiper>
						<swiper-slide
							v-for="person in actors"
							:key="person.staffId"
							lazy="true"
						>
							<StaffCard 
								:person="person"
								:key="person.staffId"
							/>
						</swiper-slide>
					</VSwiper>
				</div>
			</div>
		</div>
		<div class="content-container">
			<section class="similar-movies">
				<div class="module">
					<div class="module__wrap">
						<h2 class="module__title">
							Смотреть также
						</h2>
					</div>
					<div class="module__slider">
						<VSwiper>
							<swiper-slide
								v-for="similar in props.similars"
								:key="similar.filmId"
								lazy="true"
							>
								<Movie 
									:movie="similar"
									:key="similar.filmId"
								/>
							</swiper-slide>
						</VSwiper>
					</div>
				</div>
			</section>	
		</div>
	</section>
</template>
  
<style src="./styles.scss" lang="scss" scoped />