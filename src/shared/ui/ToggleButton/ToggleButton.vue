<script setup>
import {
    computed,
} from 'vue'
import {
    VButton,
} from '@/shared/ui/VButton'
import {
    UISymbol,
} from '@/shared/ui/UISymbol'

const props = defineProps({
    toggled: {
        type: Boolean,
        default: false,
    },
})

const toggleText = computed(() => props.toggled ? 'Свернуть' : 'Развернуть')
</script>

<template>
	<VButton
		data-size="small"
		data-appearance="text"
		modificator="color-main"
		:class="['toggle-btn', { 'toggle-btn--toggled': props.toggled }]"
	>
		{{ toggleText }}
		<UISymbol 
			name="arrow-down"
			class="toggle-btn__icon" 
		/>
	</VButton>
</template>

<style src="./styles.scss" lang="scss" scoped />