<script setup>
import { 
    Pagination, 
    Navigation,
    Autoplay,
    Parallax,
    FreeMode,
} from 'swiper/modules'
import {
    isGeckoEngine
} from '@/shared/lib/helpers/browserHelper'
import {
    toRefs,
    reactive,
} from 'vue'
import { 
    register,
} from 'swiper/element'
import SwiperButton from './buttons/SwiperButton.vue'
import 'swiper/css/pagination'

register()

const props = defineProps({
    hasNavigation: {
        type: Boolean,
        required: false,
        default: true,
    },
    speed: {
        type: Number,
        required: false,
        default: 700,
    },
    isHeaderSlider: {
        type: Boolean,
        default: false
    }

})

const breakpoints = reactive({
    640: {
        freeMode: false,
    },
})


const { hasNavigation, speed, isHeaderSlider } = toRefs(props)
const modules = [Pagination, Navigation, Autoplay, Parallax, FreeMode]

</script>

<template>
	<swiper-container
		class="v-swiper"
		:modules="modules"
		:class="{ 'header-slider': isHeaderSlider }"
		:speed="speed"
		:mode="isHeaderSlider ? 'horizontal' : 'vertical'"
		lazy="true"
		calculateHeight="true"
		slidesPerView="auto"
		:breakpoints="breakpoints"
		:loop="isHeaderSlider"
		:freeMode="true"
		:pagination="isHeaderSlider ? { 
				clickable: true,  
				el: '.swiper-pagination' 
			} : false
		"
		:parallax="!isGeckoEngine"
		:autoplay="isHeaderSlider ? {
				delay: 6000,
			} : false
		"
		:navigation="{
			nextEl: '.v-swiper__button--next',
			prevEl: '.v-swiper__button--prev',
		}"
	>

		<slot />
  
	  <!-- eslint-disable-next-line vue/no-deprecated-slot-attribute -->
		<div slot="container-end">
			<div v-if="!isHeaderSlider" class="slider-control right">
				<SwiperButton
					v-if="hasNavigation"
					class="v-swiper__button v-swiper__button--next"
				/>
			</div>
			<div v-if="!isHeaderSlider" class="slider-control left">
				<SwiperButton
					v-if="hasNavigation"
					class="v-swiper__button v-swiper__button--prev"
				/>
			</div>

			<div 
				v-if="isHeaderSlider" 
				class="swiper-pagination swiper-pagination-clickable swiper-pagination-bullets swiper-pagination-horizontal" 
			/>
		</div>
	</swiper-container>
  </template>

  <style src="./styles.scss" lang="scss" scoped />