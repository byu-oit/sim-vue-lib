
import YearTerm from './YearTerm'

export default {
    props:{
        yearTerm_initial: {
            type:String,
            default: function () {
                const today = new Date()
                let year = today.getFullYear()
                const month = today.getMonth()
                if (month > 9)
                {
                    year += 1
                }
                const terms = [1,1,5,5,5,5,5,5,5,5,1,1]
                return year + "" + terms[month]
            }(),
            required:false
        },
        yearTerm_byTerms: {
            default: true
        }
    },
    mixins: [YearTerm],
    computed: {
        yearTerm_dashRegEx() {
            return new RegExp("^([0-9]{4}[-][1-6])$")
        },
        yearTerm_noDashRegEx() {
            return new RegExp("^([0-9]{4}[1-6])$")
        },
        yearTerm_globalfNext() {
            return this.yearTerm_globalbyTerms ? this._yearTerm_nextTerm : this._yearTerm_nextSemester
        },
        yearTerm_globalfPrev() {
            return this.yearTerm_globalbyTerms ? this._yearTerm_prevTerm : this._yearTerm_prevSemester
        },
        yearTerm_globalDisplayLabel() {
            return this.yearTerm_globalbyTerms ? "Year Term" : "Semester"
        }
    },
    data() {
        return {
            yearTerm_globalValue: this.yearTerm_initial,
            yearTerm_globalDisplay: this.yearTerm_initial,
            yearTerm_globalbyTerms: this.yearTerm_byTerms,
            yearTerm_selections: [],
            yearTerm_dropdown: undefined,
            yearTerm_dropdownIsShowing: false,
            yearTerm_privateLastnNext: undefined,
            yearTerm_privateLastnPrev: undefined,
            yearTerm_privateLastbyTerms: undefined
        }
    },
    watch: {
        yearTerm_globalDisplay (val, oldVal) {
            if (val.length >= 5)
            {
                if (this._yearTerm_valid(val))
                {
                    this._yearTerm_emitIfGlobalValueChanged(this._yearTerm_compress(val))
                }
            }
        }
    },
    mounted() {
        this.yearTerm_globalDisplay = this._yearTerm_format(this.yearTerm_globalValue)
    },
    methods: {
        /// manage the global value
        _yearTerm_emitIfGlobalValueChanged(val)
        {
            if (val !== this.yearTerm_globalValue)
            {
                const oldVal = this.yearTerm_globalValue
                this.yearTerm_globalValue = val
                this.yearTerm_globalDisplay = this._yearTerm_format(val)
                this.$emit("yearTerm-globalValueUpdated", {val: val, oldVal: oldVal})
                this._yearTerm_selectionList(val, this.yearTerm_privateLastnNext,  this.yearTerm_privateLastnPrev,  this.yearTerm_privateLastbyTerms)
            }
        },
        _yearTerm_nextGlobalValue() {
            this._yearTerm_emitIfGlobalValueChanged(this.yearTerm_globalfNext(this.yearTerm_globalValue))
        },
        _yearTerm_prevGlobalValue() {
            this._yearTerm_emitIfGlobalValueChanged(this.yearTerm_globalfPrev(this.yearTerm_globalValue))
        },
        _yearTerm_restoreGlobalValueToInitial() {
            this._yearTerm_emitIfGlobalValueChanged(this.yearTerm_initial)
        },
        /// selection drop down methods
        _yearTerm_toggleSelectionDropdown(from, nNext, nPrev, byTerms) {
            const dropdown = this.yearTerm_dropdown || document.getElementById("yearTerm_selectionDropdown")
            if (dropdown)
            {
                dropdown.style.display = (dropdown.style.display === 'block') ? 'none' : 'block'
                this.yearTerm_dropdownIsShowing = (dropdown.style.display === 'block')
                if (this.yearTerm_dropdownIsShowing)
                {
                    from = from || this.yearTerm_globalValue
                    nPrev = nPrev || 3
                    this._yearTerm_selectionList(from, nNext, nPrev, byTerms)
                }
            }
        },

        _yearTerm_selectableClass(isCurrentSelection) {
            return isCurrentSelection ? "SIM-selectable SIM-currentSelection" : "SIM-selectable"
        },
        _yearTerm_selected(selectable) {
            this._yearTerm_emitIfGlobalValueChanged(selectable.value)
            this._yearTerm_toggleSelectionDropdown()
        }
    }
}
