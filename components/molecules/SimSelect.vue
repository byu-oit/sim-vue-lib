<template>
    <div style="margin-left: 15px">
        <div class = row h-25>
            <label :class="labelClass" :style="labelStyle">{{ label }}</label>
        </div>
        <div class = row h-75>
            <select
                    v-model="value"
                    :class="theClass"
                    :style="theStyle"
                    type="text"
                    @input="event => { $emit('input', event.target.value) }"
                    @blur="event => { $emit('blur', event.target.value) }"
                    @focus="event => { $emit('focus', event.target.value) }"
                    :disabled="disabled"
                    :readonly="disabled"

            >
                <option v-for="item in items" :key="item">{{ item }}</option>
            </select>
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Vue, Prop } from 'nuxt-property-decorator'

    @Component
        export default class SimSelect extends Vue {

        @Prop({ default: '', type: String })
        value!: string

        @Prop({ default: '', type: String })
        label!: string

        @Prop({ default: '150px', type: String })
        width!: string

        @Prop({ default: () => [] })
        items!: Object[]

        @Prop({ default: false, type: Boolean })
        shadowBorder!: boolean

        @Prop({ default: false, type: Boolean })
        disabled!: boolean

        @Prop({ default: true, type: Boolean })
        textCentered!: boolean

        @Prop({ default: '', type: String })
        size!: string

        @Prop({ default: '', type: String })
        inputClass!: string

        @Prop({ default: '', type: String })
        labelClass!: string

        get theStyle() {
            let style = '';
            if (this.textCentered) {
                style += 'text-align-last: center; '
            }
            else {
                style += 'text-align: left; '
            }
            if (this.shadowBorder) {
                style += 'box-shadow: 2px 2px grey; '
            }
            if (this.width !== '') {
                style += 'width: ' + this.width + ';'
            }
            return style
        }

        get labelStyle() {
            let style = '';
            if (this.label === '**') {
                style = style + 'color: transparent; '
            }

            if (this.size === 'sm') {
                return style + 'font-size: 12px; padding-top: 6px; margin-bottom: -2px'
            }
            else if (this.size === 'lg') {
                return style + 'font-size: 16px; margin-bottom: -2px'
            }
            else {
                return style + 'font-size: 14px; padding-top: 0px; margin-bottom: -2px'
            }
        }

        get theClass() {
            let inputClass: string = this.inputClass + ' form-control'

            if (this.size === 'sm') {
                inputClass += ' form-control-sm'
            }
            else if (this.size === 'lg') {
                inputClass += ' form-control-lg'
            }
            return inputClass
        }

        get theValue() {
            return this.value
        }

    }

</script>
<style scoped>
    label {
        text-align: left;
        padding-left: 8px;
        clear: left;
    }
    select {
        background-color: white;
    }

    select:focus {
        text-decoration: underline;
    }
    select:disabled {
        background-color:#eff1f4;
        color: black
    }
</style>

