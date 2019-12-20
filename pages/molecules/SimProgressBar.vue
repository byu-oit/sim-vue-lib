<template>
    <div id="app">
        <div style="height: 150px; padding-top: 50px">
            <h1>Progress Bar Example</h1>
        </div>
        <div class="progressBar" style="height: 100px; border: solid black 1px; margin: auto;">
            <div>
                <sim-progress-bar
                        :progressSections="numSections"
                        :progressObj="TestProgress"
                        :height="barHeight"
                        :width="barWidth"
                        :barColor="barColor"
                        :borderRadius="borderRadiusNum"
                        :borderStyle="borderStyle"
                        :theStyle="theStyle"
                        v-on:mouseover="mouseOverHandler($event)"
                        v-on:mouseleave="mouseLeaveHandler($event)"
                ></sim-progress-bar>
            </div>
        </div>
        <div class="progressBar">
            <h5>{{ message }}</h5>
        </div>
        <div style="height: 500px; border: solid black 1px; background-color: #eff1f4; width: 1000px; margin: auto;">
            <div class="row" style="margin-left: 0px">
                <div class="col-2"></div>
                <div class="col-2">
                    <sim-select
                            v-model="barHeight"
                            :value="barHeight"
                            label="Bar Height"
                            :items="heightList"
                            :textCentered=true
                            width="100px"
                    ></sim-select>
                </div>
                <div class="col-2">
                    <sim-select
                            v-model="barWidth"
                            :value="barWidth"
                            label="Bar Width"
                            :items="widthList"
                            :textCentered=true
                            width="100px"
                    ></sim-select>
                </div>
                <div class="col-2">
                    <sim-select
                            v-model="barColor"
                            :value="barColor"
                            label="Bar Color"
                            :items="barColorList"
                            :textCentered=true
                            width="150px"
                    ></sim-select>
                </div>
                <div class="col-2">
                    <sim-select
                            v-model="barSections"
                            :value="barSections"
                            label="Bar Sections"
                            :items="sectionsList"
                            :textCentered=true
                            width="100px"
                    ></sim-select>
                </div>
            </div>

            <div class="row" style="margin-left: 0px">
                <div class="col-2"></div>
                <div class="col-3">
                    <sim-select
                            v-model="theStyle"
                            :value="theStyle"
                            label="Custom Style"
                            :items="styleList"
                            :textCentered=true
                            width="200px"
                    ></sim-select>
                </div>
                <div class="col-2">
                    <sim-select
                            v-model="borderRadius"
                            :value="borderRadius"
                            label="Border Radius"
                            :items="radiusList"
                            :textCentered=true
                            width="100px"
                    ></sim-select>
                </div>

                <div class="col-2">
                    <sim-select
                            v-model="borderStyle"
                            :value="borderStyle"
                            label="Border Style"
                            :items="borderList"
                            :textCentered=true
                            width="100px"
                    ></sim-select>
                </div>

            </div>


            <hr/>
            <div class="row">
                <div class="col-" style="margin-left: 30px; margin-top: 20px; margin-bottom: 20px">Section 1</div>
                <div class="col-2">
                    <sim-select
                            v-model="TestProgress.backGroundColor.section1"
                            :value="TestProgress.backGroundColor.section1"
                            label="Color"
                            :items="sectionColorList"
                            :textCentered=true
                            width="150px"
                    ></sim-select>
                </div>
                <div class="col-2">
                    <sim-select
                            v-model="progressValue1"
                            :value="progressValue1"
                            label="Value"
                            :items="valueList"
                            :textCentered=true
                            width="100px"
                    ></sim-select>
                </div>
                <div class="col-2">
                    <sim-select
                            v-model="TestProgress.striped.section1"
                            :value="TestProgress.striped.section1"
                            label="Striped"
                            :items="stripeList"
                            :textCentered=true
                            width="100px"
                    ></sim-select>
                </div>
                <div class="col-2" style="">
                    <sim-select
                            v-model="TestProgress.showData.section1"
                            :value="TestProgress.showData.section1"
                            label="Show Data"
                            :items="showDataList"
                            :textCentered=true
                            width="100px"
                    ></sim-select>
                </div>
                <div class="col-2" style="">
                    <sim-select
                            v-model="decimalValue1"
                            :value="decimalValue1"
                            label="Decimal Places"
                            :items="decimalList"
                            :textCentered=true
                            width="100px"
                    ></sim-select>
                </div>
            </div>
            <div class="row">
                <div class="col-" style="margin-left: 30px; margin-top: 20px; margin-bottom: 20px">Section 2</div>
                <div class="col-2">
                    <sim-select
                            v-model="TestProgress.backGroundColor.section2"
                            :value="TestProgress.backGroundColor.section2"
                            label="Color"
                            :items="sectionColorList"
                            :textCentered=true
                            width="150px"
                    ></sim-select>
                </div>
                <div class="col-2">
                    <sim-select
                            v-model="progressValue2"
                            :value="progressValue2"
                            label="Value"
                            :items="valueList"
                            :textCentered=true
                            width="100px"
                    ></sim-select>
                </div>
                <div class="col-2">
                    <sim-select
                            v-model="TestProgress.striped.section2"
                            :value="TestProgress.striped.section2"
                            label="Striped"
                            :items="stripeList"
                            :textCentered=true
                            width="100px"
                    ></sim-select>
                </div>
                <div class="col-2" style="">
                    <sim-select
                            v-model="TestProgress.showData.section2"
                            :value="TestProgress.showData.section2"
                            label="Show Data"
                            :items="showDataList"
                            :textCentered=true
                            width="100px"
                    ></sim-select>
                </div>
                <div class="col-2" style="">
                    <sim-select
                            v-model="decimalValue2"
                            :value="decimalValue2"
                            label="Decimal Places"
                            :items="decimalList"
                            :textCentered=true
                            width="100px"
                    ></sim-select>
                </div>
            </div>
            <div class="row">
                <div class="col-" style="margin-left: 30px; margin-top: 20px; margin-bottom: 20px">Section 3</div>
                <div class="col-2">
                    <sim-select
                            v-model="TestProgress.backGroundColor.section3"
                            :value="TestProgress.backGroundColor.section3"
                            label="Color"
                            :items="sectionColorList"
                            :textCentered=true
                            width="150px"
                    ></sim-select>
                </div>
                <div class="col-2">
                    <sim-select
                            v-model="progressValue3"
                            :value="progressValue3"
                            label="Value"
                            :items="valueList"
                            :textCentered=true
                            width="100px"
                    ></sim-select>
                </div>
                <div class="col-2">
                    <sim-select
                            v-model="TestProgress.striped.section3"
                            :value="TestProgress.striped.section3"
                            label="Striped"
                            :items="stripeList"
                            :textCentered=true
                            width="100px"
                    ></sim-select>
                </div>
                <div class="col-2" style="">
                    <sim-select
                            v-model="TestProgress.showData.section3"
                            :value="TestProgress.showData.section3"
                            label="Show Data"
                            :items="showDataList"
                            :textCentered=true
                            width="100px"
                    ></sim-select>
                </div>
                <div class="col-2" style="">
                    <sim-select
                            v-model="decimalValue3"
                            :value="decimalValue3"
                            label="Decimal Places"
                            :items="decimalList"
                            :textCentered=true
                            width="100px"
                    ></sim-select>
                </div>
            </div>
            <div v-if="barSections >= 4" class="row">
                <div class="col-" style="margin-left: 30px; margin-top: 20px; margin-bottom: 20px">Section 4</div>
                <div class="col-2">
                    <sim-select
                            v-model="TestProgress.backGroundColor.section4"
                            :value="TestProgress.backGroundColor.section4"
                            label="Color"
                            :items="sectionColorList"
                            :textCentered=true
                            width="150px"
                    ></sim-select>
                </div>
                <div class="col-2">
                    <sim-select
                            v-model="progressValue4"
                            :value="progressValue4"
                            label="Value"
                            :items="valueList"
                            :textCentered=true
                            width="100px"
                    ></sim-select>
                </div>
                <div class="col-2">
                    <sim-select
                            v-model="TestProgress.striped.section4"
                            :value="TestProgress.striped.section4"
                            label="Striped"
                            :items="stripeList"
                            :textCentered=true
                            width="100px"
                    ></sim-select>
                </div>
                <div class="col-2" style="">
                    <sim-select
                            v-model="TestProgress.showData.section4"
                            :value="TestProgress.showData.section4"
                            label="Show Data"
                            :items="showDataList"
                            :textCentered=true
                            width="100px"
                    ></sim-select>
                </div>
                <div class="col-2" style="">
                    <sim-select
                            v-model="decimalValue4"
                            :value="decimalValue4"
                            label="Decimal Places"
                            :items="decimalList"
                            :textCentered=true
                            width="100px"
                    ></sim-select>
                </div>
            </div>

            <div v-if="barSections >= 5" class="row">
                <div class="col-" style="margin-left: 30px; margin-top: 20px; margin-bottom: 20px">Section 5</div>
                <div class="col-2">
                    <sim-select
                            v-model="TestProgress.backGroundColor.section5"
                            :value="TestProgress.backGroundColor.section5"
                            label="Color"
                            :items="sectionColorList"
                            :textCentered=true
                            width="150px"
                    ></sim-select>
                </div>
                <div class="col-2">
                    <sim-select
                            v-model="progressValue5"
                            :value="progressValue5"
                            label="Value"
                            :items="valueList"
                            :textCentered=true
                            width="100px"
                    ></sim-select>
                </div>
                <div class="col-2">
                    <sim-select
                            v-model="TestProgress.striped.section5"
                            :value="TestProgress.striped.section5"
                            label="Striped"
                            :items="stripeList"
                            :textCentered=true
                            width="100px"
                    ></sim-select>
                </div>
                <div class="col-2" style="">
                    <sim-select
                            v-model="TestProgress.showData.section5"
                            :value="TestProgress.showData.section5"
                            label="Show Data"
                            :items="showDataList"
                            :textCentered=true
                            width="100px"
                    ></sim-select>
                </div>
                <div class="col-2" style="">
                    <sim-select
                            v-model="decimalValue5"
                            :value="decimalValue5"
                            label="Decimal Places"
                            :items="decimalList"
                            :textCentered=true
                            width="100px"
                    ></sim-select>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Vue, Watch } from 'nuxt-property-decorator'
    import SimProgressBar from '~/components/molecules/SimProgressBar.vue'
    import SimSelect from '~/components/molecules/SimSelect.vue'

    export interface progressObj {
        value: {
            section1: number,
            section2: number,
            section3: number,
            section4: number,
            section5: number,

        },
        backGroundColor: {
            section1: string,
            section2: string,
            section3: string,
            section4: string,
            section5: string,
        },
        striped: {
            section1: string,
            section2: string,
            section3: string,
            section4: string,
            section5: string,
        },
        showData: {
            section1: string,
            section2: string,
            section3: string,
            section4: string,
            section5: string,
        },
        decimalPlaces: {
            section1: number,
            section2: number,
            section3: number,
            section4: number,
            section5: number,
        },
    }

    @Component({
        components: {
            SimProgressBar,
            SimSelect
        }
    })
    export default class ProgressBarExample extends Vue {
        barHeight: string = '30px'
        heightList: string [] = ['20px', '25px', '30px','35px','40px','45px']

        barWidth: string = '350px'
        widthList: string [] = ['250px', '300px', '350px','400px','450px','500px','600px']

        barColor: string = '#edeef0'
        barColorList: string [] = ['#edeef0', 'white', 'lightyellow','lightgray','black']

        barSections: string = '3'
        sectionsList: string [] = ['1','2','3','4','5']

        borderRadius: string = '8'
        radiusList: string [] = ['0','2','4','6','8','10','12','14','16']

        borderStyle: string = 'none'
        borderList: string [] = ['none','inset', 'outset', 'shadow', 'solid']

        decimalList: string [] = ['0','1','2','3','4']

        stripeList: string [] = ['none', 'forward', 'backward']
        sectionColorList: string [] = ['lightblue', 'lightcoral', 'lightcyan','lightpink','lightgreen','lightsalmon']
        showDataList: string [] = ['percentage', 'value', 'none']
        valueList: string [] = ['0','10','15','20','25','30','35','40','50','60','70','80','90']
        theStyle: string = ''
        styleList: string [] = ['','opacity: .5','border-bottom: 3px solid black','font-size: 16px']
        message: string = ''

        progressValue1: string = '15'
        progressValue2: string ='40'
        progressValue3: string ='25'
        progressValue4: string ='10'
        progressValue5: string ='60'

        decimalValue1: string ='1'
        decimalValue2: string ='1'
        decimalValue3: string ='1'
        decimalValue4: string ='1'
        decimalValue5: string ='1'

        TestProgress: progressObj = {
            value: {
                section1: 15,
                section2: 40,
                section3: 25,
                section4: 10,
                section5: 60,

            },
            backGroundColor: {
                section1: 'lightblue',
                section2: 'lightgreen',
                section3: 'lightsalmon',
                section4: 'lightpink',
                section5: 'lightcoral'
            },
            striped: {
                section1: 'none',
                section2: 'forward',
                section3: 'none',
                section4: 'backward',
                section5: 'none'
            },
            showData: {
                section1: 'value',
                section2: 'value',
                section3: 'value',
                section4: 'value',
                section5: 'value',
            },
            decimalPlaces: {
                section1: 1,
                section2: 1,
                section3: 1,
                section4: 1,
                section5: 1,
            },
        }

        get numSections () {
            return parseInt(this.barSections)
        }

        get borderRadiusNum() {
            return parseInt(this.borderRadius)
        }

        @Watch('progressValue1')
        onProgressValue1Changed(newValue: string, oldValue: string) {
            if (newValue) {
                this.TestProgress.value.section1 = parseInt(newValue)
            }
        }

        @Watch('progressValue2')
        onProgressValue2Changed(newValue: string, oldValue: string) {
            if (newValue) {
                this.TestProgress.value.section2 = parseInt(newValue)
            }
        }

        @Watch('progressValue3')
        onProgressValue3Changed(newValue: string, oldValue: string) {
            if (newValue) {
                this.TestProgress.value.section3 = parseInt(newValue)
            }
        }

        @Watch('progressValue4')
        onProgressValue4Changed(newValue: string, oldValue: string) {
            if (newValue) {
                this.TestProgress.value.section4 = parseInt(newValue)
            }
        }

        @Watch('progressValue5')
        onProgressValue5Changed(newValue: string, oldValue: string) {
            if (newValue) {
                this.TestProgress.value.section5 = parseInt(newValue)
            }
        }

        @Watch('decimalValue1')
        onDecimalValue1Changed(newValue: string, oldValue: string) {
            if (newValue) {
                this.TestProgress.decimalPlaces.section1 = parseInt(newValue)
            }
        }

        @Watch('decimalValue2')
        onDecimalValue2Changed(newValue: string, oldValue: string) {
            if (newValue) {
                this.TestProgress.decimalPlaces.section2 = parseInt(newValue)
            }
        }

        @Watch('decimalValue3')
        onDecimalValue3Changed(newValue: string, oldValue: string) {
            if (newValue) {
                this.TestProgress.decimalPlaces.section3 = parseInt(newValue)
            }
        }

        @Watch('decimalValue4')
        onDecimalValue4Changed(newValue: string, oldValue: string) {
            if (newValue) {
                this.TestProgress.decimalPlaces.section4 = parseInt(newValue)
            }
        }

        @Watch('decimalValue5')
        onDecimalValue5Changed(newValue: string, oldValue: string) {
            if (newValue) {
                this.TestProgress.decimalPlaces.section5 = parseInt(newValue)
            }
        }

        mouseOverHandler(event) {
            this.message = 'Section #' + event.section + ' - value = ' + event.value + ' - percentage = ' + event.percentage
        }

        mouseLeaveHandler(event) {
            this.message = 'The mouse left Section #' + event.section
        }
    }
</script>

<style scoped>

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
    .progressBar {
        display: flex;
        justify-content: center;
        padding: 20px;
    }

</style>

