<template>
    <form style="width: 100%">
        <div id="app">
            <div style="height: 150px; padding-top: 50px">
                <h1>Sim Number Example</h1>
            </div>

            <div class="container">
                <div style="height: 500px; border: solid black 1px; background-color: #eff1f4; width: 100%">
                    <div class="row">
                        <div class="col-1"></div>
                        <div class="col-3">
                            <sim-number
                                    v-model="numberValue"
                                    :value="numberValue"
                                    :currency="currencySymbol"
                                    label="Number"
                                    :size="theSize"
                                    :precision="precision"
                                    :width="theWidth"
                            ></sim-number>
                        </div>
                    </div>
                    <hr>

                    <div style="height:15px"></div>

                    <div class="row">
                        <div class="col-1"></div>
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
                                    v-model="theSize"
                                    label="Component Size"
                                    :items="sizeList"
                                    v-on:input="sizeChanged($event)"
                                    :textCentered=true
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
                                    width="100px"
                            ></sim-select>
                        </div>
                        <div class="col-2">
                            <sim-select
                                    v-model="decPrecision"
                                    :value="decPrecision"
                                    label="Decimal Precision"
                                    :items="decPrecisionList"
                                    :textCentered=true
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
                                    width="100px"
                            ></sim-select>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    </form>
</template>

<script>
    import SimSelect from "./../../components/molecules/SimSelect"
    import SimNumber from "./../../components/molecules/SimNumber"

    export default {
        name: "Inputs",
        components: {
            SimSelect,
            SimNumber,

        },
        data() {
            return {
                theWidth: '100px',
                widthList: ['75px','100px','125px','150px','175px'],
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
                theSize: 'md',
                currencySymbol: '',
                currencies: ['','$','€','£'],
                decPrecision: '2',
                decPrecisionList: ['0','1','2','3','4','5'],
                alwaysShowLabel: false,
                showLabel: 'No',
                yesNoList: ['Yes','No'],
            };
        },
        computed: {
            precision () {
                return Number(this.decPrecision)
            }
        },

        watch: {

        },

        mounted() {

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
            setShowLabel(event) {
                this.alwaysShowLabel = (event === 'Yes')
                this.showLabel = event
            },
            changeCurrency(event) {
                this.currencySymbol = event
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

