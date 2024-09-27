<script setup>
import { 
    Movie,
} from '@/entities/Movie'
import {
    VSwiper,
} from '@/shared/ui/swipers/VSwiper'
import {
    UISymbol,
} from '@/shared/ui/UISymbol'

const props = defineProps({
    items: {
        type: Array,
    },
    title: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    }
})
</script>

<template>
	<div
		class="module"
	>
		<div class="module__wrap">
			<router-link 
				class="module__title"
				:to="{ 
					name: props.name, 
				}"
			>
				<h2>{{ props.title }}</h2>
				<UISymbol name="arrow-right" />
			</router-link>
		</div>
		<VSwiper class="module__movies--swiper">
			<swiper-slide
				v-for="item in props.items"
				:key="item.id"
				class="swiper-slide"
				lazy="true"
			>
				<Movie
					:movie="item"
					:key="item.id"
				/>
			</swiper-slide>
		</VSwiper>
	</div>
</template>

<style src="./styles.scss" lang="scss" scoped />