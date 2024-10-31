<script setup>
import {
    LogoLink,
} from '@/shared/ui/LogoLink'
</script>

<template>
	<div class="page-container__footer">
		<footer class="footer">
			<div class="container footer__container">
				<div class="footer__bottom">
					<div class="description--footer">
						Просматривая материалы, находящиеся на данном сайте, Вы обязуетесь выполнять
                		условия пользовательского соглашения.
					</div>
					<LogoLink class="logo" />
				</div>
			</div>
		</footer>
	</div>
</template>

<style src="./styles.scss" lang="scss" scoped />