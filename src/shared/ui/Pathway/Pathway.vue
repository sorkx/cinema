<script setup>
const props = defineProps({
    title: {
        type: String,
        required: true
    },
})
</script>

<template>
	<ul class="pathway">
		<li class="pathway__item">
			<router-link
				class="pathway__link router-link-exact-active"
				to="/"
			>
				Главная
			</router-link>
		</li>
		<li class="pathway__separator">
			/
		</li>
		<li class="pathway__item">
			{{ props.title }}
		</li>
	</ul>
</template>

<style src="./styles.scss" lang="scss" scoped />