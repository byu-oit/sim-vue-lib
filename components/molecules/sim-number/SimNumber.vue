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

<script>
  import settings from "accounting-js/lib/settings";
  import _checkPrecision from "accounting-js/lib/internal/checkPrecision";
  import _checkCurrencyFormat from "accounting-js/lib/internal/checkCurrencyFormat";
  import formatNumber from "accounting-js/lib/formatNumber";

  export default {
    name: 'sim-formatted-number',
    props: {
      /**
       * Currency symbol.
       */
      currency: {
        type: String,
        default: '',
        required: false
      },
      /**
       * Maximum value allowed.
       */
      max: {
        type: Number,
        default: Number.MAX_SAFE_INTEGER || 9007199254740991,
        required: false,
      },
      /**
       * Minimum value allowed.
       */
      min: {
        type: Number,
        default: Number.MIN_SAFE_INTEGER || -9007199254740991,
        required: false
      },
      /**
       * Enable/Disable minus value.
       */
      minus: {
        type: Boolean,
        default: false,
        required: false
      },
      /**
       * Value when the input is empty
       */
      emptyValue: {
        type: [Number, String],
        default: '',
        required: false
      },
      /**
       * Number of decimals.
       * Decimals symbol are the opposite of separator symbol.
       */
      precision: {
        type: Number,
        default: 0,
        required: false
      },
      /**
       * Thousand separator type.
       * Separator props accept either . or , (default).
       */
      separator: {
        type: String,
        default: ',',
        required: false
      },
      /**
       * Forced thousand separator.
       * Accepts any string.
       */
      thousandSeparator: {
        default: undefined,
        required: false,
        type: String
      },
      /**
       * Forced decimal separator.
       * Accepts any string.
       */
      decimalSeparator: {
        default: undefined,
        required: false,
        type: String
      },
      /**
       * v-model value.
       */
      value: {
        type: [Number, String],
        default: 0,
        required: true
      },
      /**
       * Hide input and show value in text only.
       */
      disabled: {
        type: Boolean,
        default: false,
        required: false
      },
      /**
       * Class for the span tag when readOnly props is true.
       */
      readOnlyClass: {
        type: String,
        default: '',
        required: false
      },
      /**
       * Position of currency symbol
       * Symbol position props accept either 'suffix' or 'prefix' (default).
       */
      currencySymbolPosition: {
        type: String,
        default: 'prefix',
        required: false
      },
      /* This is the label */
      label: {
        type: String,
        required: false
      },
      /* This is the placeholder */
      placeholder: {
        type: String,
        required: false
      },
      width: {
        type: String,
        default: ''
      },
      borderStyle: {
        type: String,
        default: 'inset'
      },
      // either 'sm' or 'lg'
      size: {
        type: String,
        default: ''
      },
      required: {
        type: String,
        default: 'false'
      },
      alwaysShowLabel: {
        type: Boolean,
        default: true
      }
    },
    data: () => ({
      amount: ''
    }),
    computed: {
      /**
       * Number type of formatted value.
       * @return {Number}
       */
      amountNumber () {
        return this.unformatValue(this.amount)
      },
      /**
       * Number type of value props.
       * @return {Number}
       */
      valueNumber () {
        return this.unformatValue(this.value)
      },
      /**
       * Define decimal separator based on separator props.
       * @return {String} '.' or ','
       */
      decimalSeparatorSymbol () {
        if (typeof this.decimalSeparator !== 'undefined') return this.decimalSeparator
        if (this.separator === ',') return '.'
        return ','
      },
      /**
       * Define thousand separator based on separator props.
       * @return {String} '.' or ','
       */
      thousandSeparatorSymbol () {
        if (typeof this.thousandSeparator !== 'undefined') return this.thousandSeparator
        if (this.separator === '.') return '.'
        if (this.separator === 'space') return ' '
        return ','
      },
      /**
       * Define format position for currency symbol and value.
       * @return {String} format
       */
      symbolPosition () {
        if (!this.currency) return '%v'
        return this.currencySymbolPosition === 'suffix' ? '%v %s' : '%s %v'
      },

      /**
       * @return {boolean}
       */
      LabelVisible() {
        return !!(((this.label !== '') && (this.amount > '')) || (this.placeholder) || (this.readOnly));
      },

      /* this method will return the requested style */
      theStyle() {
        let style = 'text-align: right;'
        if (this.width !== '') {
          style = style + 'width:' + this.width + ';'
        }
        else {  // the default width = 150px
          style = style + 'width: 150px;'
        }

        if (this.required !== 'false') {
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

      placeHolder() {
        if (this.disabled) {
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

    },
    watch: {
      /**
       * Watch for value change from other input with same v-model.
       * @param {Number} newValue
       */
      valueNumber (newValue) {
        if (this.$refs.numeric !== document.activeElement) {
          this.amount = this.format(newValue)
        }
      },
      /**
       * When readOnly is true, replace the span tag class.
       * @param {Boolean} newValue
       * @param {Boolean} oldValue
       */
      disabled (newValue, oldValue) {
        if (oldValue === false && newValue === true) {
          this.$nextTick(() => {
            this.$refs.readOnly.className = this.readOnlyClass
          })
        }
      },
      /**
       * Immediately reflect separator changes
       */
      separator () {
        this.process(this.valueNumber)
        this.amount = this.format(this.valueNumber)
      },
      /**
       * Immediately reflect currency changes
       */
      currency () {
        this.process(this.valueNumber)
        this.amount = this.format(this.valueNumber)
      },
      /**
       * Immediately reflect precision changes
       */
      precision () {
        this.process(this.valueNumber)
        this.amount = this.format(this.valueNumber)
      }
    },
    mounted() {
      // Set default value props when placeholder undefined.
      //if (!this.placeHolder) {
      this.process(this.valueNumber)
      this.amount = this.format(this.valueNumber)
      // In case of delayed props value.
      setTimeout(() => {
        this.process(this.valueNumber)
        this.amount = this.format(this.valueNumber)
      }, 500)
      //}
      // Set read-only span element's class
      //if (this.readOnly) this.$refs.readOnly.className = this.readOnlyClass
    },
    methods: {
      /**
       * Handle blur event.
       * @param {Object} e
       */
      onBlurHandler (e) {
        this.$emit('blur', e)
        this.amount = this.format(this.valueNumber)
      },
      /**
       * Handle focus event.
       * @param {Object} e
       */
      onFocusHandler (e) {
        this.$emit('focus', e)
        if (this.valueNumber === 0) {
          this.amount = null
        } else {
          this.amount = this.formatMoney(this.valueNumber, {
            symbol: '',
            format: '%v',
            thousand: '',
            decimal: this.decimalSeparatorSymbol,
            precision: Number(this.precision)
          })
        }
      },
      /**
       * Handle input event.
       */
      onInputHandler () {
        this.process(this.amountNumber)
      },
      /**
       * Validate value before update the component.
       * @param {Number} value
       */
      process (value) {
        if (value >= this.max) this.update(this.max)
        if (value <= this.min) this.update(this.min)
        if (value > this.min && value < this.max) this.update(value)
        if (!this.minus && value < 0) this.min >= 0 ? this.update(this.min) : this.update(0)
      },
      /**
       * Update parent component model value.
       * @param {Number} value
       */
      update (value) {
        this.$emit('input', Number(this.toFixed(value, this.precision)))
      },
      /**
       * Format value using symbol and separator.
       * @param {Number} value
       * @return {String}
       */
      format (value) {
        return this.formatMoney(value, {
          symbol: this.currency,
          format: this.symbolPosition,
          precision: Number(this.precision),
          decimal: this.decimalSeparatorSymbol,
          thousand: this.thousandSeparatorSymbol
        })
      },
      /**
       * Remove symbol and separator.
       * @param {Number} value
       * @return {Number}
       */
      unformatValue (value) {
        const toUnformat = typeof value === 'string' && value === '' ? this.emptyValue : value
        return this.unformat(toUnformat, this.decimalSeparatorSymbol)
      },

      unformat(value, decimal = settings.decimal, fallback = settings.fallback) {
        // Recursively unformat arrays:
        if (Array.isArray(value)) {
          return value.map((val) => unformat(val, decimal, fallback));
        }

        // Return the value as-is if it's already a number:
        if (typeof value === 'number') return value;

        // Build regex to strip out everything except digits, decimal point and minus sign:
        const regex = new RegExp('[^0-9-(-)-' + decimal + ']', ['g']);
        const unformattedValueString =
            ('' + value)
                    .replace(regex, '')         // strip out any cruft
                    .replace(decimal, '.')      // make sure decimal point is standard
                    .replace(/\(([-]*\d*[^)]?\d+)\)/g, '-$1') // replace bracketed values with negatives
                    .replace(/\((.*)\)/, '');   // remove any brackets that do not have numeric value

        /**
        * Handling -ve number and bracket, eg.
        * (-100) = 100, -(100) = 100, --100 = 100
        */
        const negative = (unformattedValueString.match(/-/g) || 2).length % 2,
            absUnformatted = parseFloat(unformattedValueString.replace(/-/g, '')),
            unformatted = absUnformatted * ((negative) ? -1 : 1);

        // This will fail silently which may cause trouble, let's wait and see:
        return !isNaN(unformatted) ? unformatted : fallback;
      },

      toFixed(value, precision) {
        precision = _checkPrecision(precision, settings.precision);
        const power = Math.pow(10, precision);

        // Multiply up by precision, round accurately, then divide and use native toFixed():
        return (Math.round((value + 1e-8) * power) / power).toFixed(precision);
      },

      formatMoney(number, opts = {}) {
      // Resursively format arrays:
      if (Array.isArray(number)) {
        return number.map((val) => formatMoney(val, opts));
      }

      // Build options object from second param (if object) or all params, extending defaults:
      opts = objectAssign({},
            settings,
            opts
      );

      // Check format (returns object with pos, neg and zero):
      const formats = _checkCurrencyFormat(opts.format);

      // Choose which format to use for this value:
      let useFormat;

      if (number > 0) {
        useFormat = formats.pos;
      } else if (number < 0) {
        useFormat = formats.neg;
      } else {
        useFormat = formats.zero;
      }

      // Return with currency symbol added:
      return useFormat
            .replace('%s', opts.symbol)
            .replace('%v', formatNumber(Math.abs(number), opts));
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
    font-size: 14px;
    text-decoration: underline;
  }
  input:disabled {
    background-color:#eff1f4;
  }

</style>
