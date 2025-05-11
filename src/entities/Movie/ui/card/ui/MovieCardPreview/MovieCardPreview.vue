<script setup>
import {
    computed
} from 'vue'

const props = defineProps({
    ratingAgeLimits: {
        type: [Number, String],
        default: '',
    }
})

const modificationAgeLimits = computed(() => {
    const age = props.ratingAgeLimits
    const ageSlice = props.ratingAgeLimits?.slice(3, age.length) || 0

    return `${ageSlice}+`
})
</script>

<template>
	<div class="movie-card-preview">
		<div class="movie-card-preview__rating">
			{{ modificationAgeLimits }}
		</div>
		<div class="movie-card-preview__trailer">
			Скоро здесь будет трейлер
		</div>
	</div>
</template>

<style src="./styles.scss" lang="scss" scoped />