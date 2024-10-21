<script setup>
const props = defineProps({
    modificator: {
        type: String,
        default: '',
    }
})
</script>

<template>
	<button 
		class="v-button" 
		type="button"
		data-size="large"
		:class="`v-button--${props.modificator}`"
	>
		<slot />
	</button>
</template>

<style src="./styles.scss" lang="scss" scoped />