<script setup>
import {
    VSwiper,
} from '@/shared/ui/swipers'

const props = defineProps({
    items: {
        type: [Array, Object],
    },
})
</script>

<template>
	<div class="roulette-slider content-right">
		<div class="swiper">
			<VSwiper class="swiper-wrapper">
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
		</div>
	</div>
</template>

<style  src="./styles.scss" lang="scss" scoped />