<script setup>
import {
    VSwiper,
} from '@/shared/ui/swipers'
import {
    VSkeleton,
} from '@/shared/ui/VSkeleton'

const props = defineProps({
    items: {
        type: [Array, Object],
    },
    loading: {
        type: Boolean,
        default: false
    }
})
</script>

<template>
	<div class="roulette-slider">
		<div
			v-if="props.items.length === 0 || props.loading"
			class="roulette-skeleton roulette-skeleton--horizontal"
		>
			<div
				v-for="item in props.items"
				:key="item.id" 
				class="roulette-skeleton__item"
			>
				<div class="roulette-skeleton__card " />
				<div class="roulette-skeleton__name">
					<VSkeleton
						:config="{
							count: 1,
							container: {
								gap: '0.5rem',
							},
							item: {
								height: '2rem',
								maxWidth: '100%',
								borderRadius: '0.5rem'
							}
						}" 
					/>
				</div>
			</div>
		</div>
		<div
			v-else
			class="swiper"
		>
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