<template>
  <body>
  <link rel="stylesheet" href="https://cdn.byu.edu/theme-fonts/latest/ringside/fonts.css">
  <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.2/css/all.css" integrity="sha384-oS3vJWv+0UjzBfQzYUhtDYW+Pj2yciDJxpsK1OYPAYjqT085Qq/1cq5FLXAZQ7Ay" crossorigin="anonymous">

  <div
  id="app"
    class="mx-datepicker"
    :class="{
      'mx-datepicker-range': range,
      'disabled': disabled
    }"
    :style="{
      'width': computedWidth
    }"
    v-clickoutside="closePopup">
    <div class="mx-input-wrapper"
         @click.stop="showPopup">
      <div style="display: inline-block">
        <label :style="labelStyle">{{ label }}</label>
        <br />
        <input
          :class="theClass"
          :style="theStyle"
          :name="inputName"
          v-bind="inputAttr"
          ref="input"
          type="text"
          autocomplete="off"
          :disabled="disabled"
          :readonly="!editable"
          :value="text"
          :placeholder="innerPlaceholder"
          @keydown="handleKeydown"
          @focus="handleFocus"
          @blur="handleBlur"
          @input="handleInput"
          @change="handleChange">
      </div>
      <span
        v-if="showClearIcon"
        class="mx-input-append mx-clear-wrapper"
        @click.stop="clearDate">
        <slot name="mx-clear-icon">
          <i class="mx-input-icon mx-clear-icon"></i>
        </slot>
      </span>

      <span class="mx-input-append">
         <i class="fas fa-question-circle"></i>
        <!--
        <slot name="calendar-icon">
          <svg v-if="LabelVisible" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 200 200" class="mx-calendar-icon" :style="iconStyle">
            <rect x="13" y="29" rx="14" ry="14" width="174" height="170" fill="transparent" />
            <line x1="46" x2="46" y1="8" y2="50" />
            <line x1="154" x2="154" y1="8" y2="50" />
            <line x1="13" x2="187" y1="70" y2="70" />
            <text x="50%" y="135" font-size="90" stroke-width="1" text-anchor="middle" dominant-baseline="middle">{{new Date().getDate()}}</text>
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 200 200" class="mx-calendar-icon">
            <rect x="13" y="29" rx="14" ry="14" width="174" height="170" fill="transparent" />
            <line x1="46" x2="46" y1="8" y2="50" />
            <line x1="154" x2="154" y1="8" y2="50" />
            <line x1="13" x2="187" y1="70" y2="70" />
            <text x="50%" y="135" font-size="90" stroke-width="1" text-anchor="middle" dominant-baseline="middle">{{new Date().getDate()}}</text>
          </svg>

        </slot>
        -->
      </span>

    </div>
    <div class="mx-datepicker-popup"
         :style="innerPopupStyle"
         v-show="popupVisible"
         @click.stop.prevent
         ref="calendar">
      <slot name="header">
        <div class="mx-shortcuts-wrapper"
             v-if="range && innerShortcuts.length">
          <button
            type="button"
            class="mx-shortcuts"
            v-for="(range, index) in innerShortcuts"
            :key="SimDatePIcker"
            @click="selectRange(range)">{{range.text}}</button>
        </div>
      </slot>
      <calendar-panel
        v-if="!range"
        v-bind="$attrs"
        :firstDayOfWeek="firstDayOfWeek"
        ref="calendarPanel"
        :index="-1"
        :type="innerType"
        :date-format="innerDateFormat"
        :value="currentValue"
        :visible="popupVisible"
        @select-date="selectDate"
        @select-time="selectTime"></calendar-panel>
      <div class="mx-range-wrapper"
           v-else>
        <calendar-panel
          style="box-shadow:1px 0 rgba(0, 0, 0, .1)"
          v-bind="$attrs"
          :firstDayOfWeek="firstDayOfWeek"
          ref="calendarPanel"
          :index="0"
          :type="innerType"
          :date-format="innerDateFormat"
          :value="currentValue[0]"
          :end-at="currentValue[1]"
          :start-at="null"
          :visible="popupVisible"
          @select-date="selectStartDate"
          @select-time="selectStartTime"></calendar-panel>
        <calendar-panel
          v-bind="$attrs"
          :firstDayOfWeek="firstDayOfWeek"
          :index="1"
          :type="innerType"
          :date-format="innerDateFormat"
          :value="currentValue[1]"
          :start-at="currentValue[0]"
          :end-at="null"npm
          :visible="popupVisible"
          @select-date="selectEndDate"
          @select-time="selectEndTime"></calendar-panel>
      </div>
      <slot name="footer" :confirm="confirmDate">
        <div class="mx-datepicker-footer"
             v-if="confirm">
          <button type="button"
                  class="mx-datepicker-btn mx-datepicker-btn-confirm"
                  @click="confirmDate">{{ confirmText }}</button>
        </div>
      </slot>
    </div>
  </div>
  </body>
