<template>
    <form style="width: 100%">
        <h1 class="text-primary" style="text-align: center">Sim Date Example</h1>
        <div id="app">
            <div class="container">
            <div style="height: 150px; border: solid black 1px; width: 100%">
                <div class="row">
                    <div class="col-5"></div>
                    <div class="col-3">
                        <sim-date
                                style="background-color: transparent"
                                v-model="today"
                                :value="today"
                                label="Date with data"
                                :borderStyle="borderStyle"
                                placeholder="Place Holder"
                                :size="theSize"
                                :disabled="disabled"
                                :required="required"
                                :alwaysShowLabel="alwaysShowLabel"
                                :inputClass="inputClass"
                                :labelClass="labelClass"
                                :format="theFormat"
                                :underlineOnFocus="underlineOnFocus"
                                v-on:input="onInputHandler"
                                v-on:blur="onBlurHandler"
                                v-on:focus="onFocusHandler"
                                v-on:keypress="onKeyPressHandler"
                                v-on:mouseover="mouseOverHandler($event)"
                                v-on:mouseleave="mouseLeaveHandler($event)"
                        ></sim-date>
                    </div>
                </div>
            </div>
                <hr>
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
                            v-model="borderStyle"
                            :value="borderStyle"
                            label="Border style"
                            :items="borderList"
                            :textCentered=true
                            width="100px"

                    ></sim-select>
                </div>
                <div class="col-2" style="margin-top: 20px">
                    <input type="checkbox"
                           id="disabled"
                           :checked="disabled" @click='disabled = !disabled' style="padding-left: 10px; cursor: pointer">
                    <label for="disabled" style="margin-left: 3px">Disabled</label>
                </div>
                <div class="col-2" style="margin-top: 20px">
                    <input type="checkbox"
                           id="required"
                           :checked="required" @click='required = !required' style="padding-left: 10px; cursor: pointer">
                    <label for="required" style="margin-left: 3px">Required</label>
                </div>
            </div>
            <div class="row">
            <div class="col-2"></div>
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
            <div class="col-2" style="margin-top: 20px">
                <input type="checkbox"
                       id="alwaysShowLabel"
                       :checked="alwaysShowLabel" @click='alwaysShowLabel = !alwaysShowLabel' style="padding-left: 10px; cursor: pointer">
                <label for="alwaysShowLabel" style="margin-left: 3px">Always Show Label</label>
            </div>
            <div class="col-2" style="margin-top: 20px">
                <button class="btn-primary btn-ml" type="submit" @click="userMessage=''">Submit</button>
            </div>
        </div>
            <div class="row">
                <div class="col-2"></div>
                <div class="col-3">
                    <sim-select
                            v-model="theFormat"
                            :value="theFormat"
                            label="Date Format"
                            :items="formatList"
                            :textCentered=true
                            width="150px"
                    ></sim-select>
                </div>

                <div class="col-3" style="margin-top: 20px">
                    <input type="checkbox"
                           id="underLineOnFocus"
                           :checked="underlineOnFocus" @click='underlineOnFocus = !underlineOnFocus' style="padding-left: 10px; cursor: pointer">
                    <label for="underLineOnFocus" style="margin-left: 3px">Underline on Focus</label>
                </div>

                <div class="col-2" style="margin-top: 20px">

                </div>
                <div class="col-2" style="margin-top: 20px">

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
                This will cause the label to be blank but will not affect the height and the sim-input components will line up horizontally. (See 2nd sim-input)
            </div>
        </div>
        </div>
    </form>
</template>

<script>
    import SimDate from '~/components/molecules/sim-date/index.vue'
    import SimSelect from '~/components/molecules/SimSelect.vue'


    export default {
        name: "SimDatePicker",
        components: {
            SimDate,
            SimSelect,

        },
        data() {
            return {
                focused: false,
                borderStyle: 'inset',
                borderList: ['none', 'inset', 'outset','shadow', 'solid'],
                required: false,
                sizeList: ['sm','md','lg'],
                theSize: 'md',
                inputClass: '',
                labelClass: '',
                classList: ['', 'redText', 'greenText'],
                theFormat: '',
                formatList: ['','DD MMM YYYY','YYYY MM DD','YYYY-MM-DD','DD/MM/YYYY','MMM DD YYYY'],
                underlineOnFocus: true,
                lastSelectedMsg: '',
                eventMessage: '',
                keyPressMessage: '',


                blankDate: '',
                newValue: '',
                testValue: 'This is a test',
                input1: 'Sim-Input',
                input2: 'This is disabled',
                input3: '',
                input4: 'No Label',
                input5: 'Normal Border',
                input6: '',
                input7: '234',
                disabled: false,

                itemValue2: '',
                numberValue: 234.56,
                blankNumber: '',
                twoDecimals: 2,
                today: '12 JUN 2019',

                numberWidth: '80px',
                selectWidth: '100px',

                alwaysShowLabel: false,
                showLabel: 'No',
                yesNoList: ['Yes','No'],

                testValue2: 'Data Here'
            };
        },

        methods: {

            onInputHandler(event) {
                this.lastSelectedMsg = event + ' was entered at ' + new Date()
            },

            onBlurHandler() {
                this.eventMessage = 'The SimSelect component NOT focused.'
            },

            onFocusHandler() {
                this.eventMessage = 'The SimSelect component is now focused.'
            },

            onKeyPressHandler(event) {
                this.keyPressMessage = 'A key was pressed. The input length is now ' + parseInt(event.length+ 1)  + ' characters.'
            },

            mouseOverHandler(event) {
                if (event > ' ') {
                    this.eventMessage = 'The current value of the SimInput Component is: ' + event + '.'
                }
                else {
                    this.eventMessage = 'The current value of the SimInput Component is blank.'
                }
            },

            mouseLeaveHandler(event) {
                this.eventMessage = 'The mouse left SimInput Component.'
            },
            setShowLabel(event) {
                this.alwaysShowLabel = (event === 'Yes')
                this.showLabel = event
            },
            changeCurrency(event) {
                this.currencySymbol = event
            },
            changePrecision(event) {
                this.thePrecision = 3
            }
        }

    };
</script>

<style>

    #app {
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
        margin: auto;
    }
    .label {
        width: 200px;
        text-align: right;
        margin-right: -30px;
        padding-top: 4px;
    }
    .column1 {
        padding-top: 10px;
        padding-left: 40px;
        float: left;
        width: 100%;
    }
    .redText {
        color: red
    }
    .greenText {
        color: green
    }
</style>

