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
	<div class="module">
		<div class="module__wrap">
			<router-link
				v-if="props.link" 
				:to="{ 
					name: props.link, 
				}"
				class="module__title"
			>
				<h2>{{ props.title }}</h2>
				<UISymbol
					v-if="props.icon" 
					:name="props.icon" 
				/>
			</router-link>
		</div>
		<v-swiper 
			class="module__movies--swiper"
			:swiper-type="props.swiperType"
		>
			<swiper-slide
				v-for="item in props.items"
				:key="item.id"
				:lazy="item.posterUrlPreview ? true : false"
				:class="[`swiper-slide--${props.swiperType}`, 'module__item', 'swiper-slide']"
			>
				<slot 
					:item="item" 
					name="slide" 
				/>
			</swiper-slide>
		</v-swiper>
	</div>
</template>

<style src="./styles.scss" lang="scss" scoped />