</template>

<script>
  import fecha from 'fecha'
  import clickoutside from './directives/clickoutside'
  import { isValidDate, isValidRangeDate, isDateObejct, isPlainObject, formatDate, parseDate, throttle } from './utils/index'
  import { transformDate } from './utils/transform'
  import CalendarPanel from './calendar.vue'
  import locale from './mixins/locale'
  import Languages from './locale/languages'
  export default {
    fecha,
    name: 'DatePicker',
    components: { CalendarPanel },
    mixins: [locale],
    directives: {
      clickoutside
    },
    props: {
      value: null,
      valueType: {
        default: 'date',
        validator: function (value) {
          return ['timestamp', 'format', 'date'].indexOf(value) !== -1 || isPlainObject(value)
        }
      },
      // If the label is blank the height of the component will remain constant, set label to '**' to reduce the height of the component
      label: {
        type: String // format the time header and date tooltip
      },
      placeholder: {
        type: String,
        default: null
      },
      lang: {
        type: [String, Object],
        default: 'en'
      },
      format: {
        type: [String, Object],
        default: 'DD MMM YYYY'
      },
      dateFormat: {
        type: String // format the time header and date tooltip
      },
      type: {
        type: String,
        default: 'date' // ['date', 'datetime'] zendy added 'month', 'year', mxie added "time"
      },
      range: {
        type: Boolean,
        default: false
      },
      rangeSeparator: {
        type: String,
        default: '~'
      },
      confirmText: {
        type: String,
        default: 'OK'
      },
      confirm: {
        type: Boolean,
        default: false
      },
      editable: {
        type: Boolean,
        default: true
      },
      disabled: {
        type: Boolean,
        default: false
      },
      clearable: {
        type: Boolean,
        default: true
      },
      shortcuts: {
        type: [Boolean, Array],
        default: true
      },
      inputName: {
        type: String,
        default: 'date'
      },
      inputAttr: Object,
      appendToBody: {
        type: Boolean,
        default: false
      },
      popupStyle: {
        type: Object
      },
      firstDayOfWeek: {
        type: Number,
        default: 7
      },
      size: {
        type: String,
        default: 'md'
      },
      borderStyle: {
        type: String,
        default: 'inset'
      },
      alwaysShowLabel: {
        type: Boolean,
        default: false
      }

    },
    data () {
      return {
        width: 180,
        currentValue: this.range ? [null, null] : null,
        userInput: null,
        popupVisible: false,
        position: {},
        theValue: null,
      }
    },
    watch: {
      value: {
        immediate: true,
        handler: 'handleValueChange'
      },
      popupVisible (val) {
        if (val) {
          this.initCalendar()
        } else {
          this.userInput = null
          this.blur()
        }
      },
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
    computed: {
      transform () {
        const type = this.valueType
        if (isPlainObject(type)) {
          return { ...transformDate.date, ...type }
        }
        if (type === 'format') {
          return {
            value2date: this.parse.bind(this),
            date2value: this.stringify.bind(this)
          }
        }
        return transformDate[type] || transformDate.date
      },
      language () {
        if (isPlainObject(this.lang)) {
          return { ...Languages.en, ...this.lang }
        }
        return Languages[this.lang] || Languages.en
      },
      innerPlaceholder () {
        if (typeof this.placeholder === 'string') {
          return this.placeholder
        }
        return this.range ? this.t('placeholder.dateRange') : this.t('placeholder.date')
      },
      text () {
        if (this.userInput !== null) {
          return this.userInput
        }
        const { value2date } = this.transform
        if (!this.range) {
          return this.isValidValue(this.value)
            ? this.stringify(value2date(this.value))
            : ''
        }
        return this.isValidRangeValue(this.value)
          ? `${this.stringify(value2date(this.value[0]))} ${this.rangeSeparator} ${this.stringify(value2date(this.value[1]))}`
          : ''
      },
      computedWidth () {
        if (typeof this.width === 'number' || (typeof this.width === 'string' && /^\d+$/.test(this.width))) {
          return this.width + 'px'
        }
        return this.width
      },
      showClearIcon () {
        return !this.disabled && this.clearable && (this.range ? this.isValidRangeValue(this.value) : this.isValidValue(this.value))
      },
      innerType () {
        return String(this.type).toLowerCase()
      },
      innerShortcuts () {
        if (Array.isArray(this.shortcuts)) {
          return this.shortcuts
        }
        if (this.shortcuts === false) {
          return []
        }
        const pickers = this.t('pickers')
        const arr = [
          {
            text: pickers[0],
            onClick (self) {
              self.currentValue = [new Date(), new Date(Date.now() + 3600 * 1000 * 24 * 7)]
              self.updateDate(true)
            }
          },
          {
            text: pickers[1],
            onClick (self) {
              self.currentValue = [new Date(), new Date(Date.now() + 3600 * 1000 * 24 * 30)]
              self.updateDate(true)
            }
          },
          {
            text: pickers[2],
            onClick (self) {
              self.currentValue = [new Date(Date.now() - 3600 * 1000 * 24 * 7), new Date()]
              self.updateDate(true)
            }
          },
          {
            text: pickers[3],
            onClick (self) {
              self.currentValue = [new Date(Date.now() - 3600 * 1000 * 24 * 30), new Date()]
              self.updateDate(true)
            }
          }
        ]
        return arr
      },
      innerDateFormat () {
        if (this.dateFormat) {
          return this.dateFormat
        }
        if (typeof this.format !== 'string') {
          return 'YYYY-MM-DD'
        }
        if (this.innerType === 'date') {
          return this.format
        }
        return this.format.replace(/[Hh]+.*[msSaAZ]|\[.*?\]/g, '').trim() || 'YYYY-MM-DD'
      },
      innerPopupStyle () {
        return { ...this.position, ...this.popupStyle }
      },
      /**
       * @return {boolean}
       */
      LabelVisible() {
        return ((this.value !== '') || (this.label > '') || (!this.editable))
      },
      labelStyle() {
        let style = ''

        if (!this.alwaysShowLabel) {
          if ((!this.placeholder) && (!this.value) && (!this.disabled)) {
            style = style + 'visibility: hidden; '
          } else if ((this.value === '') && (!this.disabled)) {
            style = style + 'visibility: hidden; '
          }
        }
        if (this.label === '**') {
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

      theStyle() {
        let style = ''
        if (this.size === 'sm') {
          style = style + 'width: 95px; margin-top: -4px;'
        }
        else if (this.size === 'lg') {
          style = style + 'width: 155px;'
        }
        else {
          style = style + 'width: 115px;'
        }

        if (this.borderStyle !== '') {
          if ((this.borderStyle === 'inset') || (this.borderStyle === 'outset')) {
            style = style + 'border: 2px ' + this.borderStyle
          }
          else if (this.borderStyle === 'shadow') {
            style += 'box-shadow: 2px 2px grey'
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

      iconStyle() {
        if (this.size === 'sm') {
          return 'margin-left: -55px;'
        }
        else if (this.size === 'lg') {
          return 'margin-left: 6px;'
        }
        else {
          return 'margin-left: -35px'
        }
      }
    },
    mounted () {
      if (this.appendToBody) {
        this.popupElm = this.$refs.calendar
        document.body.appendChild(this.popupElm)
      }
      this._displayPopup = throttle(() => {
        if (this.popupVisible) {
          this.displayPopup()
        }
      }, 200)
      window.addEventListener('resize', this._displayPopup)
      window.addEventListener('scroll', this._displayPopup)
    },
    beforeDestroy () {
      if (this.popupElm && this.popupElm.parentNode === document.body) {
        document.body.removeChild(this.popupElm)
      }
      window.removeEventListener('resize', this._displayPopup)
      window.removeEventListener('scroll', this._displayPopup)
    },
    methods: {
      initCalendar () {
        this.handleValueChange(this.value)
        this.displayPopup()
      },
      stringify (date) {
        return (isPlainObject(this.format) && typeof this.format.stringify === 'function')
          ? this.format.stringify(date)
          : formatDate(date, this.format)
      },
      parse (value) {
        return (isPlainObject(this.format) && typeof this.format.parse === 'function')
          ? this.format.parse(value)
          : parseDate(value, this.format)
      },
      isValidValue (value) {
        const { value2date } = this.transform
        return isValidDate(value2date(value))
      },
      isValidRangeValue (value) {
        const { value2date } = this.transform
        return Array.isArray(value) && value.length === 2 && this.isValidValue(value[0]) &&
          this.isValidValue(value[1]) && (value2date(value[1]).getTime() >= value2date(value[0]).getTime())
      },
      dateEqual (a, b) {
        return isDateObejct(a) && isDateObejct(b) && a.getTime() === b.getTime()
      },
      rangeEqual (a, b) {
        return Array.isArray(a) && Array.isArray(b) && a.length === b.length && a.every((item, index) => this.dateEqual(item, b[SimDatePIcker]))
      },
      selectRange (range) {
        if (typeof range.onClick === 'function') {
          return range.onClick(this)
        }
        this.currentValue = [new Date(range.start), new Date(range.end)]
        this.updateDate(true)
      },
      clearDate () {
        const date = this.range ? [null, null] : null
        this.currentValue = date
        this.updateDate(true)
        this.$emit('clear')
      },
      confirmDate () {
        const valid = this.range ? isValidRangeDate(this.currentValue) : isValidDate(this.currentValue)
        if (valid) {
          this.updateDate(true)
        }
        this.emitDate('confirm')
        this.closePopup()
      },
      updateDate (confirm = false) {
        if ((this.confirm && !confirm) || this.disabled) {
          return false
        }
        const equal = this.range ? this.rangeEqual(this.value, this.currentValue) : this.dateEqual(this.value, this.currentValue)
        if (equal) {
          return false
        }
        this.emitDate('input')
        this.emitDate('change')
        return true
      },
      emitDate (eventName) {
        const { date2value } = this.transform
        const value = this.range
          ? this.currentValue.map(date2value)
          : date2value(this.currentValue)
        this.$emit(eventName, value)
      },
      handleValueChange (value) {
        const { value2date } = this.transform
        if (this.range) {
          this.currentValue = this.isValidRangeValue(value) ? value.map(value2date) : [null, null]
        } else {
          this.currentValue = this.isValidValue(value) ? value2date(value) : null
        }
      },
      selectDate (date) {
        this.currentValue = date
        this.updateDate() && this.closePopup()
      },
      selectStartDate (date) {
        this.$set(this.currentValue, 0, date)
        if (this.currentValue[1]) {
          this.updateDate()
        }
      },
      selectEndDate (date) {
        this.$set(this.currentValue, 1, date)
        if (this.currentValue[0]) {
          this.updateDate()
        }
      },
      selectTime (time, close) {
        this.currentValue = time
        this.updateDate() && close && this.closePopup()
      },
      selectStartTime (time) {
        this.selectStartDate(time)
      },
      selectEndTime (time) {
        this.selectEndDate(time)
      },
      showPopup () {
        if (this.disabled) {
          return
        }
        this.popupVisible = true
      },
      closePopup () {
        this.popupVisible = false
      },
      getPopupSize (element) {
        const originalDisplay = element.style.display
        const originalVisibility = element.style.visibility
        element.style.display = 'block'
        element.style.visibility = 'hidden'
        const styles = window.getComputedStyle(element)
        const width = element.offsetWidth + parseInt(styles.marginLeft) + parseInt(styles.marginRight)
        const height = element.offsetHeight + parseInt(styles.marginTop) + parseInt(styles.marginBottom)
        const result = { width, height }
        element.style.display = originalDisplay
        element.style.visibility = originalVisibility
        return result
      },
      displayPopup () {
        const dw = document.documentElement.clientWidth
        const dh = document.documentElement.clientHeight
        const InputRect = this.$el.getBoundingClientRect()
        const PopupRect = this._popupRect || (this._popupRect = this.getPopupSize(this.$refs.calendar))
        const position = {}
        let offsetRelativeToInputX = 0
        let offsetRelativeToInputY = 0
        if (this.appendToBody) {
          offsetRelativeToInputX = window.pageXOffset + InputRect.left
          offsetRelativeToInputY = window.pageYOffset + InputRect.top
        }
        if (
          dw - InputRect.left < PopupRect.width &&
          InputRect.right < PopupRect.width
        ) {
          position.left = offsetRelativeToInputX - InputRect.left + 1 + 'px'
        } else if (InputRect.left + InputRect.width / 2 <= dw / 2) {
          position.left = offsetRelativeToInputX + 'px'
        } else {
          position.left = offsetRelativeToInputX + InputRect.width - PopupRect.width + 'px'
        }
        if (
          InputRect.top <= PopupRect.height &&
          dh - InputRect.bottom <= PopupRect.height
        ) {
          position.top = offsetRelativeToInputY + dh - InputRect.top - PopupRect.height + 'px'
        } else if (InputRect.top + InputRect.height / 2 <= dh / 2) {
          position.top = offsetRelativeToInputY + InputRect.height + 'px'
        } else {
          position.top = offsetRelativeToInputY - PopupRect.height + 'px'
        }
        if (position.top !== this.position.top || position.left !== this.position.left) {
          this.position = position
        }
      },
      blur () {
        this.$refs.input.blur()
      },
      handleBlur (event) {
        this.$emit('blur', event)
      },
      handleFocus (event) {
        if (!this.popupVisible) {
          this.showPopup()
        }
        this.$emit('focus', event)
      },
      handleKeydown (event) {
        const keyCode = event.keyCode
        // Tab 9 or Enter 13
        if (keyCode === 9 || keyCode === 13) {
          // ie emit the watch before the change event
          event.stopPropagation()
          this.handleChange()
          this.userInput = null
          this.closePopup()
        } // Start Change
        else {
          this.updateCalendar()
        }
      },
      updateCalendar() {
        var theDate = ''
        var dayInt = 0
        var dayStr = ''
        var month = 0
        var monthStr = ''
        var year = ''
        // If they have entered at least the day of the month
        if (this.text.length >= 2) {
          // get the current date
          var d = new Date()
          month = d.getMonth() + 1
          if (month < 10) {
            monthStr = '0' + month
          } else {
            monthStr = month
          }
          year = d.getFullYear()
          dayInt = this.text.substr(0, 2)
          dayInt++ // For some reason we need to send a date that is one day later than the date we want updated in the calendar
          if (dayInt < 10) {
            dayStr = '0' + dayInt.toString()
          } else {
            dayStr = dayInt.toString()
          }
        }
        // If they have entered at least the month
        if (this.text.length >= 6) {
          var months = ['Jan', 'Feb', 'Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
          monthStr = this.text.substr(3,3)
          month = months.indexOf(monthStr)
          month++
          monthStr = month.toString()
          if (monthStr.length === 1) {
            monthStr = '0' + monthStr
          }
        }
        // If they have entered the year
        if (this.text.length >= 11) {
          year = this.text.substr(7,4)
        }
        if ((year !== '') && (monthStr !== '') && (dayStr !== '')) {
          theDate = year + '-' + monthStr + '-' + dayStr
          this.handleValueChange(theDate)
        }
      }, // End Change
      handleInput (event) {
        this.userInput = event.target.value
      },
      handleChange () {
        if (this.editable && this.userInput !== null) {
          const value = this.text
          const checkDate = this.$refs.calendarPanel.isDisabledTime
          if (!value) {
            this.clearDate()
            return
          }
          if (this.range) {
            const range = value.split(` ${this.rangeSeparator} `)
            if (range.length === 2) {
              const start = this.parse(range[0])
              const end = this.parse(range[1])
              if (start && end && !checkDate(start, null, end) && !checkDate(end, start, null)) {
                this.currentValue = [start, end]
                this.updateDate(true)
                this.closePopup()
                return
              }
            }
          } else {
            const date = this.parse(value)
            if (date && !checkDate(date, null, null)) {
              this.currentValue = date
              this.updateDate(true)
              this.closePopup()
              return
            }
          }
          this.$emit('input-error', value)
        }
      }
    }
  }
</script>
<style scoped>
  #app {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: left;
    color: #2c3e50;
    margin-top: 60px;
    margin: auto;
  }
  label {
    color: black;
    text-align: left;
    margin-left: 6px;
    margin-bottom: -10px;
  }
  input {
    text-align: left;
    background-color:white;
    border-radius: 4px;
    margin-left: 0px;
    margin-top: -3px;

  }
  input:focus {
    text-decoration: underline;
  }
  input:disabled {
    background-color:#eff1f4;
  }

</style>
