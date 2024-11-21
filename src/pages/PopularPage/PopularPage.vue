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
} from '@/shared/ui/loaders'
import {
    VWrapper,
} from '@/shared/ui/VWrapper'

const store = movieModel()

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

    await store.fetchCollectionNextPage(CINEMA_NAMES.TOP_POPULAR_ALL)
}

const { scrollComponent, isLoading: isLoadingMore } = useInfinityScroll({
    fetchData: fetchDataPopularItems,
    fetchNextPage: fetchNextPage,
})
</script>

<template>
	<VWrapper
		title="Популярные фильмы и сериалы"
		:sub-header="true"
		class="offset"
	>
		<template #content>
			<MovieLists
				:movies="state?.collections.TOP_POPULAR_ALL?.data"
				:loading="isLoading && !isLoadingMore"
			/>

			<CircleLoader v-if="isLoadingMore" />
			
			<div ref="scrollComponent" />
		</template>
	</VWrapper>
</template>