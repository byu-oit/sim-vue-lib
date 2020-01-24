<template>
    <div class='container'>
        <div style="display: inline-flex">
            <div style="margin-top: 13px">
                {{ leftLabel }}
            </div>
            <div class="iconClass" @click="_yearTerm_prevGlobalValue">
                <i class="fas fa-arrow-left"></i>
            </div>
            <div>
                <sim-label
                        :value="newValue"
                        :config="{label: topLabel, hasClearButton: false, disabled: disabled, line: hasLine}"
                        :required="required"
                        width="80px"
                        :centered=true
                        @change="yearTermChanged($event)"
                        @blur="event => { $emit('blur', event) }"
                        @focus="event => { $emit('focus', event) }"
                        @mouseover="event => { $emit('mouseover', event) }"
                        @mouseleave="event => { $emit('mouseleave', event) }"

                >
                </sim-label>
            </div>
            <div class="iconClass" @click="_yearTerm_toggleSelectionDropdown(from, nNext, nPrev, byTerms)">
                <i class="fas fa-caret-down" v-if="!yearTermDropdownIsShowing"></i>
                <i class="fas fa-caret-down" v-if="yearTermDropdownIsShowing"></i>
            </div>
            <div class="iconClass" @click="_yearTerm_nextGlobalValue">
                <i class="fas fa-arrow-right"></i>
            </div>
            <div class="iconClass" @click="_yearTerm_restoreGlobalValueToInitial">
                <i class="fas fa-sync-alt"></i>
            </div>

        </div>
        <div id="yearTerm_selectionDropdown">
            <div v-for="(item, index) in yearTerm_selections" :class="_yearTerm_selectableClass(item.isCurrentSelection)" @click="_yearTerm_selected(item)">
                {{item.format}} {{item.description}}
            </div>
        </div>
    </div>
</template>

<script>
    import YearTermGlobal from '~/mixins/YearTermGlobal'
    import SimLabel from '~/components/molecules/sim-label/SimLabel.vue'
    import '~/assets/selections.css'
    export default {
        name: 'SimYearTerm',
        mixins: [YearTermGlobal],
        components: {
            SimLabel
        },

        props: {
            /* value is the v-model value */
             simLabelInput: {
                type: String,
                required: true
            },
            from: {
                type: String,
                required: true
            },
            nNext: {
                type: Number,
                default: 0
            },
            nPrev: {
                type: Number,
                default: 0
            },
            byTerms: {
                type: Boolean,
                required: false
            },
            topLabel: {
                type: String,
                default: 'Year Term'
            },
            leftLabel: {
                type: String,
                default: 'Semester:'
            }
        },

        data() {
            return {
                disabled: false,
                hasLine: true,
                required: false,
                yearTermDropdownIsShowing: false,

            }
        },

        mounted() {
            this.$emit("change", this.yearTerm_globalValue)
        },

        computed: {
            newValue() {
                return this._yearTerm_format(this.simLabelInput)
            }
        },

        watch: {
            /// Note: yearTerm_globalValue is declared in YearTermGlobal.js
            yearTerm_globalValue (newVal, oldVal) {
                this.$emit('change', newVal)
            }
        },

        methods: {
            yearTermChanged(event) {
                /// Check to see if this is a valid entry
                let newValue = ''
                let term = 0
                const year = Number(event.substr(0,4))

                if (event.length === 5) {
                    term = Number(event.substr(4,1))
                }
                else {
                    term = Number(event.substr(5,1))
                }
                if ((year >= 1901) && (year <= 2030)) {
                    if ((term === 1) || (term === 3) || (term === 4) || (term === 5)) {
                       newValue = event
                    }
                }
                if (newValue === '') {
                    alert('Invalid Entry! -- Please try again')
                }
                this.$emit('change', newValue)

            }
        }
    }

</script>

<style>
    .yearTermList{
        width: 200px;
        margin-left: 20px;
        border: 1px solid black;
        font-size: 10pt;
    }
    .iconClass {
        margin-left: 12px;
        margin-top: 15px;
    }
    .redText {
        color: red
    }
    .greenText {
        color: green
    }
</style>

