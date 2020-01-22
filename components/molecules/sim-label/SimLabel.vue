<template>
    <div class="input__container" :class="containerClasses" :style="inputContainerStyle">
        <div class="icon__container clear__icon" @mousedown.stop.prevent="clear" v-if="settings.hasClearButton">
            <svg transform="scale(1.5)" width="10" height="11" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M1490 1322q0 40-28 68l-136 136q-28 28-68 28t-68-28l-294-294-294 294q-28 28-68 28t-68-28l-136-136q-28-28-28-68t28-68l294-294-294-294q-28-28-28-68t28-68l136-136q28-28 68-28t68 28l294 294 294-294q28-28 68-28t68 28l136 136q28 28 28 68t-28 68l-294 294 294 294q28 28 28 68z" fill="#fff"/></svg>
        </div>
        <div class="accessibility__icon" :style="accessibilityStyle" v-if="settings.line"></div>
        <div style="margin-bottom: -10px;"  class="slot-container" ref="input-container">
            <input
                    :value="newValue"
                    :style="theStyle"
                    type="text"
                    class="input"
                    :disabled="config.disabled"
                    :required="required"
                    @input="event => { $emit('input', event.target.value) }"
                    @change="event => { $emit('change', event.target.value) }"
                    @blur="event => { $emit('blur', event.target.value) }"
                    @focus="event => { $emit('focus', event.target.value) }"
                    @mouseover="event => { $emit('mouseover', event.target.value) }"
                    @mouseleave="event => { $emit('mouseleave', event.target.value) }"
                    maxlength="40" size="20"
                    >
        </div>
        <label v-if="newValue===''" class="label__placeholder SIM-no-wrap" :for="labelName">{{ config.label }}</label>
        <label v-else class="entryLabel" :class="activeLabelClasses" :style="activeLabelStyle" :for="labelName">{{ config.label }}</label>
    </div>
</template>

<script lang="ts">
    import { Component, Vue, Prop, Watch } from 'nuxt-property-decorator'

    interface Config {
        hasClearButton: boolean,
        name: string,
        label: string

    }

    interface FormElements extends HTMLCollection {
        value: HTMLInputElement;
    }

    interface Settings {
        classes: {
            error: string
        },
        hasError: boolean,
        height: number,
        clearOnInput: boolean,
        line: boolean,
        scale: boolean,
        labelOffset: {
            top: number,
            left: number
        },
        color: {
            focusColor: string,
            lineColor: string,
            errorColor: string,
            blurredColor: string
        }
    }

    @Component
    export default class SimLabel extends Vue {

        @Prop({ default: {}, type: Object })
        config!: Config

        @Prop({ default: '', type: String })
        value!: string

        @Prop({ default: false, type: Boolean })
        required!: boolean

        @Prop({ default: false, type: Boolean })
        centered!: boolean

        @Prop({ default: '200px', type: String })
        width!: string

        defaultSettings: Settings = {
            classes: {
                error: 'has-error'
            },
            hasError: false,
            height: 50,
            clearOnInput: true,
            line: true,
            scale: true,
            labelOffset: {
                top: 0,
                left: 8
            },
            color: {
                focusColor: '#5D7998',
                lineColor: '#5D7998',
                errorColor: '#ff0000',
                blurredColor: 'rgba(3, 23, 40, 0.34)'
            }
        }

        hasFocus: boolean = false
        hasContent: boolean = false

        get newValue() {
            return this.value
        }

        get theStyle() {
            let style = 'width: ' + this.width
            if (this.centered) {
                style += '; text-align: center'
            }
            return style
        }

        get activeLabelClasses() {
            return {
                'label__active--canscale': this.settings.scale
            }
        }

        get containerClasses() {
            const classes = {
                'has-line': this.settings.line,
                'input__container--focus': this.hasFocus,
                'input__container--content': this.hasContent
            };
            if (this.settings.hasError) {
                classes[this.settings.classes.error] = true;
            }
            return classes;
        }

        get labelName() {
            if (this.config.name !== undefined) {
                return this.config.name
            }
            if (this.config.label) {
                return this.config.label.toLowerCase();
            }
            return "LBL" + Math.random()
        }

        get accessibilityStyle() {
            let color = this.settings.color.lineColor;
            if (this.settings.hasError) {
                color = this.settings.color.errorColor;
            }
            return {
                'background-color': color
            }
        }

        get labelColor() {
            if (!this.settings.hasError) {
                return this.hasFocus ? this.settings.color.focusColor : this.settings.color.blurredColor
            } else {
                return this.settings.color.errorColor;
            }
        }

        get activeLabelStyle() {
            return {
                top: this.settings.labelOffset.top + 'px',
                left: this.settings.labelOffset.left + 'px',
                color: this.labelColor
            }
        }

        get inputContainerStyle() {
            return {
                height: this.settings.height + 'px'
            }
        }

        get settings() {
            return Object.assign({}, this.defaultSettings, this.config);
        }

        clear() {
            this.hasContent = false;
            this.hasFocus = false;
            this.$emit('clear');
        }

        focus(event) {
            this.hasFocus = true;
            this.$emit('focus');
        }

        input(event) {
            this.hasFocus = true;
            this.hasContent = event.target.value !== '';
            this.$emit('input');
        }

        blur(event) {
            this.hasFocus = false;
            this.$emit('blur');
        }

        mounted() {
            const formElement = this.$refs.querySelector as HTMLInputElement
            if (formElement) {
                formElement.addEventListener('input', this.input);
                formElement.addEventListener('blur', this.blur);
                formElement.addEventListener('focus', this.focus);
                if (formElement.type === 'select-one') {
                    this.hasContent = true;
                    this.settings.scale = false;
                    this.settings.hasClearButton = this.config.hasClearButton;
                    this.hasFocus = true;
                }
                else
                {

                    this.hasContent = formElement.value !== ""
                }
            }
        }
    }
