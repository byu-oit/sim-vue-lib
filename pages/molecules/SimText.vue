<template>
    <div id="app">
        <div style="height: 150px; padding-top: 50px">
            <h1>Sim Area Examples</h1>
        </div>

        <div style="height: 200px; border: solid black 1px; background-color: #eff1f4; width: 1000px;margin: auto;">
            <div class="row">
                <div class="col-1"></div>
                <div class="col-3">
                    <sim-text
                            @blur="onBlurHandler"
                            @input="onInputHandler"
                            @focus="onFocusHandler"
                            v-model="input1"
                            :value="input1"
                            placeholder="placeholder"
                            label="Events Example"
                    ></sim-text>
                </div>
                <div class="col-6">
                    <p style="margin-top: 30px">Focused: {{ focused }} --- Ending Value: {{ newValue}}</p>
                </div>
            </div>
        </div>

        <div style="height: 40px"></div>
        <div style="height: 200px; border: solid black 1px; width: 1000px; margin: auto;">
            <div class="row">
                <div class="col-1"></div>
                <div class="col-3">
                    <sim-text
                            @blur="onBlurHandler"
                            @input="onInputHandler"
                            @focus="onFocusHandler"
                            v-model="input1"
                            :value="input1"
                            placeholder="Type here"
                            label="Small example"
                            size="sm"
                    ></sim-text>
                </div>
                <div class="col-1"></div>
                <div class="col-3">
                    <sim-text
                            @blur="onBlurHandler"
                            @input="onInputHandler"
                            @focus="onFocusHandler"
                            v-model="input1"
                            :value="input1"
                            placeholder="Type here"
                            label="Large example"
                            size="lg"
                    ></sim-text>
                </div>
            </div>
        </div>

        <form>
            <div style="height: 40px"></div>
            <div style="height: 200px; border: solid black 1px; width: 1000px;margin: auto;">
                <div class="row">
                    <div class="col-1"></div>
                    <div class="col-3">
                        <sim-text
                                @blur="onBlurHandler"
                                @input="onInputHandler"
                                @focus="onFocusHandler"
                                v-model="input1"
                                :value="input1"
                                label="Disabled example"
                                disabled
                        ></sim-text>
                    </div>
                    <div class="col-1"></div>

                    <div class="col-3">
                        <sim-text
                                v-model="newValue"
                                label="Required tester"
                                :required="true"
                        ></sim-text>
                    </div>
                    <div class="col-1">
                        <sim-input
                                v-model="input1"
                                value="This is a test"
                                label="Small Input with data"
                                border="inset"
                                placeholder="Place Holder"
                                borderStyle="solid"
                                size="sm"
                        ></sim-input>
                        <input type="submit">
                    </div>

                </div>
            </div>
        </form>

    </div>
</template>

<script>
    import SimText from "./../../components/molecules/SimText.vue"
    import SimInput from "./../../components/molecules/SimInput.vue"

    export default {
        name: "TextArea",
        components: {
            SimText,
            SimInput
        },
        data() {
            return {
                focused: false,
                newValue: '',
                input1: '',
                input2: 'This is disabled',
                input3: 'Value',
                input4: 'No Label',
                input5: 'Normal Border',
                input6: '',
                input7: '234',
                disabled: true,
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
