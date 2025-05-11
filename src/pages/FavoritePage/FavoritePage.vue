<script setup>
import {
    onMounted,
} from 'vue'
import { 
    storeToRefs 
} from 'pinia'
import {
    VWrapper,
} from '@/shared/ui/VWrapper'
import {
    RouletteSlider,
} from '@/shared/ui/RouletteSlider'
import {
    MovieCard,
} from '@/entities/Movie'
import {
    VEmptyBlock,
} from '@/shared/ui/VEmptyBlock'
import {
    favoritesModel,
} from '@/entities/Favorites'

const favoriteStore = favoritesModel()

const { 
    favorites 
} = storeToRefs(favoriteStore)

onMounted(() => favoriteStore.loadFavorites())
</script>

<template>
	<VWrapper
		title="Избранное"
		:sub-header="false"
		class="favorites offset"
	>
		<template #content>
			<RouletteSlider
				v-if="favorites.length"
				:items="favorites"
			>
				<template #slide="{ item }">
					<MovieCard 
						:key="item.id"
						:name-ru="item.nameRu"
						:name-en="item.nameEn"
						:name-original="item.nameOriginal"
						:film-id="item.filmId"
						:imdb-id="item.imdbId"
						:kinopoisk-id="item.kinopoiskId"
						:rating-kinopoisk="item.ratingKinopoisk"
						:rating-imdb="item.ratingImdb"
						:rating-age-limits="item.ratingAgeLimits"
						:poster-url-preview="item.posterUrlPreview"
						remove-hover-popup
					/>
				</template>
			</RouletteSlider>
			<VEmptyBlock 
				v-else 
				title="Здесь будут показаны ваши любимые фильмы и сериалы" 
			/>
		</template>
	</VWrapper>
</template>

<style src="./styles.scss" lang="scss" scoped />