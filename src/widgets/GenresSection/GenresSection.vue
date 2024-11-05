<script setup>
import {
    ref,
    onBeforeMount,
} from 'vue'
import {
    VWrapper,
} from '@/shared/ui/VWrapper'
import {
    RouletteSlider,
} from '@/shared/ui/RouletteSlider'
import { 
    movieModel,
} from '@/entities/Movie'
import {
    storeToRefs,
} from 'pinia'
import {
    VSkeleton,
} from '@/shared/ui/VSkeleton'

const store = movieModel()

const props = defineProps({
    title: {
        type: String,
        default: '',
    }
})

const { 
    genresMovie,
} = storeToRefs(store)

const isLoadingFilters = ref(true)

onBeforeMount(async () => {
    isLoadingFilters.value = true

    await store.fetchMovieFilters()

    isLoadingFilters.value = false
})
</script>

<template>
	<VWrapper
		:title="props.title"
		class="section-genres"
	>
		<template #content>
			<RouletteSlider
				:items="genresMovie"
				class="content-right"
			>
				<template #slide="{ item }">
					<div
						v-if="isLoadingFilters"
						class="skeleton-genres"
					>
						<VSkeleton 
							:count="1"
							max-width="248px"
							min-width="200px"
							height="180px"
							radius="16px"
							gap="16px"
						/>
					</div>
					<div
						v-else
						class="genre-card"
					>
						<span class="genre-card__image--container" />
						<router-link
							:to="`/browse/genre/${item.id}`"
							class="genre-card__overlay"
						>
							<p class="genre-card__title">
								{{ item.genre }}
							</p>
						</router-link>
					</div>
				</template>
			</RouletteSlider>
		</template>
	</VWrapper>
</template>

<style src="./styles.scss" lang="scss" scoped />