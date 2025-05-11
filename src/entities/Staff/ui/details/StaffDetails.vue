<script setup>
import {
    computed,
    onMounted,
    ref,
} from 'vue'
import {
    RouletteSlider,
} from '@/shared/ui/RouletteSlider'
import{
    VButton,
} from '@/shared/ui/VButton'
import {
    VInfiniteScroll
} from '@/shared/ui/VInfiniteScroll'
import { 
    MovieCard,
} from '@/entities/Movie'

const props = defineProps({
    films: {
        type: Array,
        default: () => [],
    },
    nameEn: {
        type: String,
        default: '',
    },
    nameRu: {
        type: String,
        default: '',
    },
    webUrl: {
        type: String,
        default: '',
    },
    profession: {
        type: String,
        default: '',
    },
    posterUrl: {
        type: String,
        default: '',
    },
    loading: {
        type: Boolean,
        default: false
    }
})

const professionMapping ={
    'ACTOR': 'Актер',
    'ACTRESS': 'Актриса',
    'HIMSELF': 'Сам себя',
    'HERSELF': 'Сама себя',
    'VOICE_MALE': 'Мужской голос',
    'VOICE_FEMALE': 'Женский голос',
    'HRONO_TITR_MALE': 'Указан в титрах',
    'HRONO_TITR_FEMALE': 'Указана в титрах',
    'PRODUCER': 'Продюсер',
    'WRITER': 'Сценарист',
    'EDITOR': 'Редактор',
    'DIRECTOR': 'Режиссер',
}

const currentFilter = ref('')

const filters = computed(() => {
    if (!Array.isArray(props.films)) {
        return []
    }

    const professionMap = props.films.reduce((acc, film) => {
        const key = film.professionKey || 'UNKNOWN'
        acc[key] = (acc[key] || 0) + 1
        return acc
    }, {})


    return Object.entries(professionMap).map(([key, count]) => ({
        professionKey: key,
        count,
    }))
})

const setFilter = (key) => currentFilter.value = key

const filteredFilms = computed(() => {
    if (!props.films) {
        return []
    }

    return props.films.filter(film => film.professionKey === currentFilter.value)
})

defineOptions({
    inheritAttrs: false
})

onMounted(() => setFilter('ACTOR'))
</script>

<template>
	<div
		class="person full-width"
	>
		<div
			v-if="!props.loading" 
			class="person__header"
		>
			<div class="person__image">
				<img
					:src="posterUrl"
					:alt="props.nameEn || props.nameRu"
					class="person__image"
					loading="eager"
					transition="fade"
					transitionall="true"
				/>
			</div>
			<div class="person__title">
				<a 
					:href="props.webUrl" 
					target="_blank"
				>
					<h2>
						{{ props.nameEn || props.nameRu }}
					</h2>
				</a>
				<span>
					{{ props.profession }}
				</span>
			</div>
		</div>
		<div>
			<div class="person__filters">
				<RouletteSlider :items="filters">
					<template #slide="{ item }">
						<VButton
							:key="item.professionKey"
							:modificator="currentFilter === item.professionKey ? 'color-main' : 'color-gray'"
							data-size="normal"
							data-appearance="fill"
							@click="setFilter(item.professionKey)"
						>
							{{ professionMapping[item.professionKey] }}
						</VButton>
					</template>
				</RouletteSlider>
			</div>
		</div>
		<div class="person__movies">
			<VInfiniteScroll 
				:pending="props.loading" 
				:items="filteredFilms ?? []" 
			>
				<template #default="{ item }">
					<MovieCard
						:name-ru="item.nameRu"
						:name-en="item.nameEn"
						:kinopoisk-id="item.filmId"
						:rating-kinopoisk="item.rating"
						class="resize"
						@click="modal.close()"
					/>
				</template>
			</VInfiniteScroll>
		</div>
	</div>
</template>

<style src="./styles.scss" lang="scss" scoped />