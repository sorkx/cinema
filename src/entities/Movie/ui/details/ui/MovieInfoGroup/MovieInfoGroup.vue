<script setup>
import { h, normalizeStyle } from 'vue'

const props = defineProps({
    gap: {
        type: String,
        default: '16px'
    },
    width: {
        type: String,
        default: '1px'
    },
    height: {
        type: String,
        default: '16px'
    },
    color: {
        type: String,
        default: '#fff'
    },
    br: {
        type: String,
        default: '0'
    },
    styles: {
        type: Object,
        default: () => ({})
    },
    content: {
        type: String,
        default: ''
    }
})

const slots = defineSlots()

const getVNodes = (slot) => {
    let vnodes = []

    if (slot instanceof Array) {
        slot.forEach(childNode => {
            if (childNode.type.toString() === Symbol('v-fgt').toString()) {
                vnodes.push(...childNode.children)
            } else if (childNode.type.toString() !== Symbol('v-cmt').toString()) {
                vnodes.push(childNode)
            }
        })
    }
    return vnodes
}

const renderNodes = () => {
    const vnodesInDefaultSlot = slots.default ? slots.default() : []
    const vnodes = getVNodes(vnodesInDefaultSlot)
    const vnodesToRender = []

    vnodes.forEach((el, index) => {
        vnodesToRender.push(h(el.type, [el.children]))
        if (index < vnodes.length - 1) {
            vnodesToRender.push(
                h(
                    'div',
                    {
                        class: 'movie-info-group__divider',
                        style: normalizeStyle({
                            width: props.width,
                            height: props.height,
                            backgroundColor: props.color,
                            borderRadius: props.br,
                            ...props.styles,
                        }),
                    },
                    [props.content],
                ),
            )
        }
    })
    return vnodesToRender
}

const VNode = () => h('div', { style: { gap: props.gap }, class: 'movie-info-group' }, renderNodes())
</script>

<template>
	<v-node />
</template>

<style src="./styles.scss" lang="scss" scoped />