import { 
    ref,
} from 'vue'

export const sidebarOpen = ref(false)

export function toggleSidebar(force) {
    sidebarOpen.value = force ?? !sidebarOpen.value
}