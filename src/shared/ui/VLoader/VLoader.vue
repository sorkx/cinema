<script setup>
import {
    UISymbol,
} from '@/shared/ui/UISymbol'

const props = defineProps({
    modificator: {
        type: String,
        default: '',
    },
    logoLoader: {
        type: Boolean,
        default: false
    },
    title: {
        type: String,
        default: '',
    }
})

defineOptions({
    inheritAttrs: false
})
</script>

<template>
	<div :class="['loader', `loader--${props.modificator}`]">
		<div
			v-if="props.logoLoader" 
			class="logo loader__logo"
			v-bind="$attrs"
		>
			<UISymbol 
				name="logo"
			/>
		</div>
		<div
			v-else 
			class="mobile-header loader__logo"
		>
			{{ props.title }}
		</div>
	</div>
</template>

<style src="./styles.scss" lang="scss" scoped />