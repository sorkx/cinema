<script setup>
import {
    VSwiper,
} from '@/shared/ui/swipers'
import {
    UISymbol,
} from '@/shared/ui/UISymbol'

const props = defineProps({
    items: {
        type: [Array, Object],
    },
    link: {
        type: String,
        default: '',
    },
    title: {
        type: String,
        default: '',
    },
    icon: {
        type: String,
        default: '',
    },
    swiperType: {
        type: String,
        required: true,
    },
})
</script>

<template>
	<section 
		class="module full-width"
		:class="props.link.toLocaleLowerCase()"
	>
		<div class="wrapper-header">
			<h1
				class="wrapper-title"
			>
				{{ props.title }}
			</h1>
			<router-link
				v-if="props.link" 
				:to="{ 
					name: props.link, 
				}"
				data-link="Смотреть все"
				data-size="large"
				aria-label="Смотреть все"
				class="module__link"
			>
				<UISymbol
					v-if="props.icon" 
					:name="props.icon" 
				/>
			</router-link>
		</div>
		<div class="container-right swiper-top">
			<VSwiper 
				class="module__movies--swiper"
				:swiper-type="props.swiperType"
			>
				<swiper-slide
					v-for="item in props.items"
					:key="item.id"
					:class="[
						`swiper-slide--${props.swiperType}`, 
						'module__item', 
						'swiper-slide',
					]"
				>
					<slot 
						:item="item" 
						name="slide" 
					/>
				</swiper-slide>
			</VSwiper>
		</div>
	</section>
</template>

<style src="./styles.scss" lang="scss" scoped />