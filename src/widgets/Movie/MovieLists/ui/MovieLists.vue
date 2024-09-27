<script setup>
import { 
    Movie,
} from '@/entities/Movie'

const props = defineProps({
    movies: {
        type: [Array, Object],
    },
    isLoading: {
        type: Boolean,
        default: false,
    },
})
</script>
<template>
	<div v-if="props.isLoading">Loading...</div>

	<div 
		v-else
		class="card-lists"
	>
		<Movie
			v-for="item in props.movies"
			:movie="item"
			:key="item.id"
		/>
	</div>
</template>

<style src="./styles.scss" lang="scss" scoped />