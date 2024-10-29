<script setup>
const props = defineProps({
    modificator: {
        type: String,
        default: '',
    },
    size: {
        type: String,
        default: '',
    },
    appearance: {
        type: String,
        default: '',
    },
    active: {
        type: Boolean,
        default: false
    }
})
</script>

<template>
	<button 
		class="v-button" 
		type="button"
		:data-size="size"
		:data-appearance="appearance"
		:class="[`v-button--${props.modificator}`, { active: props.active }]"
	>
		<slot />
	</button>
</template>

<style src="./styles.scss" lang="scss" scoped />