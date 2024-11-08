<script setup>
import { 
    ref,
    computed,
    onBeforeMount,
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
    useRoute 
} from 'vue-router'
import {
    VWrapper,
} from '@/shared/ui/VWrapper'
import {
    SpinnerLoader,
} from '@/shared/ui/loaders'

const route = useRoute()

const store = movieModel()

const isLoading = ref(true)

const { 
    similars,
} = storeToRefs(store)

const movieId = computed(() => +route.params.filmId)

const fetchData = async () => {
    isLoading.value = true

    await store.fetchMovieSimilars(movieId.value)

    isLoading.value = false
}

onBeforeMount(async () => {
    await fetchData()
})
</script>

<template>
	<SpinnerLoader v-if="isLoading && !similars.length" />

	<VWrapper 
		title="Смотреть также"
		:sub-header="true"
		class="offset sub-header"
	>
		<template #content>
			<MovieLists
				:movies="similars"
			/>
		</template>
	</VWrapper>
</template>