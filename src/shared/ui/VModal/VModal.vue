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
    size: {
        type: String,
        default: '',
    },
    header: {
        type: Boolean,
        default: false
    }
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
		<Transition name="modal">
			<div 
				v-if="modal.isOpen" 
				class="modal"
			>
				<div class="modal__overlay" />
				<div 
					class="modal__wrapper"
					:data-size="props.size"
				>
					<VButton
						@click="closeModal" 
						class="modal__close"
						appearance="text"
						size="icon"
						modificator="color-white"
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
		</Transition>
	</Teleport>
</template>

<style src="./styles.scss" lang="scss" scoped />