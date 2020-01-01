<template>
    <form style="width: 100%">
        <h1 class="text-primary" style="text-align: center">Sim Date Example</h1>
        <div id="app">
        <div class="container">
            <div style="height: 500px; border: solid black 1px; width: 100%">
                <div class="row">
                    <div class="col-1"></div>
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
                        ></sim-date>
                    </div>

                </div>
                </div>
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

                </div>
                <div class="col-2">

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
            SimSelect

        },
        data() {
            return {
                focused: false,
                borderStyle: 'inset',
                borderList: ['none', 'inset', 'outset','shadow', 'solid'],
                required: false,
                sizeList: ['sm','md','lg'],
                theSize: 'md',

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
                itemsList: ['Ford','Chevrolet','Lexus','BMW','Mazda','Hyundai','Honda','Toyota','Dodge','Fiat','Jaguar'],
                itemValue: 'Mazda',
                itemValue2: '',
                numberValue: 234.56,
                blankNumber: '',
                twoDecimals: 2,
                today: '12 JUN 2019',

                numberWidth: '80px',
                selectWidth: '100px',
                currencySymbol: '',
                currencies: ['','$','€','£'],
                thePrecision: 2,
                precisions: [0,1,2,3,4,5],
                alwaysShowLabel: false,
                showLabel: 'No',
                yesNoList: ['Yes','No'],
            };
        },

        methods: {
            onBlurHandler() {
                this.focused = false
            },
            onInputHandler(event) {
                this.newValue = event
            },
            onFocusHandler() {
                this.focused = true
            },
            sizeChanged(event) {
                //this.theSize = event
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

</style>

