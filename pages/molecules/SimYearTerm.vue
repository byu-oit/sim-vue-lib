<template>
    <div class="container">
        <div style="display: flex; justify-content: center">
            <div>
                <sim-year-term
                        v-model="simLabelInput"
                        :simLabelInput="simLabelInput"
                        :from="startingYearTerm"
                        :nNext="nNext"
                        :nPrev="nPrev"
                        :byTerms="byTerms"
                        v-on:change="yearTermChanged($event)"
                        v-on:blur="onBlurHandler($event)"
                        v-on:focus="onFocusHandler($event)"
                        v-on:mouseover="mouseOverHandler($event)"
                        v-on:mouseleave="mouseLeaveHandler"

                >
                </sim-year-term>
            </div>
        </div>
        <hr>
        <div class="row">
            <div class="col-2"></div>
            <div class="col-2">
                <sim-select
                        v-model="startingYearTerm"
                        :value="startingYearTerm"
                        label="Starting Year Term"
                        :items="yearTermList"
                        :textCentered=true
                        width="100px"

                ></sim-select>
            </div>
            <div class="col-2">
                <sim-select
                        v-model="futureYearTerms"
                        :value="futureYearTerms"
                        label="Future Year Terms"
                        :items="termsList"
                        :textCentered=true
                        width="100px"

                ></sim-select>
            </div>
            <div class="col-2">
                <sim-select
                        v-model="pastYearTerms"
                        :value="pastYearTerms"
                        label="Past Year Terms"
                        :items="termsList"
                        :textCentered=true
                        width="100px"

                ></sim-select>
            </div>
            <div class="row">
                <div class="col-2"></div>
                <div class="col-10">
                    <p>The 3 select components above determine how the list of Year Terms will be built.</p>
                </div>
            </div>
        </div>


        <div style="display: flex; justify-content: space-around; margin-top: 20px">
            {{ lastInputMessage }}
        </div>
        <div style="display: flex; justify-content: space-around; margin-top: 20px">
            {{ eventMessage }}
        </div>
        <div style="display: flex; justify-content: space-around; margin-top: 20px">
            {{ keyPressMessage }}
        </div>
        <hr>
    </div>
</template>

<script>
    import SimYearTerm from "./../../components/molecules/SimYearTerm"
    import SimSelect from './../../components/molecules/SimSelect'

    export default {
        name: "SimYearTermPage",
        components: {
            SimYearTerm,
            SimSelect
        },

        data() {
            return {
                simLabelInput: '',
                nNext: 7,
                nPrev: 3,
                byTerms: false,
                lastInputMessage: '',
                eventMessage: '',
                keyPressMessage: '',

                startingYearTerm: '2019-1',
                yearTermList: ['2017-1', '2018-1', '2019-1','2020-1','2021-1'],
                futureYearTerms: '3',
                pastYearTerms: '5',
                termsList: ['1','2','3','4','5','6','7','8']
            };
        },

        mounted() {
            this.simLabelInput = this.startingYearTerm
        },

        methods: {
            yearTermChanged(event) {
                this.simLabelInput = event
                this.lastInputMessage = event + ': was entered at ' + new Date()
            },

            onBlurHandler() {
                this.focused = false
                this.eventMessage = 'The SimYearTerm component NOT focused.'
            },

            onInputHandler(event) {
                this.newValue = event
            },
            onFocusHandler() {
                this.focused = true
                this.eventMessage = 'The SimYearTerm component IS focused.'
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
        }
    };
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

</style>
