<script setup>
import {
    computed,
} from 'vue'

const props = defineProps({
    modificator: {
        type: String,
        default: '',
    },
    tag: {
        type: String,
        default: 'button',
    }
})

const modificatorClasses = computed(() => {
    return props.modificator.split(' ').map(mod => `v-button--${mod}`);
})
</script>

<template>
	<component
		:is="props.tag" 
		:class="['v-button', ...modificatorClasses]"
		type="button"
	>
		<slot />
	</component>
</template>

<style src="./styles.scss" lang="scss" scoped />