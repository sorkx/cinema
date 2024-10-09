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
    SpinnerLoader,
} from '@/shared/ui/loaders'

const store = movieModel()

const { 
    state,
    isLoading,
} = storeToRefs(store)

const fetchDataSerialItems = async () => await store.fetchCollectionData(CINEMA_NAMES.TOP_250_TV_SHOWS, 1)
const fetchNextPage = async () => await store.fetchCollectionNextPage(CINEMA_NAMES.TOP_250_TV_SHOWS)

const { scrollComponent } = useInfinityScroll({
    fetchData: fetchDataSerialItems,
    fetchNextPage: fetchNextPage,
})
</script>

<template>
	<SpinnerLoader v-if="isLoading && !state.collections.TOP_250_TV_SHOWS?.data.length" />

	<div class="container">
		<MovieLists
			:movies="state?.collections.TOP_250_TV_SHOWS?.data"
			title="Топ 250 сериалов"
		/>
		<div ref="scrollComponent" />

		<HorizontalLoader v-if="isLoading" />
	</div>
</template>