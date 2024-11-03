<script setup>
import {
    onMounted,
    ref,
} from 'vue'
import {
    UISymbol,
} from '@/shared/ui/UISymbol'
import {
    VButton
} from '@/shared/ui/VButton'
import {
    VRangeSlider,
} from '@/shared/ui/VRangeSlider'

const props = defineProps({
    items: {
        type: Array,
        default: () => [],
    },
    animation: {
        type: Boolean,
    }
})

const emit = defineEmits(['close', 'reset'])

const localItems = ref(props.items)
const filtersChanged = ref(false)

const closeSidebar = () => {
    emit('close')
}

const initializeItems = () => {
    localItems.value = props.items.map(item => ({
        ...item,
        range: {
            from: item.min,
            to: item.max
        }
    }))
}

const applyFilter = () => {
	    if (filtersChanged.value) {
        localItems.value.forEach(item => {
            item.updateFrom(item.range.from)
            item.updateTo(item.range.to)
        })
        filtersChanged.value = false
        closeSidebar()
    } else {
        closeSidebar()
    }
}

const resetFilter = () => {
    initializeItems()
    emit('reset')
    closeSidebar()
}

const isDefaultRange = (item) => {
    return item.range.from === item.min && item.range.to === item.max
}

const updateRange = (item, type, value) => {
    item.range[type] = value
    filtersChanged.value = true
}

onMounted(() => {
    initializeItems()
})
</script>

<template>
	<div class="sidebar__notifications sidebar__background sidebar__background-in">
		<div
			id="sidebar" 
			class="sidebar__wrapper"
			:class="{ 'sidebar-open': props.animation }"
		>
			<div class="sidebar__notifications--body">
				<div class="sidebar__notifications--header">
					<h2>Фильтры</h2>
					<UISymbol
						name="cross"
						class="close-icon"
						@click="closeSidebar"
					/>
				</div>
				<div class="sidebar-filters">
					<div class="sidebar-filters__body">
						<div
							v-for="item in localItems"
							:key="item" 
							class="sidebar-filters__item"
						>
							<div class="sidebar-filters__item-header">
								<div class="sidebar-filters__item-label">
									{{ item.title }}
								</div>
								<div
									v-if="!isDefaultRange(item)" 
									class="sidebar-filters__item-value"
								>
									{{ item.range.from }} - {{ item.range.to }}
								</div>
								<div 
									v-else
									class="sidebar-filters__item-value"
								>
									Любой
								</div>
							</div>
							<VRangeSlider
								:min="item.min"
								:max="item.max"
								:step="item.step"
								@update:min="updateRange(item, 'from', $event)"
								@update:max="updateRange(item, 'to', $event)" 
								responsive="mobile"
							/>
						</div>
					</div>
					<div class="sidebar-filters__footer">
						<VButton
							size="large"
							appearance="outline"
							modificator="color-white"
							class="footer-button"
							@click="resetFilter"
						>
							Сбросить
						</VButton>
						<VButton
							size="large"
							class="footer-button"
							appearance="fill"
							modificator="color-main"
							@click="applyFilter"
						>
							Применить
						</VButton>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style src="./styles.scss" lang="scss" scoped />