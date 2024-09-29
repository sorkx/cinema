<script setup>
import {
    RatingDisplay,
} from '@/shared/ui/RatingDisplay'
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
} from 'vue'

const props = defineProps({
    movie: {
        type: Object,
    }
})

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
							{{  props.movie?.year  }}
						</div>
						<div class="movie__head--infos-info">
							{{  modificationAgeLimits  }}
						</div>
						<div 
							class="movie__head--infos-info" 
							style="text-align: start"
						>
							{{  countries  }}
						</div>
						<div 
							class="movie__head--infos-info" 
							style="text-align: start"
						>
							{{  genres  }}
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
								<a :href="`${props.movie?.webUrl}/video`" target="_blank">
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
									Переведено и озвучено:
								</div>
								<div class="voice-acting__name">
									<img src="@/shared/assets/images/voice.png" alt="TVSork" />
								</div>
							</div>
						</div>
					</div>
					<div class="movie__head--meta">
						<div class="movie__head--meta-item">
							<p class="movie__head--meta-title">
								Аудиодорожки и качество видео:
							</p>
							<p>480p, 720p, 1080p («TVSork»)</p>
							<p>Русский Stereo («TVSork»)</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>
  
<style src="./styles.scss" lang="scss" scoped />