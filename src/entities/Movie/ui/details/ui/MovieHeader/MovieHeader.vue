<script setup>
import {
    computed,
} from 'vue'
import {
    VButton,
} from '@/shared/ui/VButton'
import {
    UISymbol,
} from '@/shared/ui/UISymbol'
import {
    TrailersModal,
} from '../MovieTrailers/ui/TrailersModal'
import {
    provideModal,
} from '@/shared/lib/use/useModal'
import {
    useWindowWidth,
} from '@/shared/lib/use/useWindowWidth'
import {
    VSkeleton,
} from '@/shared/ui/VSkeleton'
import {
    MovieFavorites as AddToFavorites,
} from '@/features/Movies/MovieFavorites'

const { 
    closeModal, 
    isOpen, 
    openModal 
} = provideModal()

const windowWidth = useWindowWidth()

const props = defineProps({
    item: {
        type: Object,
        default: () => {},
    },
    trailers: {
        type: Array,
        default: () => [],
    },
    loading: {
        type: Boolean,
        default: false
    },
    id: {
        type: [String, Number],
        default: null,
    }
})

const addedZeroRating = (rating) => Number.isInteger(rating) ? `${rating}.0` : rating

const filmDuration = computed(() => {
    const totalMinutes = props.item?.filmLength

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

const countries = computed(() => props.item?.countries.map((item) => item.country))

const modificationAgeLimits = computed(() => {
    const age = props.item?.ratingAgeLimits
    const ageSlice = props.item?.ratingAgeLimits?.slice(3, age.length) || 0

    return `${ageSlice}+`
})

const genres = computed(() => {
    return props.item?.genres.map((item) => {
        const char = item.genre.charAt(0)
        return char.toUpperCase() + item.genre.slice(1)
    })
})
</script>

<template>
	<section class="wrapper movie-header breakout">
		<div
			v-if="props.loading" 
			class="header-skeleton"
		>
			<div class="header-skeleton__overlay container">
				<div class="header-skeleton__content">
					<div class="header-skeleton__name">
						<VSkeleton
						:config="{
							count: 1,
							container: {
								maxWidth: '540px',
								gap: '0.5rem',
							},
							item: {
								height: '3.5rem',
								maxWidth: '88.8889%',
								borderRadius: '0.5rem'
							}
						}" 
						/>
						<VSkeleton
							:config="{
								count: 1,
								container: {
									maxWidth: '540px',
									gap: '0.5rem',
								},
								item: {
									height: '2rem',
									maxWidth: '74.0741%',
									borderRadius: '0.5rem'
								}
							}"  
						/>
					</div>
					<VSkeleton
						:config="{
							count: 1,
							container: {
								gap: '0.5rem',
							},
							item: {
								height: '3rem',
								maxWidth: '100%',
								borderRadius: '0.5rem'
							}
						}"  
					/>
					<VSkeleton
						:config="{
							count: 1,
							container: {
								maxWidth: '540px',
								gap: '0.5rem',
							},
							item: {
								height: '3rem',
								maxWidth: '83.3333%',
								borderRadius: '0.5rem'
							}
						}" 
					/>
					<VSkeleton
						:config="{
							count: 1,
							container: {
								maxWidth: '540px',
								gap: '0.5rem',
							},
							item: {
								height: '46px',
								maxWidth: '74.0741%',
								borderRadius: '0.5rem'
							}
						}" 
					/>
					<div class="header-skeleton__row">
						<VSkeleton
							:config="{
								count: 1,
								container: {
									gap: '0.5rem',
								},
								item: {
									height: '60px',
									maxWidth: '270px',
									borderRadius: '32px'
								}
							}" 
						/>
						<VSkeleton 
							:config="{
								count: 1,
								container: {
									gap: '0.5rem',
								},
								item: {
									height: '60px',
									maxWidth: '170px',
									borderRadius: '32px'
								}
							}" 
						/>
					</div>
				</div>
			</div>
		</div>
		<div
			v-else 
			class="movie-header__wrapper"
		>
			<div class="movie-header__image">
				<img
					:src="props.item?.coverUrl || props.item?.posterUrl" 
					fetchpriority="high"
					:alt="props.item.nameRu || props.item.nameEn"
				/>
			</div>
			<div class="movie-header__overlay container">
				<div class="movie-header__content">
					<div class="movie-header__name">
						<div class="movie-header__title">
							{{ props.item?.nameRu }}
						</div>
						<div class="movie-header__original-title">
							{{ props.item?.nameOriginal || props.item?.nameEn || 'Неизвестно' }}
						</div>
					</div>
					<div class="movie-header__filters">
						<div class="movie-rating movie-rating--kp">
							<UISymbol name="kp" />
							{{ addedZeroRating(props.item?.ratingKinopoisk) || '0.0' }}
						</div>
						<div class="movie-rating movie-rating--imdb">
							<UISymbol name="imdb" />
							{{ addedZeroRating(props.item?.ratingImdb) || '0.0' }}
						</div>
						<div class="movie-info-group">
							<span>
								{{ props.item?.year }}
							</span>
							<div class="movie-info-group__divider"/>
							<span>
								{{ countries[0] }}
							</span>
							<div class="movie-info-group__divider"/>
							<span>
								{{ genres[0] }}
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
							:href="props.item?.webUrl" 
							target="_blank"
						>
							<VButton 
								data-size="large"
								data-appearance="fill"
								modificator="color-main media-normal"
								class="movie-header__control movie-header__button"
							>
								Перейти на кинопоиск
							</VButton>
						</a>
						<VButton
							v-if="windowWidth > 640" 
							@click="openModal"
							data-appearance="outline"
							data-size="large"
							modificator="color-white rounded media-normal"
							class="trailer-button"
						>
							Трейлер
						</VButton>
						<AddToFavorites 
							:movie="props.item"
						/>
					</div>
					<TrailersModal
						v-if="isOpen"
						@close="closeModal" 
						:seasons="props.trailers"
					/>
				</div>
			</div>
		</div>
	</section>
</template>

<style src="./styles.scss" lang="scss" scoped />