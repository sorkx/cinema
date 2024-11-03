<script setup>
import {
    ref,
    watch,
} from 'vue'
import {
    UISymbol,
} from '@/shared/ui/UISymbol'
import {
    MovieSearch,
} from '@/features/Movies/MovieSearch'
import { 
    useRouter,
} from 'vue-router'
import {
    VButton,
} from '@/shared/ui/VButton'
import {
    LogoLink,
} from '@/shared/ui/LogoLink'
import {
    provideModal
} from '@/shared/lib/use/useModal'

const { 
    closeModal, 
    isOpen, 
    openModal 
} = provideModal()

const router = useRouter()

const items = [
    {
        id: 'main',
        title: 'Главная',
        to: '/',
        class: 'main-icon',
    },
    {
        id: 'films',
        title: 'Фильмы',
        to: '/movies/films',
        class: 'film-icon',
    },
    {
        id: 'serials',
        title: 'Сериалы',
        to: '/movies/serials',
        class: 'serial-icon',
    },
    {
        id: 'favorite',
        title: 'Избранное',
        to: '/favorite',
        class: 'favorite-icon',
    }
]
</script>

<template>
	<header class="header container">
		<div class="header__container">
			<div class="mobile__button">
				<template v-if="router.currentRoute.value.path !== '/'">
					<VButton
						@click="router.go(-1)"
						appearance="text"
						size="normal"
						modificator="mobile rounded color-white"
					>
						<UISymbol name="arrow-left" />
					</VButton>
				</template>
			</div>
			<LogoLink class="header__logo" />
			<div class="header__spacer" />
			<ul class="header-menu">
				<li 
					v-for="item in items" 
					:key="item.id"
					class="header-menu__item"
				>
					<router-link
						:to="item.to"
						active-class="active-link"
						class="header-menu__link"
						aria-current="page"
					>
						{{ item.title }}
					</router-link>
				</li>
			</ul>
			<div class="header__spacer" />
			<VButton
				@click="openModal"
				modificator="search rounded color-white"
				appearance="text"
				data-size="normal"
				class="search__icon"
			>
				<UISymbol 
					name="search"
				/>
			</VButton>
			<MovieSearch
				v-if="isOpen" 
				focus-on-mounted
				@close="closeModal"
			/>
		</div>
	</header>
	<div class="header-bottom__mobile">
		<div class="header-bottom__container">
			<div
				v-for="item in items"
				:key="item.id"
			>
				<router-link 
					class="header-bottom__link" 
					:to="item.to"
					active-class="active-link--mobile"
				>
					<div :class="['mobile-icon', item.class]" />
					{{ item.title }}
				</router-link>
			</div>
		</div>
	</div>
</template>

<style src="./styles.scss" lang="scss" scoped />