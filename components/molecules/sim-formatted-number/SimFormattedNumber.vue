<template>
  <div class="container">
    <div class = row h-25>
      <label :style="labelStyle">{{ label }}</label>
    </div>
    <div class = row h-75>
      <input
        :placeholder="placeHolder"
        :class="theClass"
        :style="theStyle"
        @blur="onBlurHandler"
        @input="onInputHandler"
        @focus="onFocusHandler"
        ref="numeric"
        type="tel"
        v-model="amount"
        :readonly="disabled"
        :disabled="disabled"
        :required="required"
      />

    </div>

  </div>
</template>

<script lang="ts">
  import { Component, Vue, Prop, Watch } from 'nuxt-property-decorator'
  import accounting from './accounting.min.js'

  @Component
  export default class SimFormattedNumber extends Vue {
    /// DATA
    amount: string | null = ''

    /// PROPS
    @Prop({ default: '', type: String })
    currency!: string

    /// Maximum value allowed.
    @Prop({ default: '', type: Number })
    max!: number

    /// Minimum value allowed.
    @Prop({ default: '', type: Number })
    min!: number

    /// Enable/Disable minus value.
    @Prop({ default: '', type: Boolean })
    minus!: boolean

    /// Value when the input is empty
    @Prop({ default: '', type: String })
    emptyValue!: string

    /// Number of decimals.
    /// Decimals symbol are the opposite of separator symbol.
    @Prop({ default: 0, type: Number })
    precision!: number

    /// Thousand separator type.
    /// Separator props accept either . or , (default).
    @Prop({ default: ',', type: String })
    separator!: string

    /// Forced thousand separator.
    /// Accepts any string.
    @Prop({ default: '', type: String })
    thousandSeparator!: string

     /// Forced decimal separator.
     /// Accepts any string.
    @Prop({ default: '', type: String })
    decimalSeparator!: string

    /// v-model value.
    @Prop({ default: 0, type: Number})
    value!: number | string

     /// Hide input and show value in text only.
    @Prop({ default: false, type: Boolean })
    disabled!: boolean

    /// Class for the span tag when readOnly props is true.
    @Prop({ default: false, type: Boolean })
    readOnlyClass!: boolean

     /// Position of currency symbol
     /// Symbol position props accept either 'suffix' or 'prefix' (default).
    @Prop({ default: 'prefix', type: String })
    currencySymbolPosition!: string

    /// This is the label */
    @Prop({ default: '', type: String })
    label!: string

    /// This is the placeholder */
    @Prop({ default: '', type: String })
    placeholder!: string

    /// This is the width of the component
    @Prop({ default: '', type: String })
    width!: string

    @Prop({ default: 'inset', type: String })
    borderStyle!: string

    ///  size is either 'sm', 'md' or 'lg'
    @Prop({ default: 'md', type: String })
    size!: string

    @Prop({ default: false, type: Boolean })
    required!: boolean

    @Prop({ default: true, type: Boolean })
    alwaysShowLabel!: boolean

    /// WATCH VALUES
    /**
     * Watch for value change from other input with same v-model.
     * @param {Number} newValue
     */
    @Watch('valueNumber')
    onValueNumberChanged(newValue: string, oldValue: string) {
      if (this.$refs.numeric !== document.activeElement) {
        this.amount = this.format(newValue)
      }
    }

    /**
     * When readOnly is true, replace the span tag class.
     * @param {Boolean} newValue
     * @param {Boolean} oldValue
     */
    @Watch('disabled')
    onDisabledChanged(newValue: boolean, oldValue: boolean) {
      if (oldValue === false && newValue === true) {
        this.$nextTick(() => {
          /// TODO: this.$refs.readOnly.className = this.readOnlyClass
        })
      }
    }

    /**
     * Immediately reflect separator changes
     */
    @Watch('separator')
    onSeparatorChanged(newValue: string, oldValue: string) {
      this.process(this.valueNumber)
      this.amount = this.format(this.valueNumber)
    }

    /**
     * Immediately reflect currency changes
     */
    @Watch('currency')
    onCurrencyChanged(newValue: string, oldValue: string) {
      this.process(this.valueNumber)
      this.amount = this.format(this.valueNumber)
    }

    /**
     * Immediately reflect precision changes
     */
    @Watch('precision')
    onPrecesionChanged(newValue: string, oldValue: string) {
      this.process(this.valueNumber)
      this.amount = this.format(this.valueNumber)
    }

    /// COMPUTED VALUES
    get amountNumber () {
      return this.unformat(this.amount)
    }

    /**
     * Number type of value props.
     * @return {Number}
     */
    get valueNumber () {
      return this.unformat(this.value)
    }

    /**
     * Define decimal separator based on separator props.
     * @return {String} '.' or ','
     */
    get decimalSeparatorSymbol () {
      if (typeof this.decimalSeparator !== 'undefined') return this.decimalSeparator
      if (this.separator === ',') return '.'
      return ','
    }

    /**
     * Define thousand separator based on separator props.
     * @return {String} '.' or ','
     */
    get thousandSeparatorSymbol () {
      if (typeof this.thousandSeparator !== 'undefined') return this.thousandSeparator
      if (this.separator === '.') return '.'
      if (this.separator === 'space') return ' '
      return ','
    }

    /**
     * Define format position for currency symbol and value.
     * @return {String} format
     */
    get symbolPosition () {
      if (!this.currency) return '%v'
      return this.currencySymbolPosition === 'suffix' ? '%v %s' : '%s %v'
    }

    /**
     * @return {boolean}
     */
    get LabelVisible() {
      return !!(((this.label !== '') && (this.amount > '')) || (this.placeholder) || (this.readOnly));
    }

    /* this method will return the requested style */
    get theStyle() {
      let style = 'text-align: right;'
      if (this.width !== '') {
        style = style + 'width:' + this.width + ';'
      }
      else {  // the default width = 150px
        style = style + 'width: 150px;'
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
    }

    get placeHolder() {
      if (this.disabled) {
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
        if ((!this.placeholder) && (!this.value) && (!this.disabled)) {
          style = style + 'visibility: hidden; '
        } else if ((this.value === 0) && (!this.disabled)) {
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

    get theClass() {
      if (this.size === 'sm') {
        return 'form-control form-control-sm'
      }
      else if (this.size === 'lg') {
        return 'form-control form-control-lg'
      }
      else {
        return 'form-control'
      }
    }

    /// METHODS
    mounted() {
      // Set default value props when placeholder undefined.
      // if (!this.placeHolder) {
      this.process(this.valueNumber)
      this.amount = this.format(this.valueNumber)
      // In case of delayed props value.
      setTimeout(() => {
        this.process(this.valueNumber)
        this.amount = this.format(this.valueNumber)
      }, 500)
    }

      /**
       * Handle blur event.
       * @param {Object} e
       */
      onBlurHandler (e) {
        this.$emit('blur', e)
        this.amount = this.format(this.valueNumber)
      }

      /**
       * Handle focus event.
       * @param {Object} e
       */
      onFocusHandler (e) {
        this.$emit('focus', e)
        if (this.valueNumber === 0) {
          this.amount = null
        } else {
          this.amount = accounting.formatMoney(this.valueNumber, {
            symbol: '',
            format: '%v',
            thousand: '',
            decimal: this.decimalSeparatorSymbol,
            precision: Number(this.precision)
          })
        }
      }

      /**
       * Handle input event.
       */
      onInputHandler () {
        this.process(this.amountNumber)
      }

      /**
       * Validate value before update the component.
       * @param {Number} value
       */
      process (value) {
        if (value >= this.max) this.update(this.max)
        if (value <= this.min) this.update(this.min)
        if (value > this.min && value < this.max) this.update(value)
        if (!this.minus && value < 0) this.min >= 0 ? this.update(this.min) : this.update(0)
      }

      /**
       * Update parent component model value.
       * @param {Number} value
       */
      update (value) {
        this.$emit('input', Number(accounting.toFixed(value, this.precision)))
      }

      /**
       * Format value using symbol and separator.
       * @param {Number} value
       * @return {String}
       */
      format (value) {
        return accounting.formatMoney(value, {
          symbol: this.currency,
          format: this.symbolPosition,
          precision: Number(this.precision),
          decimal: this.decimalSeparatorSymbol,
          thousand: this.thousandSeparatorSymbol
        })
      }

      /**
       * Remove symbol and separator.
       * @param {Number} value
       * @return {Number}
       */
      unformat (value) {
        const toUnformat = typeof value === 'string' && value === '' ? this.emptyValue : value
        return accounting.unformat(toUnformat, this.decimalSeparatorSymbol)
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
    font-size: 14px;
    text-decoration: underline;
  }
  input:disabled {
    background-color:#eff1f4;
  }

</style>
