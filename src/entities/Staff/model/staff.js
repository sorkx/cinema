import { 
    defineStore, 
} from 'pinia'
import {
    ref,
} from 'vue'
import {
    ApiStaff,
} from '../api'

export const useStaffStore = defineStore('staff', () => {
    const staff = ref([])
    const person = ref([])

    const fetchStaff = async (filmId) => {
        const data = await ApiStaff.getAllStaff(filmId)
        staff.value = data
    }

    const fetchCurrentPerson = async (id) => {
        const data = await ApiStaff.getPerson(id)
        person.value = data
    }

    return {
        staff,
        person,
        fetchStaff,
        fetchCurrentPerson,
    }
})