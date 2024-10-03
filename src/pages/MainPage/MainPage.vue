<script setup>
import {
    storeToRefs,
} from 'pinia'
import {
    onMounted,
    ref,
} from 'vue'
import { 
    movieModel,
} from '@/entities/Movie'
import {
    MovieCategoryRow,
} from '@/widgets/Movie'
import {
    SpinnerLoader,
} from '@/shared/ui/SpinnerLoader'

const loading = ref(false)

const movieStore = movieModel()

const { 
    films,
    series, 
} = storeToRefs(movieStore)

onMounted(async () => {
    loading.value = true
    await movieStore.fetchAllCategories()
    loading.value = false
})
</script>

<template>
	<SpinnerLoader v-if="loading" />

    <div
		v-else 
		class="main-container"
	>
        <div class="main">
            <div class="content-container main__container">
                <MovieCategoryRow 
					:items="films"
					name="Films"
					title="Фильмы"
				/>
				<MovieCategoryRow 
					:items="series"
					title="Cериалы"
					name="Serials"
				/>
            </div>
        </div>
    </div>
</template>

<style src="./styles.scss" lang="scss" scoped />