<template>
    <div class='container'>
        <div style="display: inline-flex">
            <div style="margin-top: 12px">
                Semester:
            </div>
            <div class="iconClass" @click="_yearTerm_prevGlobalValue">
                <i class="fas fa-arrow-left"></i>
            </div>
            <div>
                <sim-label
                        v-model="simLabelInput"
                        :value="simLabelInput"
                        :config="{label: theLabel, hasClearButton: hasClearButton, disabled: disabled, line: hasLine}"
                        :required="required"
                        v-on:input="onInputHandler"
                        v-on:blur="onBlurHandler"
                        v-on:focus="onFocusHandler"
                        v-on:mouseover="mouseOverHandler($event)"
                        v-on:mouseleave="mouseLeaveHandler($event)"
                >
                </sim-label>
            </div>
            <div class="iconClass" @click="_yearTerm_toggleSelectionDropdown(undefined, undefined, undefined, false)">
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
        },

        data() {
            return {
                theLabel: 'Year Term',
                hasClearButton: true,
                disabled: false,
                hasLine: true,
                required: false,
                yearTermDropdownIsShowing: false,

            }
        },

        mounted() {
            /// this._yearTerm_toggleSelectionDropdown('', this.nNext, this.nPrev, this.byTerms)
        },

        methods: {
            onInputHandler(event) {
                this.lastSelectedMsg = event + ': was entered at ' + new Date()
            },

            onBlurHandler() {
                this.eventMessage = 'The SimSelect component NOT focused.'
            },

            onFocusHandler() {
                this.eventMessage = 'The SimSelect component is now focused.'
            },

            mouseOverHandler(event) {
                if (event > ' ') {
                    this.eventMessage = 'The current value of the SimSelect Component is: ' + event + '.'
                } else {
                    this.eventMessage = 'The current value of the SimSelect Component is blank.'
                }
            },

            mouseLeaveHandler(event) {
                this.eventMessage = 'The mouse left SimSelect Component.'
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
        margin-left: 10px;
        margin-top: 15px;
    }
    .redText {
        color: red
    }
    .greenText {
        color: green
    }
</style>

