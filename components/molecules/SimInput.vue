<template>
    <div class='container'>
        <div class = row h-25>
            <label :class="labelClass" :style="labelStyle">{{ label }}</label>
        </div>
        <div class = row h-75>

            <input
                    v-model="theValue"
                    :class="theClass"
                    :style="theStyle"
                    :placeholder="thePlaceHolder"
                    :required="required"
                    @keypress="event => { $emit('keypress', event.target.value) }"
                    @change="event => { $emit('input', event.target.value) }"
                    @focus="event => { $emit('focus', event.target.value) }"
                    @blur="event => { $emit('blur', event.target.value) }"
                    @mouseover="event => { $emit('mouseover', event.target.value) }"
                    @mouseleave="event => { $emit('mouseleave', event.target.value) }"
                    :readonly="disabled"
                    :disabled="disabled"
                    :position="position"
            />

        </div>

    </div>
</template>

<script lang="ts">
    import { Component, Vue, Prop, Watch } from 'nuxt-property-decorator'

    @Component
        export default class SimInput extends Vue {
            theValue: String | null = null
            hasContent: boolean = false
            currentValue: String = ''

            @Prop({ default: '', type: String })
            value!: string

            @Prop({ default: '', type: String })
            placeHolder!: string

            // If the label is blank the height of the component will remain constant, set label to '**' to reduce the height of the component
            @Prop({ default: '', type: String })
            label!: string

            @Prop({ default: '', type: String })
            width!: string

            @Prop({ default: 'inset', type: String })
            borderStyle!: string

            // either 'sm' or 'lg' or  'md' (medium) is the default
            @Prop({ default: 'inset', type: String })
            size!: string

            // either 'left' or 'center' or  'right': left is the default
            @Prop({ default: 'inset', type: String })
            position!: string

            @Prop({ default: false, type: Boolean })
            disabled!: boolean

            @Prop({ default: false, type: Boolean })
            required!: boolean

            @Prop({ default: true, type: Boolean })
            alwaysShowLabel!: boolean

            @Prop({ default: '', type: String })
            inputClass!: string

            @Prop({ default: '', type: String })
            labelClass!: string

            mounted() {
                this.theValue = this.value
                this.hasContent = this.theValue !== ""
                this.currentValue = this.value
            }

            get showLabel() {
                return this.label !== '**'
            }

            get theStyle() {
                let style = '';
                if (this.width !== '') {
                    style += 'width:' + this.width + ';'
                }
                else {  // the default width = 150px
                    style += 'width: 150px;'
                }

                if (this.required) {
                    style += 'required;'
                }

                if (this.position === 'center') {
                    style += 'text-align: center;'
                }
                else if (this.position === 'right') {
                    style += 'text-align: right;'
                }
                else {
                    style += 'text-align: left;'
                }

                switch(this.borderStyle) {
                    case "inset":
                        style += 'border: 2px inset'
                        break
                    case "outset":
                        style += 'border: 2px outset'
                        break
                    case "shadow":
                        style += 'box-shadow: 2px 2px grey '
                        break
                    case "solid":
                        style += 'border: 1px solid'
                        break
                    case "none":
                        style += 'border: none'
                        break
                }
                return style
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

            get thePlaceHolder() {
                if (this.disabled && this.placeHolder) {
                    return ''
                }
                else if (this.placeHolder) {
                    return this.placeHolder
                }
                else if (this.label === '**') {
                    return ''
                }
                else {
                    return this.label
                }
            }

            get labelStyle() {
                let style = ''

                if (!this.alwaysShowLabel) {
                    if ((!this.placeHolder) && (!this.value) && (!this.theValue) && (!this.disabled)) {
                        style = style + 'visibility: hidden; '
                    } else if ((this.value === '') && (this.theValue === '') && (!this.disabled)) {
                        style = style + 'visibility: hidden; '
                    }
                }
                if (this.label === '**') {
                    style = style + 'color: transparent; '
                }
                if (this.size === 'sm') {
                    return style + 'font-size: 12px; padding-top: 6px; margin-bottom: -2px'
                }
                else if (this.size === 'lg') {
                    return style + 'font-size: 16px; padding-top: 0px; margin-bottom: -2px'
                }
                else {
                    return style + 'font-size: 14px; padding-top: 3px; margin-bottom: -2px'
                }

            }

            @Watch('value')
                onPropertyChanged(newValue: string, oldValue: string) {
                if (newValue === null) {
                    this.theValue = ''
                }
                else {
                    this.theValue = newValue
                }
                this.hasContent = newValue !== ""
            }
    }

</script>

<style scoped lang="styl">
    label {
        text-align: left;
        padding-left: 8px;
        clear: left;
    }
    input {
        background-color:white;
        text-align: left;
        border-radius: 4px;
    }
    input:focus {

        text-decoration: underline;
    }
    input:disabled {
        background-color:#eff1f4;
    }
</style>

