<script setup>
import {
    MovieLists,
} from '@/widgets/Movie'
import {
    storeToRefs,
} from 'pinia'
import {
    computed,
    watch,
    watchEffect,
	onMounted,
} from 'vue'
import { 
    movieModel,
} from '@/entities/Movie'
import {
    CINEMA_NAMES,
} from '@/shared/lib/constants'
import {
    useInfinityScroll
} from '@/shared/lib/use/useInfinityScroll'
import {
    HorizontalLoader,
} from '@/shared/ui/loaders'
import { 
    useRoute,
} from 'vue-router'

const route = useRoute()

const store = movieModel()

const { 
    categories,
    isLoading,
} = storeToRefs(store)

const currentCategory = computed(() => route.params.category === 'serials' ? CINEMA_NAMES.TV_SERIES : CINEMA_NAMES.FILM)

const { scrollComponent } = useInfinityScroll({
    fetchDataByCategory: store.fetchDataByCategory,
    fetchNextPage: store.fetchNextPage,
    category: CINEMA_NAMES.FILM,
})

const titlesMapping = {
    [CINEMA_NAMES.FILM]: 'Фильмы',
    [CINEMA_NAMES.TV_SERIES]: 'Cериалы',
}
</script>

<template>
	<div
		ref="scrollComponent"
		class="container" 
	>
		<MovieLists
			v-for="(category, key) in categories"
			:key="key" 
			:movies="category.data"
			:title="titlesMapping[key]"
		/>

		<HorizontalLoader v-if="isLoading" />
	</div>
</template>