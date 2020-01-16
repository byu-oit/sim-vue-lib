<template>
    <div class='container'>
        <div class = row h-25>

            <label :style="labelStyle">{{ label }}</label>

        </div>
        <div class = row h-75>

      <textarea
              v-model="theValue"
              :class="theClass"
              :style="theStyle"
              :rows="getRows"
              :cols="getCols"
              :placeholder="placeHolder"
              v-on:keypress="checkValue"
              @change="event => { $emit('input', event.target.value) }"
              @focus="event => { $emit('focus', event.target.value) }"
              @blur="event => { $emit('blur', event.target.value) }"
              :readonly="disabled"
              :disabled="disabled"
              :required="required"
      ></textarea>

        </div>

    </div>
</template>

<script>
    export default {
        name: 'sim-area',

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
            label: {
                type: String,
                required: false
            },
            disabled: {
                type: Boolean,
                default: false
            },
            cols: {
                type: String,
                default: ''
            },
            rows: {
                type: String,
                default: ''
            },
            borderStyle: {
                type: String,
                default: 'outset'
            },
            // either 'sm' or 'lg'
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
            this.theValue = this.value;
            this.hasContent = this.theValue !== "";
            this.currentValue = this.value
        },

        computed: {
            theStyle() {
                let style = '';
                if (this.required) {
                    style = style + 'required;'
                }

                if (this.required) {
                    style = style + 'required;'
                }

                if (this.borderStyle !== '') {
                    if ((this.borderStyle === 'inset') || (this.borderStyle === 'outset')) {
                        style = style + 'border: 2px ' + this.borderStyle
                    }
                    else {
                        style = style + 'border: 1px ' + this.borderStyle
                    }
                }
                else {
                    style = style + 'border: none'
                }
                return style
            },

            getRows() {
                let rows;
                if (this.rows !== '') {
                    rows = this.rows
                }
                else {  // the default height = 5 rows
                    rows = 5
                }
                return rows
            },

            getCols() {
                let cols;
                if (this.cols !== '') {
                    cols = this.cols
                }
                else {  // the default width = 7 cols
                    cols = 7
                }
                return cols
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
                if (this.disabled && !this.placeholder) {
                    return ''
                }
                else if (this.placeholder) {
                    return this.placeholder
                }
                else {
                    return this.label
                }
            },

            labelStyle() {
                let style = '';
                if ((!this.placeholder) && (!this.value) && (!this.theValue) && (!this.disabled)) {
                    style = style + 'visibility: hidden; '
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
                let classes = {
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
                // return {
                //   width: this.settings.width + 'px'
                // }
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

        data () {
            return {
                currentValue: '',
                theValue: null,
                defaultSettings: {
                    classes: {
                        error: 'has-error'
                    },
                    hasError: false,
                    // width: 300,
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

<style scoped>

    label {
        text-align: left;
        clear: left;
        padding-left: 7px;
    }
    textarea {
        background-color:white;
        text-align: left;
        border-radius: 4px;
    }
    textarea:focus {
        font-size: 14px;
        text-decoration: underline;
    }
    textarea:disabled {
        background-color:#eff1f4;
    }

</style>
