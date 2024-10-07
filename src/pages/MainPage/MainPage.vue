<script setup>
import {
    storeToRefs,
} from 'pinia'
import {
    onMounted,
	onBeforeMount,
    ref,
} from 'vue'
import { 
    movieModel,
} from '@/entities/Movie'
import {
    MovieCategoryRow,
} from '@/widgets/Movie'
import {
    SpinnerLoader,
} from '@/shared/ui/loaders'

const loading = ref(false)

const movieStore = movieModel()

const { 
    state, 
} = storeToRefs(movieStore)

const titlesMapping = {
    TOP_250_MOVIES: 'Топ 250 Фильмов',
    TOP_250_TV_SHOWS: 'Топ 250 Cериалов',
    TOP_POPULAR_ALL: 'Популярное',
}

const routingMapping = {
    TOP_250_MOVIES: 'TopMovies',
    TOP_250_TV_SHOWS: 'TopSerials',
    TOP_POPULAR_ALL: 'Popular',
}

onBeforeMount(async () => {
    loading.value = true
    await movieStore.fetchAllCategories()
    loading.value = false
})
</script>

<template>
	<SpinnerLoader v-if="loading" />

    <div
		v-else 
		class="main-container"
	>
        <div class="main">
            <div class="container main__container">
                <MovieCategoryRow 
					v-for="(collection, key) in state?.collections"
					:key="key"
					:items="collection.data"
					:title="titlesMapping[key]"
					:name="routingMapping[key]"
				/>
            </div>
        </div>
    </div>
</template>

<style src="./styles.scss" lang="scss" scoped />