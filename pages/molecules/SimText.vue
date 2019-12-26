<template>
    <form style="width: 100%">
        <h1 class="text-primary" style="text-align: center">Sim Text Example</h1>
        <div style="display: flex; justify-content: space-around">
            <div class="row">
                <div class="col-3"></div>
                <div class="col-2">
                    <sim-text
                            v-model="testValue2"
                            :value="testValue2"
                            :label="theLabel"
                            :borderStyle="borderStyle"
                            placeHolder="Enter your dog's life history"
                            size="md"
                            :rows=6
                            :disabled="disabled"
                            width="200px"
                            :minLength="minLength"
                            :maxLength="maxLength"
                            :required="required"
                    ></sim-text>
                </div>
                <div class="col-6">
                    <sim-text
                            v-model="testValue"
                            :value="testValue"
                            label="Your dog's life history"
                            :borderStyle="borderStyle"
                            placeHolder="Enter your dog's life history"
                            :size="theSize"
                            :rows="numRows"
                            :disabled="disabled"
                            :width="theWidth"
                            :minLength="minLength"
                            :maxLength="maxLength"
                            :required="required"
                            :alwaysShowLabel="alwaysShowLabel"
                            :inputClass="inputClass"
                            :labelClass="labelClass"
                            v-on:input="onInputHandler"
                            v-on:blur="onBlurHandler"
                            v-on:focus="onFocusHandler"
                            v-on:keypress="onKeyPressHandler"
                            v-on:mouseover="mouseOverHandler($event)"
                            v-on:mouseleave="mouseLeaveHandler($event)"
                    ></sim-text>
                </div>
            </div>
        </div>
        <div style="display: flex; justify-content: space-around; margin-top: 20px">
            {{ lastSelectedMsg }}
        </div>
        <div style="display: flex; justify-content: space-around; margin-top: 20px">
            {{ eventMessage }}
        </div>
        <div style="display: flex; justify-content: space-around; margin-top: 20px">
            {{ keyPressMessage }}
        </div>
        <hr>
        <div class="row">
        <div class="col-2"></div>
        <div class="col-2">
            <sim-select
                    v-model="theSize"
                    :value="theSize"
                    label="Size"
                    :items="sizeList"
                    :textCentered=true
                    width="100px"

            ></sim-select>
        </div>
        <div class="col-2">
            <sim-select
                    v-model="theWidth"
                    :value="theWidth"
                    label="Width"
                    :items="widthList"
                    :textCentered=true
                    width="100px"
            ></sim-select>
        </div>
        <div class="col-2">
            <sim-select
                    v-model="rows"
                    :value="rows"
                    label="Rows"
                    :items="rowsList"
                    :textCentered=true
                    width="100px"
            ></sim-select>
        </div>
        <div class="col-2">
            <sim-select
                    v-model="borderStyle"
                    :value="borderStyle"
                    label="Border style"
                    :items="borderList"
                    :textCentered=true
                    width="100px"

            ></sim-select>
        </div>

    </div>
        <div class="row">
            <div class="col-2"></div>

            <div class="col-2">
                <sim-select
                        v-model="minLength"
                        :value="minLength"
                        label="Min Length"
                        :items="lengthList"
                        :textCentered=true
                        width="100px"
                ></sim-select>
            </div>
            <div class="col-2">
                <sim-select
                        v-model="maxLength"
                        :value="maxLength"
                        label="Max Length"
                        :items="lengthList"
                        :textCentered=true
                        width="100px"
                ></sim-select>
            </div>
            <div class="col-2">
                <sim-select
                        v-model="inputClass"
                        :value="inputClass"
                        label="Input Class"
                        :items="classList"
                        :textCentered=true
                        width="100px"
                ></sim-select>
            </div>
            <div class="col-2">
                <sim-select
                        v-model="labelClass"
                        :value="labelClass"
                        label="Label Class"
                        :items="classList"
                        :textCentered=true
                        width="100px"

                ></sim-select>
            </div>
        </div>
        <div class="row">
            <div class="col-2"></div>
            <div class="col-2" style="margin-top: 20px">
                <input type="checkbox"
                       id="required"
                       :checked="required" @click='required = !required' style="padding-left: 10px; cursor: pointer">
                <label for="required" style="margin-left: 3px">Required</label>
            </div>
            <div class="col-2" style="margin-top: 20px">
                <input type="checkbox"
                       id="disabled"
                       :checked="disabled" @click='disabled = !disabled' style="padding-left: 10px; cursor: pointer">
                <label for="disabled" style="margin-left: 3px">Disabled</label>
            </div>
            <div class="col-2" style="margin-top: 20px">
                <input type="checkbox"
                       id="alwaysShowLabel"
                       :checked="alwaysShowLabel" @click='alwaysShowLabel = !alwaysShowLabel' style="padding-left: 10px; cursor: pointer">
                <label for="alwaysShowLabel" style="margin-left: 3px">Always Show Label</label>
            </div>
            <div class="col-2" style="margin-top: 20px">
                <input type="checkbox"
                       id="labelExample"
                       :checked="alwaysShowLabel" @click='blankLabel = !blankLabel' style="padding-left: 10px; cursor: pointer">
                <label for="labelExample" style="margin-left: 3px">{{ checkboxLabel }}</label>
            </div>

        </div>
        <div class="row">
            <div class="col-2"></div>
            <div class="col-2" style="margin-top: 20px">
                <button class="btn-primary btn-ml" type="submit" @click="userMessage=''">Submit</button>
            </div>
        </div>
        <hr>
        <div style="margin-left: 100px">
            <h5>Always Show Label</h5>
        </div>
        <div style="margin-left: 150px">
            If 'Always Show Label' is selected the label will always appear above the the input control.
        </div>
        <div style="margin-left: 150px">
            Otherwise, if the input is blank the label will be hidden (but the place holder will be visible) until data is entered in the input. Then the place holder will be hidden and the label shown.
        </div>

        <p></p>
        <div style="margin-left: 100px">
            <h5>Blank Labels</h5>
        </div>
        <div style="margin-left: 150px">
            If the label is blank then the sim-input's height will be reduced and the input box will be higher (see the 3rd sim-input)
        </div>
        <div style="margin-left: 150px">
            If you have several sim-input components on a row and some have labels and others do not, pass in a value of '**' for the labels that you want blank.
        </div>
        <div style="margin-left: 175px">
            This will cause the label to be blank but will not affect the height and the sim-input components will line up horizontally. (Click the checkbox to see.)
        </div>

    </form>
