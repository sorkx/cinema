<script setup>
import { 
    Pagination, 
    Navigation,
} from 'swiper/modules'
import {
    toRefs,
    reactive,
} from 'vue'
import { 
    register,
} from 'swiper/element'
import SwiperButton from './buttons/SwiperButton.vue'

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
})

const swiperBreakpoints = reactive({
    140: {
        slidesPerView: 2.5,
        spaceBetween: 20,
    },
    640: {
        slidesPerView: 2.5,
        spaceBetween: 20,
    },
    768: {
        slidesPerView: 3.5,
        spaceBetween: 20,
    },
    968: {
        slidesPerView: 4.5,
        spaceBetween: 20,
    },
    1024: {
        slidesPerView: 4.5,
        spaceBetween: 20,
        slidesPerGroup: 2,
    },
    1440: {
        slidesPerView: 6.5,
        spaceBetween: 28,
        slidesPerGroup: 4,
    }
});


const { hasNavigation, speed } = toRefs(props)
const modules = [Pagination, Navigation]
</script>

<template>
	<swiper-container
		class="v-swiper"
		:modules="modules"
		:speed="speed"
		mode="vertical"
		calculateHeight="true"
		:breakpoints="swiperBreakpoints"
		:navigation="{
			nextEl: '.v-swiper__button--next',
			prevEl: '.v-swiper__button--prev'
		}"
	>

		<slot />
  
	  <!-- eslint-disable-next-line vue/no-deprecated-slot-attribute -->
		<div slot="container-end">
			<SwiperButton
				v-if="hasNavigation"
				class="v-swiper__button v-swiper__button--next"
			/>
			<SwiperButton
				v-if="hasNavigation"
				class="v-swiper__button v-swiper__button--prev"
			/>
		</div>
	</swiper-container>
  </template>

  <style src="./styles.scss" lang="scss" scoped />