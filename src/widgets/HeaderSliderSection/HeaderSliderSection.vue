<script setup>
import {
    onMounted
} from 'vue'
import {
    HeaderSlider,
} from '@/shared/ui/HeaderSlider'
import {
    storeToRefs,
} from 'pinia'
import { 
    movieModel,
} from '@/entities/Movie'
import {
    MovieSlide,
} from '@/widgets/Movie/MovieSlide'

const movieStore = movieModel()

const { 
    premieres, 
} = storeToRefs(movieStore)

const fetchData = async () => {
    const currentDate = new Date()
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ]
    
    const currentMonth = months[currentDate.getMonth()]
    const currentYear = currentDate.getFullYear() 
    
    await movieStore.fetchMoviePremieres(currentMonth, currentYear)
}

onMounted(async () => await fetchData())

</script>

<template>
	<HeaderSlider :items="premieres">
		<template #slide="{ item }">
			<MovieSlide 
				:movie="item"
				data-swiper-parallax-x="50%"
				data-swiper-parallax-opacity="0" 
			/>
		</template>
	</HeaderSlider>
</template>

<style src="./styles.scss" lang="scss" scoped/>