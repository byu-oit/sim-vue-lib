<template>
    <form style="width: 100%">
        <h1 class="text-primary" style="text-align: center">Sim Label Example</h1>
        <div style="display: flex; justify-content: space-around">
            <sim-label
                    class="col-5"
                    :config="{label: theLabel, hasClearButton: hasClearButton, disabled: disabled, line: hasLine}">
                <input type="text" :maxlength="maxLength" size="20" v-model="simLabelInput" :required="required" :disabled="disabled">
            </sim-label>
        </div>
        <div style="display: flex; justify-content: space-around; margin-top: 20px">
            {{ lastSelectedMsg }}
        </div>
        <div style="display: flex; justify-content: space-around; margin-top: 20px">
            {{ eventMessage }}
        </div>
        <hr>
        <div class="row">
            <div class="col-2"></div>
            <div class="col-2">
                <sim-select
                        v-model="maxLength"
                        :value="maxLength"
                        label="Max Length"
                        :items="lengthList"
                        :textCentered=true
                        width="100px"

                ></sim-select>
            </div>
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
                        v-model="theLabel"
                        :value="theLabel"
                        label="Label"
                        :items="labelList"
                        :textCentered=true
                        width="150px"
                ></sim-select>
            </div>
            <div class="col-2" style="margin-top: 20px">
                <input type="checkbox"
                       id="hasLine"
                       :checked="hasLine" @click='hasLine = !hasLine' style="padding-left: 10px; cursor: pointer">
                <label for="hasLine" style="margin-left: 3px">Has Line</label>
            </div>

        </div>
        <div class="row">
            <div class="col-2"></div>
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
            <div class="col-2" style="margin-top: 20px">
                <input type="checkbox"
                       id="disabled"
                       :checked="disabled" @click='disabled = !disabled' style="padding-left: 10px; cursor: pointer">
                <label for="disabled" style="margin-left: 3px">Disabled</label>
            </div>
            <div class="col-2" style="margin-top: 20px">
                <input type="checkbox"
                       id="hasClearButton"
                       :checked="hasClearButton" @click='hasClearButton = !hasClearButton' style="padding-left: 10px; cursor: pointer">
                <label for="hasClearButton" style="margin-left: 3px">Has Clear Button</label>
            </div>
        </div>
        <div class="row">
            <div class="col-2"></div>
            <div class="col-2" style="margin-top: 20px">
                <input type="checkbox"
                       id="required"
                       :checked="required" @click='required = !required' style="padding-left: 10px; cursor: pointer">
                <label for="required" style="margin-left: 3px">Required</label>
            </div>
            <div class="col-2">
                <div class="col-2" style="margin-top: 20px">
                    <button class="btn-primary btn-ml" type="submit" @click="userMessage=''">Submit</button>
                </div>
            </div>

        </div>
        <hr>

    </form>
</template>

<script lang="ts">
    import { Component, Vue } from 'nuxt-property-decorator'
    import SimSelect from '~/components/molecules/SimSelect.vue'
    import SimLabel from '~/components/molecules/sim-label/SimLabel.vue'

    @Component({
        components: {
            SimSelect,
            SimLabel
        }
    })
    export default class App extends Vue {
        simLabelInput: string = ''
        hasClearButton: boolean = true
        hasLine: boolean = true

        theWidth: string = '150px'
        widthList: string [] = ['50px','100px','150px','200px','250px']
        theLabel: string = 'Car Brand'
        labelList: string [] = ['Car Brand', 'Favorite Brand', 'Best Brand', 'Worst Brand']
        maxLength: string = '80'
        lengthList: string [] = ['10', '40', '80', '100', '150', '300']

        textCentered: boolean = true
        disabled: boolean = false
        lastSelectedMsg: string = ''
        eventMessage: string = ''
        inputClass: string = ''
        labelClass: string = ''
        classList: string [] = ['', 'redText', 'greenText']
        required: boolean = false

        onInputHandler(event) {
            this.lastSelectedMsg = event + ' was selected at ' + new Date()
        }

        onBlurHandler() {
            this.eventMessage = 'The SimSelect component NOT focused.'
        }

        onFocusHandler() {
            this.eventMessage = 'The SimSelect component is now focused.'
        }

        mouseOverHandler(event) {
            if (event > ' ') {
                this.eventMessage = 'The current value of the SimSelect Component is: ' + event + '.'
            }
            else {
                this.eventMessage = 'The current value of the SimSelect Component is blank.'
            }
        }

        mouseLeaveHandler(event) {
            this.eventMessage = 'The mouse left SimSelect Component.'
        }

    }
</script>

<style>
    .redText {
        color: red
    }
    .greenText {
        color: green
    }
</style>

