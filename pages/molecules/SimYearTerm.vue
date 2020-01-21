<template>
    <div class="container">
        <div style="display: flex">
            <div style="justify-content: space-around;width: 100%">
                <sim-year-term
                        v-model="simLabelInput"
                        :simLabelInput="simLabelInput"
                        :from="from"
                        :nNext="nNext"
                        :nPrev="nPrev"
                        :byTerms="byTerms"
                        @yearTerm-globalValueUpdated="yearTermChanged($event)"

                >
                </sim-year-term>
            </div>
        </div>
    </div>
</template>

<script>
    import SimYearTerm from "./../../components/molecules/SimYearTerm"

    export default {
        name: "SimYearTermPage",
        components: {
            SimYearTerm,
        },

        data() {
            return {
                simLabelInput: '2020-1',
                from: '2020',
                nNext: 7,
                nPrev: 3,
                byTerms: false
            };
        },
        methods: {
            yearTermChanged(event) {
                this.simLabelInput = event.val
                console.log('simLabelInput = ', this.simLabelInput)
            },
            onBlurHandler() {
                this.focused = false
            },
            onInputHandler(event) {
                this.newValue = event
            },
            onFocusHandler() {
                this.focused = true
            }
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
