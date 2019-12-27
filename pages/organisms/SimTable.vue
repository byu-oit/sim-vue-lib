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
                        <button size="mini" @click="edit(scope.index, scope.row)">Edit</button>
                        <button size="mini" @click="del(scope.index, scope.row)">Delete</button>
                    </template>
                </sim-table>


                <div class="row">
                    <div class="col-3"></div>
                    <div class="col-4">
                        <sim-select
                                v-model="fontSize"
                                :value="fontSize"
                                label="Font Sizes in px"
                                v-on:input="changeFontSize($event)"
                                :items="fontSizes"
                                :textCentered=true
                                width="100px"
                                size="sm"
                        ></sim-select>
                    </div>
                    <div class="col-2" style="margin-top: 16px">
                        <a class='btn-link' href="https://www.npmjs.com/package/vue-virtual-table">  Documentation  </a>
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
                eClass: {
                    redTag: '${age}>15 && ${age}<20',
                    orangeTag: '${age}>19 && ${age}<25',
                    rustTag: '${age}>24 && ${age}<30',
                    greenTag: '${age}>29 && ${age}<35',
                    blueTag: '${age}>34'
                }

            },
            {prop: "ageDays", name: "Age in Days", numberFilter: false, sortable: false},
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

        tableData: object [] = [
            {user: "a1", age: 20, ageDays: 0, city: "a"},
            {user: "a2", age: 21, ageDays: 0, city: "b"},
            {user: "a3", age: 23, ageDays: 0, city: "a"}
        ]

        lineNum: number = 1000


        tableAttribute: object = {
            height: 850 as number,
            itemHeight: 55 as number,
            minWidth: 1000 as number,
            selectable: true as boolean,
            enableExport: true as boolean,
            bordered: false as boolean,
            hoverHighlight: true as boolean,
            language: "en" as string,
            sortParam: {col: "age" as string, direction: "desc" as string}
        }

        mounted() {
            this.genData()
        }

        updateTableConfig(prop, conf) {
            const propIndex = this.tableConfig.findIndex(v => v.prop == prop);
            this.tableConfig.splice(propIndex, 1, conf);
        }

        handleSelectionChange(rows) {
            if (rows.length > 0) {
                !this.isSelected ? alert('The row for user: ' + rows[0].user + ' was selected.') : alert('The row for user: ' + rows[0].user + ' was deselected.');
            }
        }

        changeFontSize (fontSize) {
            this.fontSize = fontSize
        }

        edit(index, row) {
            alert('Edit was selected for ' + row.city)
        }

        del(index, row) {
            console.log('this.tableData = ', this.tableData)
            var user = row.user
            var len = this.tableData.length
            for (let i = 0; i < len; i++) {
                if (user === this.tableData[i].user) {
                    var temp = this.tableData.splice(i,1);
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
            const allData = [];
            const dataObj = {
                user: '' as string,
                age: 0 as number,
                city: '' as string,
                ageDays: 0 as number,
            }

            for (let i = 0; i < len; i++) {
                dataObj.user = "u" + _uuid()
                dataObj.age = Math.floor((78 - 16) * Math.random()) + 16;
                const cityIndex = i % 14;
                dataObj.city = cts[cityIndex];
                dataObj.ageDays = Math.round(dataObj.age * 365.23 / .12) / 100;
                console.log('dataObj = ', dataObj)
               allData.push(dataObj);
            }
            this.tableData = allData
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


