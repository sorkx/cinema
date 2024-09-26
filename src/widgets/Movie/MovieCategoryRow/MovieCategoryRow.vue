<script setup>
import { 
    Movie,
} from '@/entities/Movie'
import {
    VSwiper,
} from '@/shared/ui/swipers/VSwiper'

const props = defineProps({
    items: {
        type: Array,
    },
    isLoading: {
        type: Boolean,
        default: false,
    },
    title: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    }
})
</script>
<template>
	<div v-if="props.isLoading">Loading...</div>

	<div
		v-else
		class="module"
	>
		<div class="module__wrap">
			<router-link 
				to="#" 
				class="module__title"
			>
				<h2>{{ props.title }}</h2>
			</router-link>
		</div>
		<div class="module__slider">
			<VSwiper class="movies__swiper">
				<swiper-slide
					v-for="item in props.items"
					:movie="item"
					:key="item.id"
					class="movie__swiper--slide"
					lazy="true"
				>
					<Movie
						:movie="item"
						:key="item.id"
					/>
    			</swiper-slide>
  			</VSwiper>
		</div>
	</div>
</template>

<style src="./styles.scss" lang="scss" scoped />