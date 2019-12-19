<template>
    <div style="width: 100%">
        <h1 class="text-primary" style="text-align: center">Sim Select Example</h1>
        <div style="display: flex; justify-content: space-around">
            <sim-select
                    v-model="carBrand"
                    :value="carBrand"
                    :label="theLabel"
                    placeholder="Place Holder"
                    :shadowBorder="shadowBorder"
                    :items="carList"
                    :textCentered="textCentered"
                    :width="theWidth"
                    :size="theSize"
                    :disabled="disabled"
                    :required=true
                    :inputClass="inputClass"
                    :labelClass="labelClass"
                    v-on:input="onInputHandler"
                    v-on:blur="onBlurHandler"
                    v-on:focus="onFocusHandler"

            ></sim-select>
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
                        v-model="theSize"
                        :value="theSize"
                        label="Size"
                        :items="sizeList"
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
            <div class="col-2" style="margin-top: 20px">
                <input type="checkbox"
                       id="shadowBorder"
                       :checked="shadowBorder" @click='shadowBorder = !shadowBorder' style="padding-left: 10px; cursor: pointer">
                <label for="shadowBorder" style="margin-left: 3px">Shadow Border</label>
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
                       id="textCentered"
                       :checked="textCentered" @click='textCentered = !textCentered' style="padding-left: 10px; cursor: pointer">
                <label for="textCentered" style="margin-left: 3px">Centered Text</label>
            </div>
        </div>
        <hr>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'nuxt-property-decorator'
    import SimSelect from '~/components/molecules/SimSelect.vue'

    @Component({
        components: {
            SimSelect
        }
    })
    export default class App extends Vue {
        carBrand: string = 'Cadillac'
        carList: string [] = ['Acura', 'Audi', 'Buick','BMW', 'Cadillac', 'Chevrolet', 'Dodge', 'Ford', 'Honda','Hyundai','Toyota']

        theWidth: string = '150px'
        widthList: string [] = ['50px','100px','150px','200px','250px']
        theLabel: string = 'Car Brands'
        labelList: string [] = ['Car Brands', 'Favorite Brands', 'Best Brands', 'Worst Brands']
        theSize: string = 'md'
        sizeList: string [] = ['sm', 'md', 'lg']
        shadowBorder: boolean = false
        textCentered: boolean = true
        disabled: boolean = false
        lastSelectedMsg: string = ''
        eventMessage: string = ''
        inputClass: string = ''
        labelClass: string = ''
        classList: string [] = ['', 'redText', 'greenText']

        onInputHandler(event) {
            this.lastSelectedMsg = event + ' was selected at ' + new Date()
        }

        onBlurHandler() {
            this.eventMessage = 'The SimSelect component NOT focused.'
        }

        onFocusHandler() {
            this.eventMessage = 'The SimSelect component is now focused.'
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
