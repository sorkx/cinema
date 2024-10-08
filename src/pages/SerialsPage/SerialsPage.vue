<script setup>
import {
    MovieLists,
} from '@/widgets/Movie'
import {
    storeToRefs,
} from 'pinia'
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

const store = movieModel()

const { 
    state,
    isLoading,
} = storeToRefs(store)

const fetchCategoryItems = async () => await store.fetchCategoryData(CINEMA_NAMES.TV_SERIES, 1)
const fetchNextPage = async () => await store.fetchCategoryNextPage(CINEMA_NAMES.TV_SERIES)

const { scrollComponent } = useInfinityScroll({
    fetchData: fetchCategoryItems,
    fetchNextPage: fetchNextPage,
})
</script>

<template>
	<div class="container">
		<MovieLists
			:movies="state.categories.TV_SERIES?.data"
			title="Сериалы"
		/>
		<div ref="scrollComponent" />

		<HorizontalLoader v-if="isLoading" />
	</div>
</template>