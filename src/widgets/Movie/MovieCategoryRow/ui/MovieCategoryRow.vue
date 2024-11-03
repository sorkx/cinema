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
    name: {
        type: String,
        default: '',
    },
})
</script>

<template>
	<section 
		class="wrapper indent full-width"
	>
		<VWrapper
			:title="props.title"
		>
			<template #button="slotProps">
				<VButton
					tag="router-link"
					:to="{ 
						name: props.name, 
					}"
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
				<div class="content-right">
					<div class="swiper-top">
						<RouletteSlider 
							:items="props.items"
						>
							<template #slide="{ item }">
								<MovieCard 
									:movie="item"
									:key="item.id"
								/>
							</template>
						</RouletteSlider>
					</div>
				</div>
			</template>
		</VWrapper>
	</section>
</template>

<style src="./styles.scss" lang="scss" scoped />