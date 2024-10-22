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

const fetchDataSerialItems = async () => {

    isLoading.value = true

    await store.fetchCollectionData(CINEMA_NAMES.TOP_250_TV_SHOWS, 1)

    isLoading.value = false
}

const fetchNextPage = async () => {
    if (isLoading.value) return

    isLoadingMore.value = true

    await store.fetchCollectionNextPage(CINEMA_NAMES.TOP_250_TV_SHOWS)

    isLoadingMore.value = false
}

const { scrollComponent } = useInfinityScroll({
    fetchData: fetchDataSerialItems,
    fetchNextPage: fetchNextPage,
})
</script>

<template>
	<SpinnerLoader v-if="isLoading && !state.collections.TOP_250_TV_SHOWS?.data.length" />

	<div class="wrapper offset">
		<div class="wrapper-header">
			<div class="wrapper-title">
				Топ 250 сериалов
			</div>
		</div>
		<div class="wrapper-subheader" />

		<MovieLists
			:movies="state?.collections.TOP_250_TV_SHOWS?.data"
			title="Топ 250 сериалов"
		/>

		<CircleLoader v-if="isLoadingMore" />

		<div ref="scrollComponent" />
	</div>
</template>