</script>

<style scoped lang="styl">
    @import './style/_variables.styl';
    .input__container {
        position: relative;
        padding: 0 8px;
        transition: 0.2s cubic-bezier($easeInOutCubic);
    .slot-container {
        height: 100%;
    input {
        height: 100%;
        font-size: 16px;
        padding: 0 0;
        border: 0;
        display: block;
        position: relative;
        background-color: transparent;
        transition: 0.2s cubic-bezier($easeInOutCubic);
    }
    }

    &.has-line{
    &:after, .character-counter-container:after {
         content: '';
         position: absolute;
         display: inline-block;
         top: auto;
         left: 8px;
         right: 8px;
         height: 1px;
         background-color: #E4E7E9;
         z-index: 3;
         bottom: 0;
     }
    }

    & + .input__container:before {
          display: none;
      }
    // Is Focused
        &.input__container--focus {
    .accessibility__icon {
        transform: scaleX(1);
    }
    }

    // Has content
        &.input__container--content {
    .character-counter-container {
        height: 32px;
    }
    label {
    &.label__placeholder {
         opacity: 0;
     }
    }
    .label__active {
        opacity: 1;
    &.label__active--canscale {
         transform: translate3d(0, 0px, 0) scale(.85);
     }
    }
    input, .label__placeholder {
        transform: translate3d(0, 6px, 0);
    }
    }

    // Has content & is focused
        &.input__container--focus.input__container--content {
    label {
    &.label__active.label__active--canscale {
         opacity: 1;
         transform: translate3d(0, 0px, 0);
     }
    &.label__placeholder {
         opacity: 0;
     }

    }
    .clear__icon {
        opacity: 1;
    }
    .accessibility__icon {
        transform: scaleX(1);
    }
    .carret__icon--down svg path {
        fill: $color__icon-blue;
    }
    }
    }
    .icon__container {
        opacity: 0;
        position: absolute;
        height: 20px;
        width: 20px;
        right: 16px;
        top: 50%;
        z-index: 1;
        transform: translate3d(0, -40%, 0);
    }
    .accessibility__icon {
        position: absolute;
        height: 2px;
        top: auto;
        left: 8px;
        right: 8px;
        bottom: 0;
        z-index: 9;
        border-radius: 100px;
        background-color: $color__icon-blue;
        transition: 0.2s cubic-bezier($easeInOutCubic);
        transform: scaleX(0);
        transform-origin: 0 0;
    }
    .clear__icon {
        cursor: pointer;
        background-color: $color__100;
        font-weight: bold;
        border-radius: 100px;
        z-index: 1;
        color: white;
        text-align: center;
        transition: 0.2s cubic-bezier($easeInOutCubic);
    }
    input {
        font-size: $font__size--s;
        font-family: Gotham A, Gotham B, Helvetica, sans-serif;
        color: $color__300;
        line-height: 24px;
    }
    input:focus{
        outline: none;
    }
    label {
        position: absolute;
        top: 0;
        left: 0;
        pointer-events: none;
        user-select: none;
        transition: 0.2s cubic-bezier($easeInOutCubic);

    &.label__placeholder {
         top: 50%;
         transform: translate(0, -50%);
         color: rgba(3,23,40,0.40);
         left: 8px;
     }
    &.label__active {
         font-size: $font__size--xs;
         color: $color__200;
         font-weight: $font__weight--bold;
         line-height: 16px;
         opacity: 0;
         transform: translate3d(0, 3px, 0);
         transform-origin: 0 0;
     }
    &.label__character-counter {
         font-size: $font__size--xs;
         line-height: 16px;
         color: $color__200;
         position: absolute;
         left: 0;
         bottom: -14px;
         display: inline-block;
         top: auto;
         opacity: 0;
     }
    }
    .entryLabel {
        font-family: "HCo Ringside Narrow SSm", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
        color: #5D7998;
        font-size: 10pt;
        font-weight: 600;
        line-height: .5;
    }
</style>
