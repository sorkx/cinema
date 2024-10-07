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

const { scrollComponent } = useInfinityScroll({
    fetchDataByCategory: store.fetchCollectionData,
    fetchNextPage: store.fetchCollectionNextPage,
    category: CINEMA_NAMES.TOP_POPULAR_ALL,
})
</script>

<template>
	<div
		ref="scrollComponent"
		class="container" 
	>
		<MovieLists
			:movies="state?.collections.TOP_POPULAR_ALL?.data"
			title="Популярное"
		/>

		<HorizontalLoader v-if="isLoading" />
	</div>
</template>