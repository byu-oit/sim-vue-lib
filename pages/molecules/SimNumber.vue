<template>
    <form style="width: 100%">
        <div id="app">
            <div style="height: 150px; padding-top: 50px">
                <h1>Sim Number Example</h1>
            </div>

            <div class="container">
                <div style="height: 500px; border: solid black 1px; background-color: #eff1f4; width: 100%">
                    <div class="row">
                        <div class="col-5"></div>
                        <div class="col-3">
                            <sim-number
                                    v-model="numberValue"
                                    :value="numberValue"
                                    :currency="currencySymbol"
                                    label="Number"
                                    :size="theSize"
                                    :disabled="disabled"
                                    :borderStyle="borderStyle"
                                    :precision="precision"
                                    :width="theWidth"
                                    :max="maxValue"
                                    :min="minValue"
                                    :minus="allowMinus"
                                    :inputClass="inputClass"
                                    :labelClass="labelClass"
                                    @input="onInputHandler"
                                    @change="onChangeHandler"
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
                                    label="Size"
                                    :items="sizeList"
                                    :textCentered=true
                                    width="100px"
                            ></sim-select>
                        </div>
                        <div class="col-2">
                            <sim-select
                                    v-model="currencySymbol"
                                    label="Currency Symbol"
                                    :items="currencies"
                                    :textCentered=true
                                    width="100px"
                            ></sim-select>
                        </div>
                        <div class="col-2">
                            <sim-select
                                    v-model="decPrecision"
                                    :value="decPrecision"
                                    label="Decimals"
                                    :items="decPrecisionList"
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
                    </div>
                    <div class="row">
                        <div class="col-1"></div>
                        <div class="col-2">
                            <sim-select
                                    v-model="maxValueStr"
                                    :value="maxValueStr"
                                    label="Max Value"
                                    :items="maxValueList"
                                    :textCentered=true
                                    width="100px"
                            ></sim-select>
                        </div>
                        <div class="col-2">
                            <sim-select
                                    v-model="minValueStr"
                                    :value="minValueStr"
                                    label="Min Value"
                                    :items="minValueList"
                                    :textCentered=true
                                    width="100px"
                            ></sim-select>
                        </div>
                        <div class="col-2" style="margin-top: 20px">
                            <input type="checkbox"
                                   id="allowMinus"
                                   :checked="allowMinus" @click='allowMinus = !allowMinus' style="padding-left: 10px; cursor: pointer">
                            <label for="allowMinus" style="margin-left: 3px">Allow Minus</label>
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
                        <div class="col-1"></div>
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
        newValue: string =  ''
        disabled: boolean = false
        required: boolean = false
        valueString: number = 0
        sizeList: string [] = ['sm','md','lg']
        theSize: string = 'md'
        borderStyle: string = 'inset'
        borderList: string [] = ['none', 'inset', 'outset','shadow', 'solid']
        currencySymbol: string = ''
        currencies: string [] = ['','$','€','£']
        decPrecision: string = '2'
        decPrecisionList: string [] = ['0','1','2','3','4','5']
        alwaysShowLabel: boolean = false
        maxValueStr: string = '1000'
        maxValueList: string [] = ['10','20','30','50','100','1000','10000']
        minValueStr: string = '-1000'
        minValueList: string [] = ['-10','-20','-30','-50','-100','-1000','-10000']
        numberValue: number  = 293.44
        allowMinus: boolean = true
        labelClass: string = ''
        inputClass: string = ''
        classList: string [] = ['', 'redText', 'greenText']

        /// Computed
        get precision () {
            return Number(this.decPrecision)
        }

        get maxValue () {
            return Number(this.maxValueStr)
        }

        get minValue () {
            return Number(this.minValueStr)
        }


        /// Methods
        onBlurHandler() {
            this.focused = false
        }

        onInputHandler(event) {
            this.valueString = event
        }

        onFocusHandler() {
            this.focused = true
        }

        onChangeHandler(event) {
            this.numberValue = Number(event)
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

