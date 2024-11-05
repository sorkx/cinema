<script setup>
import { 
    MovieCard,
} from '@/entities/Movie'
import {
    VWrapper,
} from '@/shared/ui/VWrapper'
import {
    RouletteSlider,
} from '@/shared/ui/RouletteSlider'
import {
    UISymbol,
} from '@/shared/ui/UISymbol'
import {
    VButton,
} from '@/shared/ui/VButton'

const props = defineProps({
    items: {
        type: Array,
        default: () => [],
    },
    title: {
        type: String,
        default: '',
    },
    to: {
        type: String,
        default: '',
    },
    loading: {
        type: Boolean,
        default: false
    }
})
</script>

<template>
	<VWrapper
		:title="props.title"
	>
		<template #button="slotProps">
			<VButton
				tag="router-link"
				:to="to"
				data-link="Смотреть все"
				size="large"
				modificator="color-main link"
				aria-label="Смотреть все"
				appearance="text"
				:class="slotProps.class"
			>
				<UISymbol
					name="arrow-right" 
				/>
			</VButton>
		</template>

		<template #content>
			<RouletteSlider 
				:items="props.items"
				class="content-right slider"
				appearance="continue"
				:loading="props.loading"
			>
				<template #slide="{ item }">
					<MovieCard 
						:movie="item"
						:key="item.id"
					/>
				</template>
			</RouletteSlider>
		</template>
	</VWrapper>
</template>

<style src="./styles.scss" lang="scss" scoped />