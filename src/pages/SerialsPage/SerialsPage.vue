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
    series,
    isLoading,
} = storeToRefs(store)

const { scrollComponent } = useInfinityScroll({
    fetchDataByCategory: store.fetchDataByCategory,
    fetchNextPage: store.fetchNextPage,
    category: CINEMA_NAMES.TV_SERIES,
})
</script>

<template>
	<div 
		class="container"
		ref="scrollComponent"
	>
		<MovieLists 
			:movies="series"
			title="Сериалы"
			:loading="isLoading"
		/>
		<HorizontalLoader v-if="isLoading" />
	</div>
</template>