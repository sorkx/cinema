<script setup>
import {
    UISymbol,
} from '@/shared/ui/UISymbol'

defineOptions({
    inheritAttrs: false
})
</script>

<template>
	<div class="v-checkbox">
		<label v-bind="$attrs">
			<input 
				type="checkbox"
			/>
			<span class="v-checkbox__icon">
				<UISymbol 
					name="check"
				/>
			</span>
			<slot />
		</label>
	</div>
</template>

<style src="./styles.scss" lang="scss" scoped />