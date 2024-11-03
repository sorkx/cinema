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
		modificator="color-main"
		size="small"
		appearance="text"
		class="toggle-btn"
		:class="{ 'toggle-btn--toggled': props.toggled }"
	>
		{{ toggleText }}
		<UISymbol 
			name="arrow-down"
			class="toggle-btn__icon" 
		/>
	</VButton>
</template>

<style src="./styles.scss" lang="scss" scoped />