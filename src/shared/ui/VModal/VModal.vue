<script setup>
import {
    watch,
    onBeforeUnmount,
} from 'vue'
import {
    UISymbol,
} from '@/shared/ui/UISymbol'
import {
    VButton,
} from '@/shared/ui/VButton'
import {
    useModal
} from '@/shared/lib/use/useModal'

const modal = useModal()

const props = defineProps({
    header: {
        type: Boolean,
        default: false
    }
})

defineOptions({
    inheritAttrs: false
})

const emit = defineEmits(['close'])

const closeModal = () => {
    modal.close()
    emit('close')
}

const stopWatch = watch(() => modal.isOpen, (newValue) => {
    if (newValue) {
        document.body.style.overflow = 'hidden'
    } else {
        document.body.style.overflow = ''
    }
}, { immediate: true })

onBeforeUnmount(() => {
    stopWatch()
    document.body.style.overflow = ''
})
</script>

<template>
	<Teleport to='body'>
		<div 
			v-if="modal.isOpen" 
			class="modal"
		>
			<div class="modal__overlay" />
			<div 
				class="modal__wrapper"
				v-bind="$attrs"
			>
				<VButton
					data-appearance="text"
					data-size="icon"
					class="modal__close"
					modificator="color-white"
					@click="closeModal" 
				>
					<UISymbol name="close" />
				</VButton>
				<div
					v-if="props.header"
					class="modal__header"
				>
					<slot name="header" />
				</div>
				<div class="modal__content">
					<slot name="content" />
				</div>
			</div>
		</div>
	</Teleport>
</template>

<style src="./styles.scss" lang="scss" scoped />