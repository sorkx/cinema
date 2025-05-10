<script setup>
import {
    PopularSection,
} from '@/widgets/PopularSection'
import {
    GenresSection,
} from '@/widgets/GenresSection'
import {
    HeaderSliderSection,
} from '@/widgets/HeaderSliderSection'
</script>

<template>
	<HeaderSliderSection />
	<PopularSection style="margin-top: 60px"/>
	<GenresSection 
		title="Жанры"
		class="section-genres" 
	/>
</template>

<style src="./styles.scss" lang="scss" scoped />