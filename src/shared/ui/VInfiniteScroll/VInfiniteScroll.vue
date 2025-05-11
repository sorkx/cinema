<script setup>
import {
    ref
} from 'vue'
import { 
    useInfiniteScroll 
} from '@vueuse/core'
import {
    CircleLoader,
} from '@/shared/ui/loaders'
import {
    VEmptyBlock,
} from '@/shared/ui/VEmptyBlock'

const props = defineProps({
    items: {
        type: Array,
        default: () => []
    },
    pending: {
        type: Boolean,
        default: false
    },
    empty: {
        type: Boolean,
        default: false
    },
    disabledBackdrop: {
        type: Boolean,
        default: false
    },
    hideEmpty: {
        type: Boolean,
        default: false
    }
})

const emits = defineEmits(['loadNext', 'close'])

const prefetch = ref(null)

useInfiniteScroll(prefetch, () => {
    if (props.pending || !props.items.length) return
    emits('loadNext', [])
})
</script>

<template>
	<div 
		v-bind="$attrs" 
		:class="{ 'disabled-backdrop': props.disabledBackdrop }"
		class="infinite-container" 
	>
    <slot 
			v-for="(item, index) in items" 
			:key="item?.id || index" 
			:item="item" 
			:index="index" 
		/>
  </div>
	<CircleLoader v-if="props.pending" />
	<div 
		v-if="!props.pending && !props.items.length" 
		class="infinite-container__empty"
	>
		<slot name="empty">
			<VEmptyBlock 
				v-if="!hideEmpty" 
				title="Поиск не дал результата"
				@close="$emit('close', [])"
			>
				<template #button>
          <slot name="empty-button" />
        </template>
			</VEmptyBlock>
		</slot>
  </div>
  <div ref="prefetch" />
</template>

<style src="./styles.scss" lang="scss" scoped />