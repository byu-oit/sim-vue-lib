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

<script lang="ts">
    import { Component,  Watch, Vue } from 'nuxt-property-decorator'
    import SimNumber from '~/components/molecules/SimNumber.vue'
    import SimSelect from '~/components/molecules/SimSelect.vue'

    @Component({
        components: {
            SimNumber,
            SimSelect
        }
    })

    export default class App extends Vue {
        theWidth: string = '100px'
        widthList: string [] = ['75px','100px','125px','150px','175px']
        focused: boolean = false
        blankDate: string =  ''
        newValue: string =  ''
        testValue: string =  'This is a test'
        input1: string =  'Sim-Input'
        input2: string =  'This is disabled'
        input3: string =  ''
        input4: string =  'No Label'
        input5: string =  'Normal Border'
        input6: string =  ''
        input7: string =  '234'
        disabled: boolean = true
        itemValue2: string =  ''
        numberValue: number = 234.56
        blankNumber: string = ''
        twoDecimals: number = 2
        today: string = '12 JUN 2019'
        sizeList: string [] = ['sm','md','lg']
        theSize: string = 'md'
        currencySymbol: string = ''
        currencies: string [] = ['','$','€','£']
        decPrecision: string = '2'
        decPrecisionList: string [] = ['0','1','2','3','4','5']
        alwaysShowLabel: boolean = false
        showLabel: string = 'No'
        yesNoList: string [] = ['Yes','No']

        /// Computed
        get precision () {
            return Number(this.decPrecision)
        }

        /// Methods
        onBlurHandler() {
            this.focused = false
        }

        onInputHandler(event) {
            this.newValue = event
        }

        onFocusHandler() {
            this.focused = true
        }

        setShowLabel(event) {
            this.alwaysShowLabel = (event === 'Yes')
            this.showLabel = event
        }

        changeCurrency(event) {
            this.currencySymbol = event
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

