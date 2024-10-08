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

const fetchDataPopularItems = async () => await store.fetchCollectionData(CINEMA_NAMES.TOP_POPULAR_ALL, 1)
const fetchNextPage = async () => await store.fetchCollectionNextPage(CINEMA_NAMES.TOP_POPULAR_ALL)

const { scrollComponent } = useInfinityScroll({
    fetchData: fetchDataPopularItems,
    fetchNextPage: fetchNextPage,
})
</script>

<template>
	<div
		class="container" 
	>
		<MovieLists
			:movies="state?.collections.TOP_POPULAR_ALL?.data"
			title="Популярное"
		/>
		<div ref="scrollComponent" />

		<HorizontalLoader v-if="isLoading" />
	</div>
</template>