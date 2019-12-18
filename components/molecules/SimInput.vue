<template>
    <div class='container'>
        <div class = row h-25>
            <label :style="labelStyle">{{ label }}</label>
        </div>
        <div class = row h-75>

            <input
                    v-model="theValue"
                    :class="theClass"
                    :style="theStyle"
                    :placeholder="placeHolder"
                    :required="required"
                    v-on:keypress="checkValue"
                    @change="event => { $emit('input', event.target.value) }"
                    @focus="event => { $emit('focus', event.target.value) }"
                    @blur="event => { $emit('blur', event.target.value) }"
                    :readonly="disabled"
                    :disabled="disabled"
                    :position="position"
            />

        </div>

    </div>
</template>

<script>
    export default {
        name: 'sim-input',
        components: {

        },
        props: {
            /* value is the v-model value */
            value: {
                type: String,
                required: false
            },
            placeholder: {
                type: String,
                required: false
            },
            // If the label is blank the height of the component will remain constant, set label to '**' to reduce the height of the component
            label: {
                type: String,
                required: false
            },
            disabled: {
                type: Boolean,
                default: false
            },
            width: {
                type: String,
                default: ''
            },
            borderStyle: {
                type: String,
                default: 'inset'
            },
            // either 'sm' or 'lg'; md (medium) is the default
            size: {
                type: String,
                default: ''
            },
            required: {
                type: Boolean,
                default: false
            },
            position: {
                type: String,
                default: 'left'
            },
            alwaysShowLabel: {
                type: Boolean,
                default: true
            }
        },
        computed: {
            showLabel() {
                return this.label !== '**'
            },
            theStyle() {
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
            },

            theClass() {
                if (this.size === 'sm') {
                    return 'form-control form-control-sm'
                }
                else if (this.size === 'lg') {
                    return 'form-control form-control-lg'
                }
                else {
                    return 'form-control'
                }
            },

            placeHolder() {
                if (this.disabled && this.placeholder) {
                    return ''
                }
                else if (this.placeholder) {
                    return this.placeholder
                }
                else if (this.label === '**') {
                    return ''
                }
                else {
                    return this.label
                }
            },

            labelStyle() {
                let style = ''

                if (!this.alwaysShowLabel) {
                    if ((!this.placeholder) && (!this.value) && (!this.theValue) && (!this.disabled)) {
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

            },

            activeLabelClasses() {
                return {
                    'label__active--canscale': this.settings.scale
                }
            },
            containerClasses() {
                const classes = {
                    'has-line': this.settings.line,
                    'input__container--focus': this.hasFocus,
                    'input__container--content': this.hasContent
                };
                if (this.settings.hasError) {
                    classes[this.settings.classes.error] = true;
                }
                return classes;
            },
            accessibilityStyle() {
                let color = this.settings.color.lineColor;
                if (this.settings.hasError) {
                    color = this.settings.color.errorColor;
                }
                return {
                    'background-color': color
                }
            },
            labelColor() {
                if (!this.settings.hasError) {
                    return this.hasFocus ? this.settings.color.focusColor : this.settings.color.blurredColor
                } else {
                    return this.settings.color.errorColor;
                }
            },
            activeLabelStyle() {
                return {
                    top: this.settings.labelOffset.top + 'px',
                    left: this.settings.labelOffset.left + 'px',
                    color: this.labelColor
                }
            },
            inputContainerStyle() {
                return {
                    height: this.settings.height + 'px'
                }
            },
        },
        methods: {
            clear() {
                this.formElement.value = '';
                this.hasContent = false;
                this.hasFocus = false;
                this.$emit('clear');
            },
            focus(event) {
                this.hasFocus = true;
                if ((this.settings.clearOnInput) && (this.formElement.type !== 'select-one'))
                {
                    this.formElement.select()
                }
                this.$emit('focus');
            },
            checkValue:function() {
                this.currentValue = this.value
            },
            input(event) {
                this.hasFocus = true;
                this.hasContent = event.target.value !== '';
                this.$emit('input');
            },
            blur(event) {
                this.hasFocus = false;
                this.$emit('blur');
            }
        },
        watch: {
            value: function (newValue) {
                if (newValue === null) {
                    this.theValue = ''
                }
                else {
                    this.theValue = newValue
                }
                this.hasContent = newValue !== ""
            }
        },
        mounted() {
            if (this.formElement) {
                this.formElement.addEventListener('input', this.input);
                this.formElement.addEventListener('blur', this.blur);
                this.formElement.addEventListener('focus', this.focus);
                if (this.formElement.type === 'select-one') {
                    this.hasContent = true;
                    this.settings.scale = false;
                    this.settings.hasClearButton = false;
                    this.hasfocus = true;
                }
                else {
                    if (this.disabled) {
                        this.hasContent = true
                    } else {
                        this.hasContent = this.theValue !== ""
                    }
                }
            }
            this.theValue = this.value
            this.hasContent = this.theValue !== ""
            this.currentValue = this.value
        },
        data () {
            return {
                currentValue: '',
                theValue: null,
                defaultSettings: {
                    classes: {
                        error: 'has-error'
                    },
                    hasError: false,
                    height: 50,
                    hasClearButton: true,
                    clearOnInput: true,
                    line: true,
                    scale: true,
                    labelOffset: {
                        top: 5,
                        left: 8
                    },
                    color: {
                        focusColor: '#5D7998',
                        lineColor: '#5D7998',
                        errorColor: '#ff0000',
                        blurredColor: 'rgba(3, 23, 40, 0.34)'
                    }
                },
                hasFocus: false,
                hasContent: false
            }
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

