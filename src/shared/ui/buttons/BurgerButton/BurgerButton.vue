<script setup>
import {
    VButton,
} from '@/shared/ui/buttons'
import {
    UISymbol,
} from '@/shared/ui/UISymbol'
</script>

<template>
	<div class="mobile">
		<VButton modificator="menu" class="mobile__button">
			<UISymbol name="burger" />
		</VButton>
	</div>
</template>

<style src="./styles.scss" lang="scss" scoped />