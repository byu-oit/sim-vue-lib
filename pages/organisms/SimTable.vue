<template>

    <div id="app">
        <div style="height: 100px; padding-top: 50px">
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
                        :multiSelect="multiSelect"
                        :defaultSelect="defaultSelect"

                >
                    <template slot-scope="scope" slot="actionCommon">
                        <button class="btn-primary btn-sm" size="mini" style="margin-right: 10px" @click="edit(scope.index, scope.row)">Edit</button>
                        <button class="btn-primary btn-sm" size="mini" @click="del(scope.index, scope.row)">Delete</button>
                    </template>
                </sim-table>
                <div style="height: 50px; margin-top: 10px; color: green; font-size: 18px">{{ selectedMessage}}</div>
                <div class="row">
                    <div class="col-1"></div>
                    <div class="col-2">
                        <sim-select
                                v-model="fontSize"
                                :value="fontSize"
                                label="Font Size"
                                v-on:input="changeFontSize($event)"
                                :items="fontSizes"
                                :textCentered=true
                                width="100px"
                        ></sim-select>
                    </div>
                    <div class="col-2">
                        <sim-select
                                v-model="tableHeight"
                                :value="tableHeight"
                                label="Table Height"
                                v-on:input="changeTableHeight($event)"
                                :items="tableHeightList"
                                :textCentered=true
                                width="100px"
                        ></sim-select>
                    </div>
                    <div class="col-2">
                        <sim-select
                                v-model="rowHeight"
                                :value="rowHeight"
                                label="Row Height"
                                v-on:input="changeRowHeight($event)"
                                :items="heightList"
                                :textCentered=true
                                width="100px"
                        ></sim-select>
                    </div>
                    <div class="col-3">
                        <sim-select
                                v-model="defaultRows"
                                :value="defaultRows"
                                label="Rows Selected by Default"
                                :items="defaultList"
                                :textCentered=true
                                :disabled=true
                                width="150px"
                        ></sim-select>
                    </div>

                </div>
                <div class="row">
                    <div class="col-2"></div>
                    <div class="col-2" style="margin-top: 20px">
                        <input type="checkbox"
                               id="selectable"
                               :checked="selectable" @click='selectableChanged' style="padding-left: 10px; cursor: pointer">
                        <label for="selectable" style="margin-left: 3px">Selectable</label>
                    </div>
                    <div class="col-2" style="margin-top: 20px">
                        <input type="checkbox"
                               id="multiSelect"
                               :checked="multiSelect" @click='multiSelectChanged' style="padding-left: 10px; cursor: pointer">
                        <label for="multiSelect" style="margin-left: 3px">Multi Select</label>
                    </div>
                    <div class="col-3" style="margin-top: 20px">
                        <input type="checkbox"
                               id="hoverHighlight"
                               :checked="highlightOnHover" @click='hoverHighlightChanged' style="padding-left: 10px; cursor: pointer">
                        <label for="hoverHighlight" style="margin-left: 3px">Hightlight on Hover</label>
                    </div>
                </div>
                <div class="row">
                    <div class="col-1"></div>
                    <div class="col-2" style="margin-top: 20px">
                        <input type="checkbox"
                               id="exportEnabled"
                               :checked="exportEnabled" @click='enableExportChanged' style="padding-left: 10px; cursor: pointer">
                        <label for="exportEnabled" style="margin-left: 3px">Enable Export</label>
                    </div>
                    <div class="col-4" style="margin-top: 20px">
                        <input type="checkbox"
                               id="textCentered"
                               :checked="lineNumShown" @click='changeShowLineNumber' style="padding-left: 10px; cursor: pointer">
                        <label for="textCentered" style="margin-left: 3px">{{ lineNumLabel }}</label>
                    </div>
                    <div class="col-2" style="margin-top: 16px">
                        <a class='btn-link' style="color: blue" href="https://www.npmjs.com/package/vue-virtual-table">  Documentation  </a>
                    </div>
                </div>
                <hr>
            </div>
        </div>
    </div>

</template>

