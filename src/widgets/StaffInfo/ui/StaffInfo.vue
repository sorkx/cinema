<script setup>
import {
    StaffDetails,
    staffModel,
} from '@/entities/Staff'
import {
    storeToRefs,
} from 'pinia'
import {
    onMounted,
    computed,
} from 'vue'
import { 
    useRoute,
} from 'vue-router'

const route = useRoute()

const staffDetailsStore = staffModel()

const personId = computed(() => +route.params.id)

let { 
    person,
} = storeToRefs(staffDetailsStore)

onMounted(async () => await staffDetailsStore.fetchCurrentPerson(personId.value))
</script>

<template>
	<StaffDetails 
		:person="person"
	/>
</template>