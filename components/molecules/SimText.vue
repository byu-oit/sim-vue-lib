<template>
    <div class='container'>
        <div class = row h-25>
            <label :class="labelClass" :style="labelStyle">{{ label }}</label>
        </div>
        <div class = row h-75>
          <textarea
                  v-model="theValue"
                  :class="theClass"
                  :style="theStyle"
                  :rows="getRows"
                  :placeholder="placeHolder"
                  :minlength="minLength"
                  :maxlength="maxLength"
                  :inputClass="inputClass"
                  :labelClass="labelClass"
                  @keypress="event => { $emit('keypress', event.target.value) }"
                  @change="event => { $emit('input', event.target.value) }"
                  @focus="event => { $emit('focus', event.target.value) }"
                  @blur="event => { $emit('blur', event.target.value) }"
                  @mouseover="event => { $emit('mouseover', event.target.value) }"
                  @mouseleave="event => { $emit('mouseleave', event.target.value) }"
                  :readonly="disabled"
                  :disabled="disabled"
                  :required="required"
          ></textarea>
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Vue, Prop, Watch } from 'nuxt-property-decorator'

    @Component
    export default class SimText extends Vue {

        @Prop({ default: '', type: String })
        value!: string

        @Prop({ default: '', type: String })
        placeholder!: string

        @Prop({ default: 'just a test', type: String })
        label!: string

        @Prop({ default: '150px', type: String })
        width!: string

        @Prop({ default: '0', type: String })
        minLength!: string

        @Prop({ default: '', type: String })
        maxLength!: string

        @Prop({ default: '', type: String })
        inputClass!: string

        @Prop({ default: '', type: String })
        labelClass!: string

        @Prop({ default: true, type: Boolean })
        alwaysShowLabel!: boolean

        @Prop({ default: false, type: Boolean })
        disabled!: boolean

        @Prop({ default: 0, type: Number })
        cols!: number

        @Prop({ default: 0, type: Number })
        rows!: number

        @Prop({ default: 'inset', type: String })
        borderStyle!: string

        /// valid entries are 'sm', 'md' or 'lg'
        @Prop({ default: 'md', type: String })
        size!: string

        @Prop({ default: false, type: Boolean })
        required!: boolean

        currentValue: string = ''
        theValue: string | null = null
        hasFocus: boolean = false
        hasContent: boolean =  false
        hasError: boolean = false
        focusColor: string = '#5D7998'
        blurredColor: string = 'rgba(3, 23, 40, 0.34)'
        errorColor: string = '#ff0000'
        lineColor: string = '#5D7998'

        mounted() {
            this.theValue = 'This is the value of the text area'
            if (this.disabled) {
                this.hasContent = true
            }
            else {
                this.hasContent = this.theValue !== ""
            }
            this.theValue = this.value;
            this.hasContent = this.theValue !== "";
            this.currentValue = this.value
        }

        get theStyle() {
            let style = 'width: '+ this.width + ';'
            if (this.required) {
                style = style + 'required;'
            }

            if (this.required) {
                style = style + 'required;'
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

        get getRows() {
            let rows = 0
            if (this.rows !== 0) {
                rows = this.rows
            }
            else {  // the default height = 5 rows
                rows = 5
            }
            return rows
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

        get placeHolder() {
            if (this.disabled && !this.placeholder) {
                return ''
            }
            else if (this.placeholder) {
                return this.placeholder
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

        get labelColor() {
            if (!this.hasError) {
                return this.hasFocus ? this.focusColor : this.blurredColor
            } else {
                return this.errorColor;
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

<style scoped>

    label {
        text-align: left;
        clear: left;
        padding-left: 7px;
    }
    input {
        background-color:white;
        text-align: left;
        border-radius: 4px;
    }
    input:focus {
        font-size: 14px;
        text-decoration: underline;
    }
    input:disabled {
        background-color:#eff1f4;
    }

</style>
