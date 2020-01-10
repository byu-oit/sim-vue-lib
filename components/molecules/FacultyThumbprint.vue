<template>
    <div :class="borderClass">
        <div class="tabular tabular-wrap" style="display: flex; justify-content: end; margin-top: 20px">

                <div class="SIM-no-wrap">{{identity.sort_name}}</div>
                <div style="margin-left: 5px">- [{{identity.net_id}}]</div>

                <!--<div style="margin-left: 5px">- ({{_byuId_format(identity.byu_id)}})</div>-->
                <div style="margin-left: 5px">{{_campusAddressBlockPhone(identity)}}</div>

                <!--<div style="margin-left: 5px">- {{identity.date_of_birth}}</div>-->
                <div style="margin-left: 5px">- {{_fullTextGender(identity.gender)}}</div>
                <div v-if="_isAnEmployee(identity)" style="margin-left: 5px">
                    - <a class="SIM-link" href="https://y.byu.edu/ry/ae/prod/person/cgi/employeeStatus.cgi" title="What do these codes mean?" target="blank">{{identity.empStatus}}</a>
                    <span v-if="identity.department" style="margin-left: 5px">- {{identity.department}}</span>
                </div>
                <div>
                    <div class="tabular" v-if="_hasIdentityFlags(identity)">
                        <div class="SIM-notice" style="margin-left: 5px">{{_identityFlags(identity)}}</div>
                    </div>
                </div>
            </div>
        </div>

</template>

<script>
    // import ByuId from '../../mixins/ByuId'
    import Person from '../../mixins/Person'
    import Address from '../../mixins/Address'

    export default {
        name: "faculty-thumbprint",
        props: {
            identity: {
                required: true
            },
            bordered: {
                type: Boolean,
                default: true
            }
        },
        // mixins: [Person, ByuId],
        mixins: [Person, Address],
        computed: {
            borderClass() {
                return (this.bordered) ? "hasBorder" : "inLine"
            }
        }
    }
</script>

<style scoped>
    .hasBorder {
        padding: 5px;
        border: #002e5d solid 1px;
        background-color: #f0f8ff;
    }
    .inLine {
        display: flex;
        align-items: center;
        /*border-bottom: #002e5d solid 1px;*/
    }
</style>
