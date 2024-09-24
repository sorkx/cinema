<script setup>
	const props = defineProps({
		movieDetails: {
		type: Object,
		required: true
		}
	})
</script>

<template>
	<div v-if="props.movieDetails" class="movie-details">
	  <h2>{{ props.movieDetails.nameRu || props.movieDetails.nameEn }}</h2>
	  <img :src="props.movieDetails.posterUrl" alt="Movie poster" />
	  <p>{{ props.movieDetails.description }}</p>
	</div>
</template>
  
<style src="./movieDetails.scss" lang="scss" scoped />