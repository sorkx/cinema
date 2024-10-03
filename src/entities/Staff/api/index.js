import {
    fetchInstance,
} from '@/shared/api/instance'
import { 
    API_URL_STAFF,
} from '@/shared/api/config'

export const ApiStaff = {

    getAllStaff: async (filmId) => {
        try {
            return await fetchInstance(API_URL_STAFF, '', { filmId })
        } catch (e) {
            console.error('Error fetching all staff:', e)
        }
    },

    getPerson: async (id) => {
        try {
            return await fetchInstance(API_URL_STAFF, `/${id}`)
        } catch (e) {
            console.error('Error fetching person:', e)
        }
    },
}