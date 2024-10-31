<script setup>
import {
    computed,
} from 'vue'

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
})

const modificatorClasses = computed(() => {
    return props.modificator.split(' ').map(mod => `v-button--${mod}`);
})
</script>

<template>
	<button 
		class="v-button" 
		type="button"
		:data-size="size"
		:data-appearance="appearance"
		:class="[...modificatorClasses]"
	>
		<slot />
	</button>
</template>

<style src="./styles.scss" lang="scss" scoped />