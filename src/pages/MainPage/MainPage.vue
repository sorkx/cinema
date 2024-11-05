<script setup>
import {
    PopularSection,
} from '@/widgets/PopularSection'
import {
    GenresSection,
} from '@/widgets/GenresSection'
</script>

<template>
	<PopularSection style="margin-top: 60px"/>
	<GenresSection 
		title="Жанры"
		class="section-genres" 
	/>
</template>

<style src="./styles.scss" lang="scss" scoped />