<script>
    import SimTable from "~/components/organisms/sim-table/index.vue";
    import { _uuid } from "~/components/organisms/sim-table/utils/index.js";
    import SimSelect from "~/components/molecules/SimSelect";
    export default {
        name: "Table",
        components: {
            SimTable,
            SimSelect,
        },
        data() {
            return {
                fontSize: '16px',
                fontSizes: ['','10px','12px', '14px','16px','18px'],
                rowHeight: '55',
                heightList: ['30','40','55', '65','80','100'],
                defaultRows: 'None',
                defaultList: ['None','Row 6','Rows 2, 4, 6, and 8','Rows 3,7,9 and 11',],
                tableHeight: '650',
                tableHeightList: ['450','550','650','800','1000','1200'],
                lineNumLabel: 'Hide Line Number Column',
                lineNumShown: true,
                exportEnabled: false,
                highlightOnHover: true,
                selectable: true,
                multiSelect: false,
                dataChanged: 0,
                selectedMessage: '',
                defaultSelect: [],

                tableConfig: [
                    { prop: "_index", name: "#", width: 80 },
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
                        eClass: {
                            redTag: '${age}>15 && ${age}<20',
                            orangeTag: '${age}>19 && ${age}<25',
                            rustTag: '${age}>24 && ${age}<30',
                            greenTag: '${age}>29 && ${age}<35',
                            blueTag: '${age}>34'
                        }

                    },
                    { prop: "ageDays", name: "Age in Days", numberFilter: false, sortable: false},
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
                    { prop: "_action", name: "Action", actionName: "actionCommon" },
                ],
                tableData: [
                    { user: "a1", age: 20, ageDays: 0, city: "a" },
                    { user: "a2", age: 21, ageDays: 0, city: "b" },
                    { user: "a3", age: 23, ageDays: 0, city: "a" }
                ],
                tableAttribute: {
                    height: 660,
                    itemHeight: 55,
                    minWidth: 1000,
                    selectable: true,
                    enableExport: false,
                    bordered: true,
                    hoverHighlight: true,
                    language: "en",
                },
                lineNum: 100

            };
        },

        mounted() {
            const randomnumber = Math.floor(Math.random() * (5 - 1 + 1)) + 1;
            switch (randomnumber) {
                case 1:
                    this.defaultSelect = []
                    this.defaultRows = 'None'
                    break
                case 2:
                    this.defaultSelect = [5]
                    this.defaultRows = 'Row 6'
                    break
                case 3:
                    this.defaultSelect = [1,3,5,7]
                    this.defaultRows = 'Rows 2, 4, 6, and 8'
                    break
                case 4:
                    this.defaultSelect = [2,6,8,10]
                    this.defaultRows = 'Rows 3,7,9 and 11'
                    break
                default:
                    this.defaultSelect = []
                    this.defaultRows = 'None'
            }

            this.genData();
        },

        methods: {
            updateTableConfig(prop, conf) {
                let propIndex = this.tableConfig.findIndex(v => v.prop == prop);
                this.tableConfig.splice(propIndex, 1, conf);
            },

            handleSelectionChange(rows) {
                const currentRow = rows.length - 1
                if (rows.length > 0) {
                    this.selectedMessage = 'The row for user: ' +rows[currentRow].user + ' in ' + rows[currentRow].city + ' was selected.'
                }
            },

            changeFontSize (fontSize) {
                this.fontSize = fontSize
            },

            changeRowHeight (rowHeight) {
                this.tableAttribute.itemHeight = Number(rowHeight)
            },

            changeTableHeight (tableHeight) {
                this.tableAttribute.height = Number(tableHeight)
            },

            edit(index, row) {
                alert('Edit was selected for ' + row.city)
            },

            del(index, row) {
                var user = row.user
                var len = this.tableData.length
                for (let i = 0; i < len; i++) {
                    if (user === this.tableData[i].user) {
                        var temp = this.tableData.splice(i,1);
                        this.dataChanged++
                        break
                    }
                }
            },
            genData() {
                this.randomData(this.lineNum);
            },

            randomData(len) {
                let cts = [
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
                let all_data = [];
                for (let i = 0; i < len; i++) {
                    let user = "u" + _uuid(6, 10),
                        age = Math.floor((78 - 16) * Math.random()) + 16;
                    let cityIndex = i % 14;
                    let city = cts[cityIndex];
                    let ageDays = Math.round(age * 365.23 / .12) / 100;
                    all_data.push({ user, age, ageDays, city });
                }
                this.tableData = all_data;
                this.dataChanged++
            },

            selectableChanged () {
                this.selectable = !this.selectable
                this.tableAttribute.selectable = this.selectable
            },

            multiSelectChanged () {
                this.multiselect = !this.multiselect
            },

            enableExportChanged () {
                this.exportEnabled = !this.exportEnabled
                this.tableAttribute.enableExport = this.exportEnabled
            },

            hoverHighlightChanged () {
                this.highlightOnHover = !this.highlightOnHover
                this.tableAttribute.hoverHighlight = this.highlightOnHover
            },

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

