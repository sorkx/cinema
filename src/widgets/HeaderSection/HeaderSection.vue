<script setup>
import {
    LogoLink,
} from '@/shared/ui/LogoLink'

const items = [
    {
        id: 'main',
        title: 'Главная',
        to: '/',
    },
    {
        id: 'films',
        title: 'Фильмы',
        to: '/serials',
    },
    {
        id: 'serials',
        title: 'Сериалы',
        to: '/films',
    },
    {
        id: 'favorite',
        title: 'Избранное',
        to: '/favorite',
    }
]
</script>

<template>
	<div class="header__wrapper">
		<header class="header content-container ">
			<nav class="header__content">
				<LogoLink />
			</nav>
		</header>
	</div>
</template>

<style src="./styles.scss" lang="scss" scoped />