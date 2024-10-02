import { 
    defineStore, 
} from 'pinia'
import {
    ref,
} from 'vue'
import {
    API_URL_STAFF,
    API_KEY,
} from '@/shared/api'

export const useStaffStore = defineStore('staff', () => {
    const staff = ref([])
    const person = ref([])

    const fetchStaff = async (filmId) => {
        try {
            const response = await fetch(`${API_URL_STAFF}?filmId=${filmId}`, {
                method: 'GET',
                headers: {
                    'X-API-KEY': API_KEY,
                    'Content-Type': 'application/json',
                },
            })
            const data = await response.json()
	
            staff.value = data
	
            console.log('staff', staff.value)
        } catch(e) {
            console.error('Ошибка получения персонала', e)
        }
    }

    const fetchCurrentPerson = async (id) => {
        try {
            const response = await fetch(`${API_URL_STAFF}/${id}`, {
                method: 'GET',
                headers: {
                    'X-API-KEY': API_KEY,
                    'Content-Type': 'application/json',
                },
            })
            const data = await response.json()
            person.value = data
	
            console.log('person.value', person.value)
        }catch(e) {
            console.error('Ошибка получения данных о человеке', e)
        }
    }

    return {
        staff,
        person,
        fetchStaff,
        fetchCurrentPerson,
    }
})