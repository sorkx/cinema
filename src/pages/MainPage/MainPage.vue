<script setup>
import {
    storeToRefs,
} from 'pinia'
import {
    onMounted,
} from 'vue'
import { 
    movieModel,
} from '@/entities/Movie'
import {
    MovieCategoryRow,
} from '@/widgets/Movie/MovieCategoryRow'

const movieStore = movieModel()
const { 
    films,
    series, 
} = storeToRefs(movieStore)

onMounted(async () => {
    movieStore.fetchAllCategories()
})
</script>

<template>
    <div class="main-container">
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