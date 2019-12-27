<template>
    <div id="app">
        <div style="height: 150px; padding-top: 50px">
            <h1>Sim Table Example</h1>
        </div>

        <div class="container">
            <div>

                <sim-table
                        :config="tableConfig"
                        :data="tableData"
                        :height="tableAttribute.height"
                        :itemHeight="tableAttribute.itemHeight"
                        :minWidth="tableAttribute.minWidth"
                        :selectable="tableAttribute.selectable"
                        :enableExport="tableAttribute.enableExport"
                        :bordered="tableAttribute.bordered"
                        :hoverHighlight="tableAttribute.hoverHighlight"
                        :language="tableAttribute.language"
                        :dataChanged="dataChanged"
                        v-on:changeSelection="handleSelectionChange"
                        :sortParam="tableAttribute.sortParam"
                        :fontSize="fontSize"
                >
                    <template slot-scope="scope" slot="actionCommon">
                        <button class="btn-sm btn-primary" style="margin-right: 10px" size="mini" @click="edit(scope.index, scope.row)">Edit</button>
                        <button class="btn-sm btn-primary" size="mini" @click="del(scope.index, scope.row)">Delete</button>
                    </template>
                </sim-table>


                <div class="row">
                    <div class="col-3"></div>
                    <div class="col-2">
                        <sim-select
                                v-model="fontSize"
                                :value="fontSize"
                                label="Font Sizes in px"
                                v-on:input="changeFontSize($event)"
                                :items="fontSizes"
                                :textCentered=true
                                width="100px"
                                size="md"
                        ></sim-select>
                    </div>
                    <div class="col-3" style="margin-top: 20px">
                        <input type="checkbox"
                               id="textCentered"
                               :checked="lineNumShown" @click='changeShowLineNumber' style="padding-left: 10px; cursor: pointer">
                        <label for="textCentered" style="margin-left: 3px">{{ lineNumLabel }}</label>
                    </div>
                    <div class="col-2" style="margin-top: 18px">
                        <a class='btn-link' style="color: blue" href="https://www.npmjs.com/package/vue-virtual-table">  Documentation  </a>
                    </div>
                </div>
                <hr>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from "nuxt-property-decorator";
    import SimTable from "~/components/organisms/SimTable/SimTable.vue";
    import SimSelect from '~/components/molecules/SimSelect.vue';
    import { _uuid } from "~/components/organisms/SimTable/utils/index.js";

    export interface dataInterfaceObj {
        user: string;
        age: number;
        city: string;
        ageDays: number;
    }

    @Component({
        components: {
            SimTable,
            SimSelect
        }
    })
    export default class App extends Vue {
        fontSize: string = '16px'
        fontSizes: string [] = ['', '10px', '12px', '14px', '16px', '18px']
        dataChanged: number = 0
        focused: boolean = false
        newValue: string = ''
        lineNumShown: boolean = true
        lineNumLabel: string = 'Hide Line Number Column'

        tableConfig: object [] = [
            {prop: "_index", name: "#", width: 80},
            {
                prop: "user",
                name: "User",
                searchable: true,
                sortable: true,
                summary: "COUNT"
            },
            {
                prop: "age",
                name: "Age",
                numberFilter: true,
                /// the eClass object will allow you to set differnt colors for age ranges.
                eClass: {
                    redTag: '${age}>15 && ${age}<25',
                    orangeTag: '${age}>24 && ${age}<35',
                    rustTag: '${age}>34 && ${age}<50',
                    greenTag: '${age}>49 && ${age}<66',
                    blueTag: '${age}>66'
                }
            },
            {
                prop: "ageDays",
                name: "Age in Days",
                numberFilter: false,
                sortable: true},
            {
                prop: "city",
                name: "City",
                filterable: true,
                filterTag: {
                    'Memphis': "navyTag",
                    'London': "navyTag",
                    'Pittsburg': "grayTag",
                    'Billings': "greenTag",
                    'San Diego': "aquaTag",
                    'Bern': "purpleTag",
                    'Copenhagen': "aquaTag",
                    'Provo': "blueTag",
                    'Seattle': "orangeTag",
                    'Salt Lake City': "redTag",
                    'Los Angeles': "blueTag",
                    'Miami': "orangeTag",
                    'New York': "greenTag",
                    'Las Vegas': "rustTag"
                },
                // The Valid tag colors are: blueTag, navyTag, redTag, rustTag, greenTag, orangeTag, purpleTag, grayTag, aquaTag
                // If a tag color is not set for a value the text will be displayed in black.

            },
            {prop: "_action", name: "Action", actionName: "actionCommon"},
        ]

        tableData: dataInterfaceObj [] = [
            {user: "a1", age: 20, ageDays: 0, city: "a"},
            {user: "a2", age: 21, ageDays: 0, city: "b"},
            {user: "a3", age: 23, ageDays: 0, city: "a"}
        ]

        /// This is the number of rows that will be randomly generated.
        lineNum: number = 1000

        tableAttribute: object = {
            height: 650 as number,
            itemHeight: 55 as number,
            minWidth: 1000 as number,
            selectable: true as boolean,
            enableExport: true as boolean,
            bordered: false as boolean,
            hoverHighlight: true as boolean,
            language: "en" as string,
            sortParam: {col: "user" as string, direction: "asc" as string}
        }

        mounted() {
            this.genData()
        }

        changeShowLineNumber() {
            if (this.lineNumShown) {
                this.lineNumLabel = 'Show Line Number Column'
                this.tableConfig.splice(0,1)
            }
            else {
                this.lineNumLabel = 'Hide Line Number Column'
                this.tableConfig.unshift({prop: "_index", name: "#", width: 80})
            }
            this.lineNumShown = !this.lineNumShown
        }

        handleSelectionChange(rows) {
            if (rows.length > 0) {
                alert('The row for user: ' + rows[0].user + ' was selected.')
            }
        }

        changeFontSize (fontSize) {
            this.fontSize = fontSize
        }

        edit(index, row) {
            alert('Edit was selected for ' + row.city)
        }

        del(index, row) {
            const user = row.user
            for (let i = 0; i < this.tableData.length; i++) {
                if (user === this.tableData[i].user) {
                    const temp = this.tableData.splice(i,1);
                    this.dataChanged++
                    break
                }
            }
        }

        genData() {
            this.randomData(this.lineNum);
        }

        randomData(len) {
            const cts = [
                "Provo",
                "San Diego",
                "Miami",
                "Las Vegas",
                "Salt Lake City",
                "Los Angeles",
                "London",
                "Bern",
                "Copenhagen",
                "New York",
                "Pittsburg",
                "Memphis",
                "Billings",
                "Seattle",
                "Toronto"
            ];

            this.tableData = []
            let user = '' as string
            let age = 0 as number
            let ageDays = 0 as number
            let city = '' as string

            for (let i = 0; i < len; i++) {
                user = "u" + _uuid()
                age = Math.floor((78 - 16) * Math.random()) + 16;
                const cityIndex = i % 14;
                city = cts[cityIndex];
                ageDays = Math.round(age * 365.23 / .12) / 100;
                ageDays = Math.round(age * 365.23 / .12) / 100;

                this.tableData.push({user: user as string, age: age as number, ageDays: ageDays as number, city: city as string})
            }
            this.dataChanged++
        }

        onBlurHandler() {
            this.focused = false
        }

        onInputHandler(event) {
            this.newValue = event
        }

        onFocusHandler() {
            this.focused = true
        }
    }

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

</style>


