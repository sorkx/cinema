<script setup>
import {
    ROUTE_NAMES,
} from '@/shared/lib/constants'
import {
    VButton,
} from '@/shared/ui/VButton'

const props = defineProps({
    title: {
        type: String,
        default: '',
    }
})

const emit = defineEmits(['click'])

const onClick = () => {
    emit('click')
}
</script>

<template>
	<div class="empty-block">
		<h2 class="empty-block__header">
			{{ props.title }}
		</h2>
		<VButton
			tag="router-link"
			:to="{ name: ROUTE_NAMES.BROWSE }" 
			data-size="large"
			data-appearance="fill"
			class="empty-block__button"
			modificator="color-main"
			@click="onClick"
		>
			Перейти в каталог
		</VButton>
	</div>
</template>

<style src="./styles.scss" lang="scss" scoped />