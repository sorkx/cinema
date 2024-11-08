<script setup>
import {
    computed,
    ref,
} from 'vue'
import {
    VWrapper,
} from '@/shared/ui/VWrapper'
import {
    ToggleButton,
} from '@/shared/ui/ToggleButton'
import {
    ROUTE_NAMES,
} from '@/shared/lib/constants'
import {
    VImage,
} from '@/shared/ui/VImage'

const props = defineProps({
    staff: {
        type: Object,
        default: () => ({}),
    },
    loading: {
        type: Boolean,
        default: false
    }
})

const formatProfessionKey = {
    DIRECTOR: 'Режиссёр',
    ACTOR: 'Актёры'
}

const showAllStaff = ref(false)

const directors = computed(() => props.staff.filter(member => member.professionKey === 'DIRECTOR'))
const actors = computed(() => props.staff.filter(member => member.professionKey === 'ACTOR'))

const directorsDisplayed = computed(() => {
    if (showAllStaff.value) {
        return directors.value.slice(0, 3)
    }
    return directors.value.slice(0, 2)
})

const actorsDisplayed = computed(() => {
    if (showAllStaff.value) {
        return actors.value.slice(0, 6)
    }
    return actors.value.slice(0, 2)
})

const toggleAllStaff = () => {
    showAllStaff.value = !showAllStaff.value
}

const staffs = computed(() => [
    {
        status: 'Режиссёр',
        list: directorsDisplayed.value,
    },
    {
        status: 'Актёры',
        list: actorsDisplayed.value,
    }
])
</script>

<template>
	<VWrapper
		v-if="!props.loading" 
		:sub-header="true"
		title="Съёмочная группа"
		class="movie-crew"
	>
		<template #button>
			<ToggleButton
				:toggled="showAllStaff" 
				@click="toggleAllStaff"
			/>
		</template>

		<template #content>
			<div class="movie-crew__wrapper">
				<div
					v-for="{ status, list } in staffs"
					:key="status" 
					class="movie-crew__block"
				>
					<h3 class="movie-crew__header">
						{{ status }}
					</h3>
					<div class="movie-crew__list">
						<router-link
							v-for="person in list"
							:key="person.staffId"
							class="user user--media-middle"
							data-size="extra"
							:to="{
								name: ROUTE_NAMES.STAFF_DETAILS,
								params: {
									id: person?.staffId
								}
							}"
						>
							<span class="user__image">
								<VImage
									:src="person?.posterUrl"
									:alt="person?.nameEn || person?.nameRu"
									name="user"
								/>
							</span>
							<span class="user__name">
								<span class="user__title">
									{{ person?.nameEn ||  person?.nameRu }}
								</span>
								<span class="user__status">
									{{ formatProfessionKey[person.professionKey] }}
								</span>
							</span>
						</router-link>
					</div>
				</div>
			</div>
		</template>
	</VWrapper>
</template>

<style src="./styles.scss" lang="scss" scoped />