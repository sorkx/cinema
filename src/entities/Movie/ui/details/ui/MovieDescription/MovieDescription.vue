<script setup>
import {
    RatingStars,
} from '@/shared/ui/Ratings'
import {
    ref,
    computed,
    onMounted,
    onUnmounted,
} from 'vue'
import {
    ToggleButton,
} from '@/shared/ui/ToggleButton'
import {
    VSkeleton,
} from '@/shared/ui/VSkeleton'

const props = defineProps({
    genres: {
        type: Array,
        default: () => [],
    },
    description: {
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
    loading: {
        type: Boolean,
        default: false
    }
})

const isTruncate = ref(false)
const isExpanded = ref(false)
const showToggleButton = ref(false)

const handeResize = () => {
    if (window.innerWidth <= 768) {
        isTruncate.value = !isExpanded.value
        showToggleButton.value = true
    } else {
        isTruncate.value = false
        showToggleButton.value = false
    }
}

const toggleDescription = () => {
    isExpanded.value = !isExpanded.value
    isTruncate.value = !isExpanded.value
}

const genres = computed(() => {
    return props.genres.map((item) => {
        const char = item.genre.charAt(0)
        return char.toUpperCase() + item.genre.slice(1)
    })
})

onMounted(() => {
    handeResize()
    window.addEventListener('resize', handeResize)
})

onUnmounted(() => {
    window.removeEventListener('resize', handeResize)
})
</script>

<template>
	<section
		v-if="props.description" 
		class="wrapper movie-description"
	>
		<div class="movie-description__info">
			<h2 class="movie-description__header">
				Описание
			</h2>
			<p
				v-if="props.loading" 
				class="movie-description__text"
			>
				<VSkeleton
					v-if="props.loading" 
					count="5"
					max-width="100%"
					height="2rem"
					radius="0.5rem"
					gap="0.5rem"
					:column="true"
				/>
			</p>
			<div v-else>
				<p
					:class="[
						'movie-description__text',
						{ 
							'movie-description__text--truncate': isTruncate 
						}
					]"
				>
					<span>
						{{ props.description }}
					</span>
				</p>
				<ToggleButton
					v-if="showToggleButton"
					:toggled="isExpanded" 
					class="movie-description__toggle-btn"
					@click="toggleDescription" 
				/>
			</div>
		</div>
		<div class="movie-description__right">
			<div class="movie-description__votes">
				<h2 class="movie-description__header">
					Рейтинг
				</h2>
				<div class="movie-description__vote-block">
					<p class="movie-description__text">
						Оценка зрителей
					</p>
					<RatingStars 
						:rating="props.ratingKinopoisk || props.ratingImdb || 0"
					/>
				</div>
			</div>
			<div class="movie-description__genre">
				<h2 class="movie-description__header">
					Жанры
				</h2>
				<div class="movie-description__genre-inner">
					<template v-if="!props.loading">
						<div 
							v-for="genre in genres"
							:key="genre"
							class="movie-description__tag">
								{{ genre }}
						</div>
					</template>
				</div>
			</div>	
		</div>
	</section>
</template>

<style src="./styles.scss" lang="scss" scoped />

