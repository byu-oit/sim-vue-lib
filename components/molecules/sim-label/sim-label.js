import SimInput from './index.vue'

const SimLabel = {
    install(Vue, _)
    {
        Vue.component(SimInput.name, SimInput)
    }
}

if (typeof window !== 'undefined' && window.Vue)
{
    window.Vue.use(SimInput)
}

export default SimInput
