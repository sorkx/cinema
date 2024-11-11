import { 
    ref, 
    provide, 
    inject 
} from 'vue'

const modalSymbol = Symbol()

export function provideModal() {
    const isModalOpen = ref(false)

    const openModal = () => {
        isModalOpen.value = true
    }

    const closeModal = () => {
        isModalOpen.value = false
    }

    provide(modalSymbol, {
        isOpen: isModalOpen,
        open: openModal,
        close: closeModal
    })

    return {
        isOpen: isModalOpen,
        openModal,
        closeModal
    }
}

export function useModal() {
    const modal = inject(modalSymbol, {
        isOpen: ref(false),
        open: () => {},
        close: () => {}
    })
  
    return modal
}
