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

const breakpoints = reactive({
    320: {
        slidesPerView: 'auto',
    }
})


const { hasNavigation, speed } = toRefs(props)
const modules = [Pagination, Navigation]

</script>

<template>
	<swiper-container
		class="v-swiper"
		:modules="modules"
		:speed="speed"
		mode="vertical"
		lazy="true"
		calculateHeight="true"
		:breakpoints="breakpoints"
		:navigation="{
			nextEl: '.v-swiper__button--next',
			prevEl: '.v-swiper__button--prev'
		}"
	>

		<slot />
  
	  <!-- eslint-disable-next-line vue/no-deprecated-slot-attribute -->
		<div slot="container-end">
			<div class="slider-control right">
				<SwiperButton
					v-if="hasNavigation"
					class="v-swiper__button v-swiper__button--next"
				/>
			</div>
			<div class="slider-control left">
				<SwiperButton
					v-if="hasNavigation"
					class="v-swiper__button v-swiper__button--prev"
				/>
			</div>
		</div>
	</swiper-container>
  </template>

  <style src="./styles.scss" lang="scss" scoped />