</template>

<script lang="ts">
    import { Component,  Watch, Vue } from 'nuxt-property-decorator'
    import SimText from '~/components/molecules/SimText.vue'
    import SimSelect from '~/components/molecules/SimSelect.vue'

    @Component({
        components: {
            SimText,
            SimSelect
        }
    })
    export default class App extends Vue {
        testValue: string = ''
        testValue2: string = "Click the 'Label is blank' checkbox to see the difference between a blank label and a label = '**'."
        alwaysShowLabel: boolean = true
        blankLabel: boolean = true

        borderStyle: string = 'inset'
        borderList: string [] = ['none', 'inset', 'outset','shadow', 'solid']
        disabled: boolean = false
        theWidth: string = '400px'
        widthList: string [] = ['100px','150px','200px','300px','400px','500px','600px']
        required: boolean = false
        userMessage: string = ''
        inputClass: string = ''
        labelClass: string = ''
        classList: string [] = ['', 'redText', 'greenText']

        rows: string = '3'
        rowsList: string [] = ['2','3','4','5','6','7','8']

        minLength: string = '10'
        maxLength: string = '30'
        lengthList: string [] = ['0','5','10','20','30','60','120']

        theSize: string = 'md'
        sizeList: string [] = ['sm', 'md', 'lg']
        lastSelectedMsg: string = ''
        eventMessage: string = ''
        keyPressMessage: string = ''

        get numRows() {
            return parseInt(this.rows)
        }

        get theLabel () {
            if (this.blankLabel) {
                return ''
            }
            return '**'
        }

        get checkboxLabel() {
            if (this.blankLabel) {
                return 'Label is blank'
            }
            return 'Label is **'
        }

        onInputHandler(event) {
            this.lastSelectedMsg = event + ' was entered at ' + new Date()
        }

        onBlurHandler() {
            this.eventMessage = 'The SimText component NOT focused.'
        }

        onFocusHandler() {
            this.eventMessage = 'The SimText component is now focused.'
        }

        onKeyPressHandler(event) {
            this.keyPressMessage = 'A key was pressed. The input length is now ' + parseInt(event.length+ 1)  + ' characters.'
        }

        mouseOverHandler(event) {
            if (event > ' ') {
                this.eventMessage = 'The current value of the SimText Component is: ' + event + '.'
            }
            else {
                this.eventMessage = 'The current value of the SimText Component is blank.'
            }
        }

        mouseLeaveHandler(event) {
            this.eventMessage = 'The mouse left SimText Component.'
        }

        @Watch('required')
        onPropertyChanged(value: string, oldValue: string) {
            if (value) {
                this.testValue = ''
                this.userMessage = 'Click the Submit button to verify the required setting'
            }
        }
    }
</script>

<style>
    .redText {
        color: red
    }
    .greenText {
        color: green
    }
</style>


