<script setup>
const props = defineProps({
    title: {
        type: String,
        default: '',
    },
    subHeader: {
        type: [Boolean, String],
        default: false,
    }
})
</script>

<template>
	<section class="wrapper full-width">
		<div class="wrapper-header">
			<h1 class="wrapper-title">
				{{ props.title }}
			</h1>
			<slot 
				name="button"
				v-bind="{ class: 'wrapper-link' }"
			/>
		</div>
		<div 
			v-if="props.subHeader"
			class="wrapper-subheader" 
		/>
		<slot name="content" />
	</section>
</template>

<style src="./styles.scss" lang="scss" scoped />