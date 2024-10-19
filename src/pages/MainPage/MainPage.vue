<script setup>
import {
    storeToRefs,
} from 'pinia'
import {
    onBeforeMount,
    ref,
} from 'vue'
import { 
    movieModel,
} from '@/entities/Movie'
import {
    newsModel,
} from '@/entities/MediaPost'
import {
    MovieCategoryRow,
} from '@/widgets/Movie'
import {
    PostRow,
} from '@/widgets/Post'
import {
    SpinnerLoader,
} from '@/shared/ui/loaders'
import { 
    onBeforeRouteLeave,
} from 'vue-router'

const loading = ref(false)

const postStore = newsModel()
const movieStore = movieModel()

const {
    posts,
} = storeToRefs(postStore)

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

const fetchData = async () => {
    loading.value = true
    await movieStore.fetchAllCategories(),
    await postStore.fetchMediaPosts(1)
    loading.value = false
}

onBeforeMount(async () => await fetchData())

onBeforeRouteLeave(() => {
    state.collections = {}
    posts.value = []
})
</script>

<template>
	<SpinnerLoader v-if="loading && !state?.collections.length && !posts.length" />

	<main
		v-else 
		class="container main__container"
	>
		<MovieCategoryRow 
			v-for="(collection, key) in state?.collections"
			:key="key"
			:items="collection.data"
			:title="titlesMapping[key]"
			:name="routingMapping[key]"
		/>
		<PostRow
			:items="posts"
			title="Новости"
			name="News"
			/>
	</main>
</template>

<style src="./styles.scss" lang="scss" scoped />