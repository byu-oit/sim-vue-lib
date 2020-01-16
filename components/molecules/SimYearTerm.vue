<template>
    <div class='container'>
        <div style="display: inline-flex">
            <div style="margin-top: 12px">
                Semester:
            </div>
            <div class="iconClass"@click="_yearTerm_prevGlobalValue">
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
                <i class="fas fa-caret-down" v-if="!yearTerm_dropdownIsShowing"></i>
                <i class="fas fa-caret-down" v-if="yearTerm_dropdownIsShowing"></i>
            </div>
            <div class="iconClass" @click="_yearTerm_nextGlobalValue">
                <i class="fas fa-arrow-right"></i>
            </div>
            <div class="iconClass" @click="_yearTerm_restoreGlobalValueToInitial">
                <i class="fas fa-sync-alt"></i>
            </div>

        </div>
        <div v-if="yearTerm_dropdownIsShowing" id="yearTerm_selectionDropdown">
            <div v-for="(item, index) in yearTerm_selections" :class="_yearTerm_selectableClass(item.isCurrentSelection)" @click="_yearTerm_selected(item)">
                {{item.format}} {{item.description}}
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'nuxt-property-decorator'
    import YearTermGlobal from './../../mixins/YearTermGlobal'
    import SimLabel from '~/components/molecules/sim-label/SimLabel.vue'


    @Component({
        components: {
            SimLabel
        },
        mixins: [YearTermGlobal],
    })
    export default class App extends Vue {
        simLabelInput: string = ''
        hasClearButton: boolean = true
        hasLine: boolean = true
        yearTerm_dropdownIsShowing: boolean = false

        theWidth: string = '150px'
        widthList: string [] = ['50px','100px','150px','200px','250px']
        theLabel: string = 'Car Brand'
        labelList: string [] = ['Car Brand', 'Favorite Brand', 'Best Brand', 'Worst Brand']
        maxLength: string = '80'
        lengthList: string [] = ['10', '40', '80', '100', '150', '300']

        textCentered: boolean = true
        disabled: boolean = false
        lastSelectedMsg: string = ''
        eventMessage: string = ''
        inputClass: string = ''
        labelClass: string = ''
        classList: string [] = ['', 'redText', 'greenText']
        required: boolean = false

        onInputHandler(event) {
            this.lastSelectedMsg = event + ': was entered at ' + new Date()
        }

        onBlurHandler() {
            this.eventMessage = 'The SimSelect component NOT focused.'
        }

        onFocusHandler() {
            this.eventMessage = 'The SimSelect component is now focused.'
        }

        mouseOverHandler(event) {
            if (event > ' ') {
                this.eventMessage = 'The current value of the SimSelect Component is: ' + event + '.'
            }
            else {
                this.eventMessage = 'The current value of the SimSelect Component is blank.'
            }
        }

        mouseLeaveHandler(event) {
            this.eventMessage = 'The mouse left SimSelect Component.'
        }

    }
</script>

<style>
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

