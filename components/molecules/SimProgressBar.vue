<template>
    <div class="container">
        <div :class="divClass" :style="divStyle">
            <div
                    @focus="mouseFocus"
                    :class="classes.section1"
                    role="progressbar"
                    aria-valuenow="0"
                    aria-valuemin="0"
                    aria-valuemax="100"
                    :style="progressStyle.section1"
                    @mouseover="event => { $emit('mouseover', {section: 1, value: progress.section1, percentage: progressPercent.section1}) }"
                    @mouseleave="event => { $emit('mouseleave', {section: 1, value: progress.section1, percentage: progressPercent.section1}) }"
            >
                {{ progress.section1 }}
            </div>
            <div
                    v-if="progressSections > 1"
                    :class="classes.section2"
                    role="progressbar"
                    aria-valuenow="0"
                    :style="progressStyle.section2"
                    @mouseover="event => { $emit('mouseover', {section: 2, value: progress.section2, percentage: progressPercent.section2}) }"
                    @mouseleave="event => { $emit('mouseleave', {section: 2, value: progress.section2, percentage: progressPercent.section2}) }"
            >
                {{ progress.section2 }}
            </div>
            <div
                    v-if="progressSections > 2"
                    :class="classes.section3"
                    role="progressbar"
                    aria-valuenow="0"
                    :style="progressStyle.section3"
                    @mouseover="event => { $emit('mouseover', {section: 3, value: progress.section3, percentage: progressPercent.section3}) }"
                    @mouseleave="event => { $emit('mouseleave', {section: 3, value: progress.section3, percentage: progressPercent.section3}) }"
            >
                {{ progress.section3 }}
            </div>
            <div
                    v-if="progressSections > 3"
                    :class="classes.section4"
                    role="progressbar"
                    aria-valuenow="0"
                    :style="progressStyle.section4"
                    @mouseover="event => { $emit('mouseover', {section: 4, value: progress.section4, percentage: progressPercent.section4}) }"
                    @mouseleave="event => { $emit('mouseleave', {section: 4, value: progress.section4, percentage: progressPercent.section4}) }"
            >
                {{ progress.section4 }}
            </div>
            <div
                    v-if="progressSections > 4"
                    :class="classes.section5"
                    role="progressbar"
                    aria-valuenow="0"
                    :style="progressStyle.section5"
                    @mouseover="event => { $emit('mouseover', {section: 5, value: progress.section5, percentage: progressPercent.section5}) }"
                    @mouseleave="event => { $emit('mouseleave', {section: 5, value: progress.section5, percentage: progressPercent.section5}) }"
            >
                {{ progress.section5 }}
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Vue, Prop } from 'nuxt-property-decorator'

    export interface progressBar {
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

    @Component
    export default class SimProgressBar extends Vue {

        @Prop({ default: 1, type: Number })
        progressSections!: number

        /// This is the object that stores the display details for each section of the progress bar
        @Prop({ default: {}, type: Object })
        progressObj!: progressBar

        @Prop({ default: '100px', type: String })
        width!: string

        @Prop({ default: '20px', type: String })
        height!: string

        @Prop({ default: 'lightgrey', type: String })
        barColor!: string

        @Prop({ default: 0, type: Number })
        borderRadius!: number

        @Prop({ default: '', type: String })
        borderStyle!: string

        @Prop({ default: '', type: String })
        theStyle!: string

        mounted () {

        }

        get divClass() {
            let classes = 'progress '
            if (this.borderStyle === 'solid') {
                classes += 'solid'
            }
            if (this.borderStyle === 'insert') {
                classes += 'inset'
            }
            return classes
        }

        get divStyle() {
            let style = this.theStyle + ';width:'+ this.width +'; height:' + this.height + '; background-color:' + this.barColor + '; marginTop: 0px; marginLeft: 0px; border-radius: ' + this.borderRadius+'px'
            if (this.borderStyle === 'solid') {
                style += ';border: 1px black solid'
            }
            if (this.borderStyle === 'inset') {
                style += ';border: 2px inset'
            }
            if (this.borderStyle === 'outset') {
                style += ';border: 2px outset'
            }
            if (this.borderStyle === 'shadow') {
                style += ';box-shadow: 2px 2px grey'
            }
            return style
        }

        get progressTotal() {
            let amount = this.progressObj.value.section1
            if (this.progressSections > 1) {
                amount += this.progressObj.value.section2
            }
            if (this.progressSections > 2) {
                amount += this.progressObj.value.section3
            }
            if (this.progressSections > 3) {
                amount += this.progressObj.value.section4
            }
            if (this.progressSections > 4) {
                amount += this.progressObj.value.section5
            }
            return amount
        }

        get progressPercent() {
            const totalProgress = this.progressTotal
            const percentObj = {
                section1: 0,
                section2: 0,
                section3: 0,
                section4: 0,
                section5: 0,
            }
            if (totalProgress > 0) {
                if (this.progressObj.value.section1 > 0) {
                    percentObj.section1 = (this.progressObj.value.section1 / totalProgress) * 100
                }
                if (this.progressObj.value.section2 > 0) {
                    percentObj.section2 = (this.progressObj.value.section2 / totalProgress) * 100
                }
                if (this.progressObj.value.section3 > 0) {
                    percentObj.section3 = (this.progressObj.value.section3 / totalProgress) * 100
                }
                if (this.progressObj.value.section4 > 0) {
                    percentObj.section4 = (this.progressObj.value.section4 / totalProgress) * 100
                }
                if (this.progressObj.value.section5 > 0) {
                    percentObj.section5 = (this.progressObj.value.section5 / totalProgress) * 100
                }
            }
            return percentObj
        }

        get progress() {
            const decimalPlaces = {
                section1: 0,
                section2: 0,
                section3: 0,
                section4: 0,
                section5: 0,
            }
            if (this.progressObj.decimalPlaces.section1 > 0) {decimalPlaces.section1 = this.progressObj.decimalPlaces.section1}
            if (this.progressObj.decimalPlaces.section2 > 0) {decimalPlaces.section2 = this.progressObj.decimalPlaces.section2}
            if (this.progressObj.decimalPlaces.section3 > 0) {decimalPlaces.section3 = this.progressObj.decimalPlaces.section3}
            if (this.progressObj.decimalPlaces.section4 > 0) {decimalPlaces.section4 = this.progressObj.decimalPlaces.section4}
            if (this.progressObj.decimalPlaces.section5 > 0) {decimalPlaces.section5 = this.progressObj.decimalPlaces.section5}

            const progressObj = {
                section1: '',
                section2: '',
                section3: '',
                section4: '',
                section5: '',
            }

            if (this.progressTotal > 0) {  /// If all values are zero, we don't want to show any values
                if (this.progressObj.showData.section1 === 'percentage') {
                    progressObj.section1 = this.progressPercent.section1.toFixed(decimalPlaces.section1) + '%'
                } else if (this.progressObj.showData.section1 === 'value') {
                    progressObj.section1 = this.progressObj.value.section1.toFixed(decimalPlaces.section1)
                }
                if (this.progressObj.showData.section2 === 'percentage') {
                    progressObj.section2 = this.progressPercent.section2.toFixed(decimalPlaces.section2) + '%'
                } else if (this.progressObj.showData.section2 === 'value') {
                    progressObj.section2 = this.progressObj.value.section2.toFixed(decimalPlaces.section2)
                }
                if (this.progressObj.showData.section3 === 'percentage') {
                    progressObj.section3 = this.progressPercent.section3.toFixed(decimalPlaces.section3) + '%'
                } else if (this.progressObj.showData.section3 === 'value') {
                    progressObj.section3 = this.progressObj.value.section3.toFixed(decimalPlaces.section3)
                }
                if (this.progressObj.showData.section4 === 'percentage') {
                    progressObj.section4 = this.progressPercent.section4.toFixed(decimalPlaces.section4) + '%'
                } else if (this.progressObj.showData.section4 === 'value') {
                    progressObj.section4 = this.progressObj.value.section4.toFixed(decimalPlaces.section4)
                }
                if (this.progressObj.showData.section5 === 'percentage') {
                    progressObj.section5 = this.progressPercent.section5.toFixed(decimalPlaces.section5) + '%'
                } else if (this.progressObj.showData.section5 === 'value') {
                    progressObj.section5 = this.progressObj.value.section5.toFixed(decimalPlaces.section5)
                }
            }
            return progressObj
        }

        get progressStyle() {
            const styleObj = {
                section1: {'width': `${this.progressPercent.section1}%`, 'background-color': this.progressObj.backGroundColor.section1},
                section2: {'width': `${this.progressPercent.section2}%`, 'background-color': this.progressObj.backGroundColor.section2},
                section3: {'width': `${this.progressPercent.section3}%`, 'background-color': this.progressObj.backGroundColor.section3},
                section4: {'width': `${this.progressPercent.section4}%`, 'background-color': this.progressObj.backGroundColor.section4},
                section5: {'width': `${this.progressPercent.section5}%`, 'background-color': this.progressObj.backGroundColor.section5}
            }
            return styleObj
        }

        get classes () {
            const classesObj = {
                section1: 'progress-bar' as string,
                section2: 'progress-bar' as string,
                section3: 'progress-bar' as string,
                section4: 'progress-bar' as string,
                section5: 'progress-bar' as string,
            }
            if (this.progressObj.striped.section1 === 'forward') {
                classesObj.section1 += ' forward-stripe'
            }
            else if (this.progressObj.striped.section1 === 'backward') {
                classesObj.section1 += ' backward-stripe'
            }
            if (this.progressObj.striped.section2 === 'forward') {
                classesObj.section2 += ' forward-stripe'
            }
            else if (this.progressObj.striped.section2 === 'backward') {
                classesObj.section2 += ' backward-stripe'
            }
            if (this.progressObj.striped.section3 === 'forward') {
                classesObj.section3 += ' forward-stripe'
            }
            else if (this.progressObj.striped.section3 === 'backward') {
                classesObj.section3 += ' backward-stripe'
            }
            if (this.progressObj.striped.section4 === 'forward') {
                classesObj.section4 += ' forward-stripe'
            }
            else if (this.progressObj.striped.section4 === 'backward') {
                classesObj.section4 += ' backward-stripe'
            }
            if (this.progressObj.striped.section5 === 'forward') {
                classesObj.section5 += ' forward-stripe'
            }
            else if (this.progressObj.striped.section5 === 'backward') {
                classesObj.section5 += ' backward-stripe'
            }

            return classesObj
        }

        mouseOver () {
            alert('mouseOver')
        }
        mouseFocus() {
            alert('Mouse Focus')
        }

    }

</script>

<style scoped>
    .progress-bar {
        display: flex;
        flex-direction: column;
        justify-content: center;
        color: #fff;
        font-weight: bolder;
        text-align: center;
        white-space: nowrap;
        background-color: #002e5d;
        transition: width 0.6s ease; }
    @media {
        .progress-bar {
            transition: none; } }
    .progress {
        display: flex;
        height: 1rem;
        overflow: hidden;
        font-size: 0.75rem;
        background-color: #e9ecef;
    }

    .bordered {
        border: 1px black solid;
    }
    .inset {
        border: 2px inset;
    }

    .progress-bar-striped {
        background-image: linear-gradient(-45deg, rgba(255,255,255,.9) 25%, transparent 25%, transparent 50%, rgba(255,255,255,.9) 50%, rgba(255,255,255,.9) 75%, transparent 0%, transparent);
        background-size: .35rem .35rem;
        color: black;
        background-repeat: repeat;
    }

    .forward-stripe {
        background-image: linear-gradient(-45deg, rgba(255,255,255,.9) 25%, transparent 25%, transparent 50%, rgba(255,255,255,.9) 50%, rgba(255,255,255,.9) 75%, transparent 0%, transparent);
        background-size: .35rem .35rem;
        color: black;
        background-repeat: repeat;
    }
    .backward-stripe {
        background-image: linear-gradient(45deg, rgba(255,255,255,.9) 25%, transparent 25%, transparent 50%, rgba(255,255,255,.9) 50%, rgba(255,255,255,.9) 75%, transparent 0%, transparent);
        background-size: .35rem .35rem;
        color: black;
        background-repeat: repeat;
    }

    @keyframes progress-bar-stripes {
        from {
            background-position: 1rem 0; }
        to {
            background-position: 0 0; } }
    .progress-bar-animated {
        animation: progress-bar-stripes 1s linear infinite; }
    @media (prefers-reduced-motion: reduce) {
        .progress-bar-animated {
            animation: none; } }


</style>

