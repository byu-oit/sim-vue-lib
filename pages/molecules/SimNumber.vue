<template>
    <body>
    <div id="app">
        <div style="height: 150px; padding-top: 50px">
            <h1>Sim Input Examples</h1>
        </div>

        <div class="container">
            <div style="height: 500px; border: solid black 1px; background-color: #eff1f4; width: 100%">
                <h3 style="text-align: center">Small Inputs</h3>

                <div class="row">
                    <div class="col-1"></div>

                    <div class="col-3">
                        <sim-number
                                v-model="numberValue"
                                :value="numberValue"
                                :currency="currencySymbol"
                                label="Number with currency"
                                :size="theSize"
                                :precision="thePrecision"
                                :width="numberWidth"
                        ></sim-number>
                    </div>

                </div>


                <hr>

                <div style="height:15px"></div>

                <div class="row">
                    <div class="col-2"></div>
                    <div class="col-2">
                        <sim-select
                                v-model="theSize"
                                label="Component Size"
                                :items="sizeList"
                                v-on:input="sizeChanged($event)"
                                :textCentered=true
                                size="sm"
                                width="100px"
                        ></sim-select>
                    </div>
                    <div class="col-2">
                        <sim-select
                                v-model="currencySymbol"
                                label="Currency Symbol"
                                :items="currencies"
                                v-on:input="changeCurrency($event)"
                                :textCentered=true
                                size="sm"
                                width="100px"
                        ></sim-select>
                    </div>
                    <div class="col-2">
                        <sim-select
                                label="Decimal Precision"
                                :items="precisions"
                                v-on:input="changePrecision($event)"
                                :textCentered=true
                                size="sm"
                                width="100px"
                        ></sim-select>
                    </div>
                    <div class="col-2">
                        <sim-select
                                v-model="showLabel"
                                label="Always Show Label"
                                :items="yesNoList"
                                v-on:input="setShowLabel($event)"
                                :textCentered=true
                                size="sm"
                                width="100px"
                        ></sim-select>
                    </div>
                </div>

            </div>

        </div>
    </div>
    </body>
</template>

<script>
    import SimSelect from "./../../components/molecules/SimSelect"
    import SimNumber from "./../../components/molecules/sim-number/SimNumber"

    export default {
        name: "Inputs",
        components: {
            SimSelect,
            SimNumber,

        },
        data() {
            return {
                focused: false,
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
                disabled: true,
                itemsList: ['Ford','Chevrolet','Lexus','BMW','Mazda','Hyundai','Honda','Toyota','Dodge','Fiat','Jaguar'],
                itemValue: 'Mazda',
                itemValue2: '',
                numberValue: 234.56,
                blankNumber: '',
                twoDecimals: 2,
                today: '12 JUN 2019',
                sizeList: ['sm','md','lg'],
                theSize: 'sm',
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
        computed: {

        },

        watch: {
            theSize: function (newValue) {
                if (newValue === 'sm') {
                    this.numberWidth = '80px'
                    this.selectWidth = '100px'
                }
                else if (newValue === 'md') {
                    this.numberWidth = '110px'
                    this.selectWidth = '120px'
                }
                else {
                    this.numberWidth = '140px'
                    this.selectWidth = '140px'
                }
            }
        },

        mounted() {
            this.theSize = 'sm'
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

