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
    films,
    isLoading,
} = storeToRefs(store)

const { scrollComponent } = useInfinityScroll({
    fetchDataByCategory: store.fetchDataByCategory,
    fetchNextPage: store.fetchNextPage,
    category: CINEMA_NAMES.FILM,
})
</script>

<template>
	<div 
		class="container" 
		ref="scrollComponent"
	>
		<MovieLists 
			:movies="films"
			title="Фильмы"
			:loading="isLoading"
		/>
		<HorizontalLoader v-if="isLoading" />
	</div>
</template>