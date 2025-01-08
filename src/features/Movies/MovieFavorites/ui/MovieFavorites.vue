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
    favoritesModel,
} from '@/entities/Favorites'

const props = defineProps({
    movie: {
        type: Object,
        default: () => {},
    },
})

const favoriteStore = favoritesModel()

const isFavorite = computed(() => favoriteStore.isFavorite(props.movie?.kinopoiskId))

const addToFavorite = computed(() => isFavorite.value ? 'fill' : 'outline') 

const toggleFavorite = () => {
    if (isFavorite.value) {
        favoriteStore.removeFromFavorites(props.movie?.kinopoiskId)
    } else {
        favoriteStore.addToFavorites(props.movie)
    }
}
</script>

<template>
	<VButton
		:data-appearance="addToFavorite"
		data-size="large"
		modificator="color-white rounded media-normal"
		class="movie-favorite-button"
		@click="toggleFavorite"
	>
		<UISymbol name="favorite" />
	</VButton>
</template>

<style src="./styles.scss" lang="scss" scoped />