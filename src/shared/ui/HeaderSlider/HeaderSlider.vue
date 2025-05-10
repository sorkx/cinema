<script setup>
import {
    VSwiper,
} from '@/shared/ui/swipers'

const props = defineProps({
    items: {
        type: Array,
    },
})
</script>

<template>
	<section class="home-slider breakout">
		<VSwiper :is-header-slider="true" class="swiper-wrapper">
				<swiper-slide
					v-for="item in props.items"
					:key="item.id"
					class="swiper-slide"
				>
					<slot 
						:item="item" 
						name="slide"
					/>
				</swiper-slide>
			</VSwiper>
	</section>
</template>

<style src="./styles.scss" lang="scss" scoped />