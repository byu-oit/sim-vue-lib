<template>
    <div style="max-width: 300px; min-width: 220px; margin-right: 20px">
        <sim-year-term></sim-year-term>
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
