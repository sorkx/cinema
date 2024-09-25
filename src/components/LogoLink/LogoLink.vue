<script setup>
import { 
    UISymbol, 
} from '~/vue-app-components.js'
</script>

<template>
    <router-link to="/" class="logo-link">
        <UISymbol name="cinema" />

        <div>
            <div class="logo-link__title">
                Sork
            </div>
            <div class="logo-link__subtitle">
                Cinema
            </div>
        </div>
    </router-link>
</template>

<style src="./logoLink.scss" lang="scss" scoped />
