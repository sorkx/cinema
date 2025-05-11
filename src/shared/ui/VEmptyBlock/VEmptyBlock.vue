<script setup>
import {
    VButton,
} from '@/shared/ui/VButton'

const props = defineProps({
    title: {
        type: String,
        default: '',
    },
    name: {
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
		<slot>
			<h2 class="empty-block__header">
				{{ props.title }}
			</h2>
			<slot name="button">
				<VButton
					tag="router-link"
					data-size="large"
					data-appearance="fill"
					class="empty-block__button"
					modificator="color-main"
					@click="onClick"
				>
					{{ props.name }}
				</VButton>
			</slot>
		</slot>
	</div>
</template>

<style src="./styles.scss" lang="scss" scoped />