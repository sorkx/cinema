<script setup>
import { 
    ref,
} from 'vue'
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
    CircleLoader,
    SpinnerLoader,
} from '@/shared/ui/loaders'

const store = movieModel()

const isLoadingMore = ref(false)
const isLoading = ref(true)

const { 
    state,
} = storeToRefs(store)

const fetchDataPopularItems = async () => {
    isLoading.value = true

    await store.fetchCollectionData(CINEMA_NAMES.TOP_POPULAR_ALL, 1)

    isLoading.value = false
}
const fetchNextPage = async () => {
    if (isLoading.value) return

    isLoadingMore.value = true

    await store.fetchCollectionNextPage(CINEMA_NAMES.TOP_POPULAR_ALL)

    isLoadingMore.value = false
}

const { scrollComponent } = useInfinityScroll({
    fetchData: fetchDataPopularItems,
    fetchNextPage: fetchNextPage,
})
</script>

<template>
	<SpinnerLoader v-if="isLoading && !state.collections.TOP_POPULAR_ALL?.data.length" />

	<div
		class="container" 
	>
		<MovieLists
			:movies="state?.collections.TOP_POPULAR_ALL?.data"
			title="Популярное"
		/>

		<CircleLoader v-if="isLoadingMore" />

		<div ref="scrollComponent" />
	</div>
</template>