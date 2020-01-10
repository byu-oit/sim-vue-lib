<template>
    <div style="margin: 0" id="mymapContent">
        <div id="content-wrapper" class="wrapper">
            <div id="Content" class="wrapper" style="padding-bottom: 3px;">
                <div id="subheader" style="margin: 15px 0 10px 0; justify-content: space-between" class="tabular tabular-wrap">
                    <div id="breadcrumb" style="margin-top: 0">
                        <div id="breadcrumb-home"><a class="breadcrumb-down" href="https://my.byu.edu"><img alt="home" src="https://www.byu.edu/templates/rhapsody/img/home.png"></a></div>
                        <span class="bread-links">
                            &rsaquo;&nbsp;<a id="breadcrumb-submenu" :href="_getFullYBYUEDUURL('user_help/cgi/mainMenu.cgi', useStageModifier)">AIM</a> &rsaquo; <span class="SIM-no-wrap">MyMAP: Academic Planning</span>
                        </span>
                    </div>
                    <div>
                        <a onclick="findWebResource('001089', '');return false;" onmouseover="status='Find related pages.';return true;" onmouseout="status='';" title='Find related pages.'>Related Pages</a>
                        | <a onclick="doFeedBack();return false;" onmouseover="status='Your feedback is greatly appreciated.';return true;" onmouseout="status=''" title='Your feedback is greatly appreciated.'><b><u>Feedback</u></b></a>
                        | <a onclick="getHelp('MYMAP');return false;" onmouseover="status='Ask a question, get some tips and training.';return true;" onmouseout="status=''" title='Ask a question, get some tips and training'>Help</a>
                    </div>
                </div>
                <div v-if="isAdmin" class="tabular tabular-wrap" style="justify-content: space-between; align-items: center; padding: 0">
                    <div class="tabular tabular-wrap" style="margin: 5px 0; padding: 0; font-size: 15px">
                        <div>
                            <label>Last Name/Identifier: </label>
                            <input @keyup.enter="findStudent()" v-model="lastName" style="margin-right: 10px"/>
                            </div>
                        <div>
                            <label>First Name: </label>
                            <input @keyup.enter="findStudent()" v-model="firstName" style="margin-right: 10px"/>
                            <button
                                class="searchBtn"
                                :disabled="!canSearch"
                                @click="findStudent"
                            >GO</button>
                        </div>
                    </div>

                    <div v-show="identity.sort_name" style="margin: 5px 0; padding: 0; font-size: 15px">
                        <a :href="_mailToHREF(identity)">{{identity.sort_name}}</a> -
                        [{{identity.netId}}] -
                        ({{identity.byuId}}) -
                        {{identity.date_of_birth}} -
                        {{_fullTextGender(identity.gender)}} -
                        {{identity.stdStatus}} -
                        <span v-if="_isAnEmployee(identity)">
                            <a href="https://y.byu.edu/ry/ae/prod/person/cgi/employeeStatus.cgi" title="What do these codes mean?" target="blank">{{identity.empStatus}}</a>
                            <span v-if="identity.department" style="margin-left: 5px">- {{identity.department}}</span>
                        </span>
                        <span>
                            <div class="tabular" v-if="_hasIdentityFlags(identity)">
                                <div class="SIM-notice" style="margin-left: 5px">{{_identityFlags(identity)}}</div>
                            </div>
                        </span>
                    </div>
                </div>
            </div>
        </div>

        <message></message>

        <div id="pageNav" style="margin: 0 80px">
            <ul>
                <div> </div>
                <div>
                    <li id="NAVsummary"><a :href="_getFullYBYUEDUURL('mymap/cgi/summary.cgi', useStageModifier)">Student Summary</a></li>
                    <li id="NAVplan"><a :href="_getFullYBYUEDUURL('mymap/cgi/plan.cgi', useStageModifier)">Plan Courses</a></li>
                    <li id="NAVp2d" class="active">New Progress Report <sup>beta</sup></li>
                    <li id="NAVregister"><a :href="_getFullYBYUEDUURL('mymap/cgi/register.cgi', useStageModifier)">Register</a></li>
                </div>
                <div>
                    <li id="NAVhelp" style="width: 10px">
                        <a href="http://registrar.byu.edu/registrar/aim/MyMAPHelp.php?id=1" class="help-link" title="Click for Help" target="_blank">
                            <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                                 viewBox="0 0 29.536 29.536" style="enable-background:new 0 0 29.536 29.536;" xml:space="preserve">
<g>
<path d="M14.768,0C6.611,0,0,6.609,0,14.768c0,8.155,6.611,14.767,14.768,14.767s14.768-6.612,14.768-14.767
C29.535,6.609,22.924,0,14.768,0z M14.768,27.126c-6.828,0-12.361-5.532-12.361-12.359c0-6.828,5.533-12.362,12.361-12.362
c6.826,0,12.359,5.535,12.359,12.362C27.127,21.594,21.594,27.126,14.768,27.126z"/>
    <path d="M14.385,19.337c-1.338,0-2.289,0.951-2.289,2.34c0,1.336,0.926,2.339,2.289,2.339c1.414,0,2.314-1.003,2.314-2.339
C16.672,20.288,15.771,19.337,14.385,19.337z"/>
    <path d="M14.742,6.092c-1.824,0-3.34,0.513-4.293,1.053l0.875,2.804c0.668-0.462,1.697-0.772,2.545-0.772
c1.285,0.027,1.879,0.644,1.879,1.543c0,0.85-0.67,1.697-1.494,2.701c-1.156,1.364-1.594,2.701-1.516,4.012l0.025,0.669h3.42
v-0.463c-0.025-1.158,0.387-2.162,1.311-3.215c0.979-1.08,2.211-2.366,2.211-4.321C19.705,7.968,18.139,6.092,14.742,6.092z"/>
</g>
</svg>
                        </a>
                    </li>
                </div>
            </ul>
        </div>

        <form name="invisible_form" method="post">
            <input type="hidden" name="c" value="mymap"/>
            <input type="hidden" name="e"/>
            <input type="hidden" name="brownie"/>
        </form>
    </div>
</template>

<script>
    import Message from '~/components/molecules/message.vue'
    import URLFormat from '~/mixins/URLFormat'
    import ByuId from '~/mixins/ByuId'
    import Person from '~/mixins/Person'

    export default {
        name: 'mymap-header',
        mixins: [URLFormat, ByuId, Person],
        components: {
            Message
        },
        computed: {
            useStageModifier () {
                if (process.client) {
                    return this._getUseStageModifer("sim-dev")
                }
                return ''
            },
            canSearch() {
                return (this.lastName || this.firstName)
            },
            isAdmin() {
                // return this.$store.state.isAdmin
                return true
            },
            identity() {
                return this.$store.state.identity
            },
        },
        data () {
            return {
                lastName: '',
                firstName: ''
            }
        },
        methods: {
            findStudent () {
                var c = ''
                var e = ''
                var selectFunction = ''
                var action = 'https://y.byu.edu/ry/ae/prod/person/cgi/personLookup.cgi'
                var loading = 'loading.html'
                var theParms= "searchPattern="+this.lastName+"&firstName="+this.firstName
                    +"&selectFunction="+selectFunction+"&dialog_mode=Y"
                    +"&showEmpStd=A"
                    +"&NAVpersonRequireNetID=N"
                var newWin = window.open(loading, 'XREF', 'width=1024,height=768,location=no,toolbars=yes,scrollbars=yes,status=yes,resizable=yes' );
                newWin.focus();
                this.aeSubmitLink( action, c, e, theParms, 'XREF' )
                this.lastName = ''
                this.firstName = ''
            },

            aeSubmitLink( destination, current, trigger, parms, target ) {
                document.invisible_form.action = destination;
                if( current == null ) {
                    current = window.current;
                }
                if( trigger == null ) {
                    trigger = "";
                }
                if( target == null ) {
                    target = "";
                }
                document.invisible_form.target = target;
                document.invisible_form.c.value = current;
                document.invisible_form.e.value = trigger;
                if( parms == null ) {
                    parms = window.brownie;
                } else {
                    parms = parms + "&brownie=" + window.brownie;
                }
                document.invisible_form.brownie.value = parms;
                document.invisible_form.method = 'POST';
                document.invisible_form.submit();
            }
        }
    }
</script>

<style scoped>
    @import url(https://fonts.googleapis.com/css?family=Roboto:400,500,300);

    #pageNav {
        clear: both;
        padding-top: 0.75em;
        -webkit-box-shadow: 0 0 10px #999; /* Safari */
        -moz-box-shadow: 0 0 10px #999; /* Old Firefox */
        box-shadow: 0 0 10px #999;
        background: white;
    }

    #pageNav>ul {
        display: flex;
        display: -webkit-flex; /* Safari */
        display: -moz-flex; /* Old Firefox */
        -webkit-justify-content: space-between; /* Safari */
        -moz-justify-content: space-between; /* Old Firefox */
        justify-content: space-between;
    }

    #pageNav>ul>div {
        display: -webkit-inline-flex; /* Safari */
        display: inline-flex;
        -webkit-justify-content: space-between;
        -moz-justify-content: space-between;
        justify-content: space-between;
    }

    #pageNav li {
        list-style: none;
        border-bottom: 4px solid rgba(255,255,255,0);
        padding-bottom: 0.4em;
    }

    #pageNav li a {
        font-family: 'Roboto', sans-serif;
        font-size: 12pt;
    }

    #pageNav>ul>div:nth-child(2)>li {
        margin-left: 1.5em;
        margin-right: 1.5em;
    }

    li#NAVhelp {
        padding-right: 1em;
    }

    #pageNav li#NAVplan.active, #pageNav li#NAVplan:hover {
        border-bottom-color: #369;
    }

    #pageNav li#NAVregister.active, #pageNav li#NAVregister:hover {
        border-bottom-color: #072;
    }

    #pageNav li#NAVsummary.active, #pageNav li#NAVsummary:hover {
        border-bottom-color: #901;
    }

    #pageNav li#NAVp2d.active, #pageNav li#NAVp2d:hover {
        border-bottom-color: #369;
        font-size: 16px;
        font-weight: bold;
    }

    #pageNav li#NAVhonors:hover {
        border-bottom-color: #639;
    }

    #pageNav a, #pageNav a:active, #pageNav a:visited, #pageNav a:hover {
        color: #111;
        text-decoration: none;
    }

    #pageNav li.active a {
        font-weight: bold;
    }

    /*===ADMIN BAR===*/
    body #content-wrapper {
        width:100%;
        margin-bottom: 1.7em;
        padding:.5em 0 .5em 0;
        border: 0;
        box-shadow: 0 0 10px #999;
        -webkit-box-shadow: 0 0 10px #999;
        -moz-box-shadow: 0 0 10px #999;
    }
    #content-wrapper #Content {
        padding:0;
        width:90%;
    }
    #content-wrapper #Content table {
        margin-bottom: 10px;
    }
    #content-wrapper #Content table td {
        font-size:15px;
        padding:0;
        vertical-align: middle;
    }
    #content-wrapper #Content table input {
        padding: 4px 6px;
        width: 100px;
        font-size: 12px;
        color: #555;
        background-color: #fff;
        background-image: none;
        border: 1px solid #ccc;
        border-radius: 3px;
        transition: background-color ease-in-out .15s, box-shadow ease-in-out .15s;
    }
    #content-wrapper #Content table input:hover {
        background-color: #fcfcfc;
    }
    #content-wrapper #Content table input:focus {
        box-shadow: 0 0 8px #ccc;
        -webkit-box-shadow: 0 0 8px #ccc;
        -moz-box-shadow: 0 0 8px #ccc;
    }
    #content-wrapper #Content table a {
        background: #698eb4;
        padding: 3px 20px;
        border-radius: 5px;
        color:#fff;
    }
    #content-wrapper #Content table a:hover {
        text-decoration:none;
        background: #3c6285;
    }
    #content-wrapper #Content table a:active {
        -moz-box-shadow: inset 0 0 5px #000;
        -webkit-box-shadow: inset 0 0 5px #000;
        box-shadow: inset 0 0 5px #000;
    }
    /*#content-wrapper #Content #personSummaryLine div {*/
        /*border:0 !important;*/
        /*background: none !important;*/
        /*margin-top:-2em;*/
    /*}*/
    @media screen and (min-width:1450px) {
        #content-wrapper #Content table {
            float:left;
        }
        /*div#personSummaryLine {*/
            /*float:right;*/
            /*margin-top:.5em;*/
        /*}*/
        #content-wrapper #Content {
            padding-bottom:1em;
        }
    }
    #rfh {
        margin-top: 0;
    }
    #Content div:nth-child(2) {
        padding-bottom: 1.5em;
    }
    #Content #breadcrumb {
        padding-bottom: 0;
    }

    #mymap {
        margin-top: 1.5em;
        display: flex;
        display: -webkit-flex; /* Safari */
        display: -moz-flex; /* Old Firefox */
        flex-flow: row nowrap;
        -webkit-flex-flow: row nowrap; /* Safari */
        -moz-flex-flow: row nowrap; /* Old Firefox */
        justify-content: space-between;
        -webkit-justify-content: space-between; /* Safari */
        -moz-justify-content: space-between; /* Old Firefox */
        align-items: flex-start;
        -webkit-align-items: flex-start; /* Safari */
        -moz-align-items: flex-start; /* Old Firefox */
    }

    #mymapContent h1,
    #mymapContent h2,
    #mymapContent h3,
    #mymapContent h4,
    #mymapContent p,
    #mymapContent div
    {
        color: #444;
        font-family: 'Roboto', sans-serif;
        font-weight: normal;
        font-size: 14px;
    }

    #mymap a {
        cursor: pointer;
        text-decoration: none;
        color: #628CB6;
    }

    #mymap a:hover {
        text-decoration: underline;
    }

    #mymap a:visited {
        color: #628CB6;
    }

    #mymap ul {
        line-height: 2em;
    }

    body {
        font-size: 14px;
        background: #eee !important;
    }

    h1 {
        font-size: 32px;
        font-weight: 300;
    }

    body, button, input, select, textarea {
        font-family: Roboto, sans-serif !important;
    }

    a#clearCache {
        cursor: pointer;
        margin-right: 1em;
    }

    /* fade in after service load */
    .fade-in {
        opacity: 0.05;
    }

    .fade-in.show {
        opacity: 1;
        transition: 0.5s;
    }

    /* universal */
    .hilight-row {
        -webkit-transition: background-color ease-out .3s;
        -moz-transition: background-color ease-out .3s;
        -o-transition: background-color ease-out .3s;
        transition: background-color ease-out .3s;
    }

    .hilight-row:hover {
        background-color: #DDD;
    }

    /* button */
    a.buttonLink {
        text-decoration: none;
        border: thin solid #CCC;
        border-radius: 0.25em;
        display: inline-block;
        padding: 0.3em;
        color: #333;
        text-shadow: 0 -1px 0 #ddf;
        cursor: pointer;
        background-color: #EEE;
        background: -moz-linear-gradient(top, #fafafa 0%, #eeeeee 15%, #eeeeee 85%, #e0e0e0 100%); /* FF3.6+ */
        background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#fafafa), color-stop(15%,#eeeeee), color-stop(85%,#eeeeee), color-stop(100%,#e0e0e0)); /* Chrome,Safari4+ */
        background: -webkit-linear-gradient(top, #fafafa 0%,#eeeeee 15%,#eeeeee 85%,#e0e0e0 100%); /* Chrome10+,Safari5.1+ */
        background: -o-linear-gradient(top, #fafafa 0%,#eeeeee 15%,#eeeeee 85%,#e0e0e0 100%); /* Opera 11.10+ */
        background: -ms-linear-gradient(top, #fafafa 0%,#eeeeee 15%,#eeeeee 85%,#e0e0e0 100%); /* IE10+ */
        background: linear-gradient(to bottom, #fafafa 0%,#eeeeee 15%,#eeeeee 85%,#e0e0e0 100%); /* W3C */
    }

    .buttonAlt {
        font-weight: bold;
        color: white;
        font-size: 14px;
        background-color: #698EB4;
        /*width: 132px;*/
        height: 30px;
        width: 132px;
        border-radius: 5px;
        border: none;
        cursor: pointer;
        -webkit-transition: background-color ease-out .3s;
        -moz-transition: background-color ease-out .3s;
        -o-transition: background-color ease-out .3s;
        transition: background-color 0.3s ease-out 0s;
    }

    .buttonAlt:hover {
        background: #3C6285;
    }

    .buttonAlt:active {
        -moz-box-shadow: inset 0 0 5px #000;
        -webkit-box-shadow: inset 0 0 5px #000;
        box-shadow: inset 0 0 5px #000;
    }

    .buttonMain {
        font-weight: bold;
        color: white;
        font-size: 14px;
        background-color: #AAA;
        /*width: 132px;*/
        height: 30px;
        width: 132px;
        border-radius: 5px;
        border: none;
        cursor: pointer;
        -webkit-transition: background-color ease-out .3s;
        -moz-transition: background-color ease-out .3s;
        -o-transition: background-color ease-out .3s;
        transition: background-color 0.3s ease-out 0s;
    }

    .buttonMain:hover {
        background: #888;
    }

    .buttonMain:active {
        -moz-box-shadow: inset 0 0 5px #000;
        -webkit-box-shadow: inset 0 0 5px #000;
        box-shadow: inset 0 0 5px #000;
    }

    /* tables */
    #mymapContent th {
        font-weight: normal;
    }

    #mymap table {
        width: 100%;
    }

    #mymap thead {
        display: table-header-group;
    }

    table.infoTable {
        border: 0;
    }

    table.infoTable th {
        border: 0;
        text-align: left;
        font-weight: 300;
        padding: 7px 10px;
    }

    table.infoTable td {
        border: 0;
        padding: 7px 10px;
        font-size: 14px;
        line-height: 20px;
    }

    table.infoTable>tbody>tr {
        border: 0;
        border-bottom: thin solid #eee;
        -webkit-transition: background-color ease-out .3s;
        -moz-transition: background-color ease-out .3s;
        -o-transition: background-color ease-out .3s;
        transition: background-color ease-out .3s;
    }

    /*
    table.infoTable tbody tr:nth-child(odd) {
        background-color: #ebebeb;
        -webkit-transition: background-color ease-out .3s;
        -moz-transition: background-color ease-out .3s;
        -o-transition: background-color ease-out .3s;
        transition: background-color ease-out .3s;
    }
    */

    table.infoTable tbody tr:hover {
        background-color: #dbe4ef;
    }

    /*
    table.infoTable tbody tr:nth-child(odd):hover {
        background-color: #dbe4ef;
    }
    */

    #mymap .fa {
        font-family: Roboto, FontAwesome, sans-serif;
    }

    .fa-info-circle {
        color: #BBB;
    }

    p.info {
        width: 60%;
        color: #666 !important;
    }

    i.help {
        color: #BBB;
    }

    i.fa-info-circle {
        cursor: help;
    }

    /*.help-link, #mymap .help-link, #pageNav .help-link, #mymap .help-link:visited, #pageNav .help-link:visited {*/
        /*background: #AAA;*/
        /*font-size: 13px;*/
    /*}*/

    .align-right {
        position: absolute;
        right: 4.75%;
    }

    /* pseudo popup for catalog info */
    #catalogInfoModal {
        position: fixed;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,0.5);
        z-index: 10;
        -webkit-transition: background 0.5s ease-in;
        -moz-transition: background 0.5s ease-in;
        transition: background 0.5s ease-in;
    }

    #catalogInfo {
        position: fixed;
        left: 10%;
        top: 18%;
        width: 80%;
        height: 64%;
        opacity: 1;
        z-index: 11;
        border: 3px solid #628CB6;
        padding: 0;
        background: white;
    }

    #catalogInfo>h1 {
        color: #FFF;
        background: #628CB6;
        margin: 0;
        padding: 0.5em 0.4em;
        display: -webkit-flex; /* Safari */
        display: -moz-flex; /* Old Firefox */
        display: flex;
        -webkit-justify-content: space-between; /* Safari */
        justify-content: space-between;
        font-size: 14pt;
    }

    #catalogInfo>h1>a.close {
        color: white;
    }

    /* #catalogInfo>h1>a.close:hover { color: #E33; } */

    #catalogInfo>div, #catalogInfo>p {
        padding: 1em;
    }

    #catalogInfo>div {
        overflow: auto;
        height: calc(100% - 9.75em);
    }

    #catalogInfo ul {
        display: table;
        list-style-type: none;
    }

    #catalogInfo ul>li {
        display: table-row;
        margin-bottom: 0.5em;
    }

    #catalogInfo ul>li>span {
        display: table-cell;
        padding: 0.5em;
        border-bottom: thin solid #aaa;
    }

    #catalogInfo ul>li>span:first-child {
        border-right: thin solid #aaa;
    }

    #catalogInfo a.close {
        cursor: pointer;
    }

    /* pseudo popup for exploring majors/minors */
    h2#exploreMajor, h2#exploreMinor {
        display: -webkit-flex;
        display: -moz-flex;
        display: flex;
    }

    h2#exploreMajor>span, h2#exploreMinor>span {
        -webkit-flex: 1 1 auto;
        -moz-flex: 1 1 auto;
        flex: 1 1 auto;
    }

    h2#exploreMajor>a.explore-link, h2#exploreMinor>a.explore-link {
        -webkit-flex: 0 2 auto;
        -moz-flex: 0 2 auto;
        flex: 0 2 auto;
        text-align: right;
        font-size: 12pt;
    }

    /* printing */
    @media print {
        div.box {
            -webkit-box-shadow: none;
            -moz-box-shadow: none;
            box-shadow: none;
        }
        div { display: inline !important; }
        #main-header, #content-wrapper, #search-container, #search-pref-dialog, #pingenv {
            display: none !important;
        }
        div.ui-dialog, footer div {
            display: none !important;
        }
    }

    /* accessibility helps */
    [aria-hidden=true] {
        display: none !important;
    }

    [role=link] {
        cursor: pointer;
    }


    div#right {
        -webkit-flex-basis: calc(100% - 370px); /* Safari */
        -moz-flex-basis: calc(100% - 370px); /* Old Firefox */
        flex-basis: calc(100% - 370px);
    }

    div#right>div.box {
        margin-bottom: 1.75em;
    }

    div#left {
        -webkit-flex-basis: 345px; /* Safari */
        -moz-flex-basis: 345px; /* Old Firefox */
        flex-basis: 345px;
    }

    #mymap #left div>h2, #mymap #right div>h2 {
        font-size: 32px;
        font-weight: 300;
    }

    div#profile {
        padding: 0;
    }

    div#profile>h2 {
        margin-left: 28px;
        margin-top: 0;
        padding-top: 36px;
        font-size: 32px;
        font-weight: 300;
    }

    #mymap div#profile div>h4 {
        font: 15px/20px Roboto, sans-serif;
    }

    div#profileContent {
        display: -webkit-flex; /* Safari */
        dmoz: -webkit-flex; /* Old Firefox */
        display: flex;
        -webkit-justify-contents: space-between; /* Safari */
        -moz-justify-contents: space-between; /* Old Firefox */
        justify-contents: space-between;
        margin: 28px;
    }

    div#profileContent>div {
        margin-left: 1em;
    }

    div#profileContent>div>div {
        margin-bottom: 0.25em;
    }

    img#profilePicture {
        height: 80px;
        width: 80px;
        border-radius: 100%;
    }

    ul#academicStatus {
        display: -webkit-flex; /* Safari */
        dmoz: -webkit-flex; /* Old Firefox */
        display: flex;
        -webkit-flex-flow: row wrap; /* Safari */
        -moz-flex-flow: row wrap; /* Old Firefox */
        flex-flow: row wrap;
        list-style-type: none;
        margin-left: 0;
        line-height: 1em;
    }

    ul#academicStatus>li {
        -webkit-flex: 1 100%; /* Safari */
        -moz-flex: 1 100%; /* Old Firefox */
        flex: 1 100%;
        height: 4em;
        display: flex;
        -webkit-flex-direction: column; /* Safari */
        -moz-flex-direction: column; /* Old Firefox */
        flex-direction: column;
        -webkit-justify-content: center; /* Safari */
        -moz-justify-content: center; /* Old Firefox */
        justify-content: center;
        -webkit-align-items: center; /* Safari */
        -moz-align-items: center; /* Old Firefox */
        align-items: center;
        text-align: center;
    }

    ul#academicStatus>li>span {
        display:block;
    }

    ul#academicStatus>li>span:last-child {
        font-weight: bold;
    }

    ul#academicStatus>li.status.ok {
        background-color: #EFE;
        border-top: thick solid #091;
    }

    ul#academicStatus>li.status.warn {
        background-color: #F3F3a0;
        border-top: thick solid #989300;
    }

    ul#academicStatus>li.status.error {
        background-color: #FEE;
        border-top: thick solid #901;
    }

    ul#academicStatus>li:nth-child(1) {
        -webkit-flex: 2 0; /* Safari */
        -moz-flex: 2 0; /* Old Firefox */
        flex: 2 0;
    }
    ul#academicStatus>li:nth-child(2) {
        -webkit-flex: 1 85px; /* Safari */
        -moz-flex: 1 85px; /* Old Firefox */
        flex: 1 85px;
    }
    ul#academicStatus>li.status.endorse {
        background-color: #EEF;
        border-top: thick solid #109;
    }

    div.program {
        display: -webkit-flex; /* Safari */
        dmoz: -webkit-flex; /* Old Firefox */
        display: flex;
        -webkit-flex-flow: row nowrap; /* Safari */
        -moz-flex-flow: row nowrap; /* Old Firefox */
        flex-flow: row nowrap;
        -webkit-align-items: flex-start; /* Safari */
        -moz-align-items: flex-start; /* Old Firefox */
        align-items: flex-start;
    }

    div.program>aside {
        padding: 0.5em;
        display: inline-block;
        -webkit-flex: 1 1 100%; /* Safari */
        -moz-flex: 1 1 100%; /* Old Firefox */
        flex: 1 1 100%;
    }

    div.program>aside:first-child {
        -webkit-flex-basis: 15em; /* Safari */
        -moz-flex-basis: 15em; /* Old Firefox */
        flex-basis: 15em;
    }

    div#programs {
        display:-webkit-flex; /* Safari */
        dmoz:-webkit-flex; /* Old Firefox */
        display:flex;
        -webkit-flex-direction:column; /* Safari */
        -moz-flex-direction:column; /* Old Firefox */
        flex-direction:column;
        -webkit-align-items: center; /* Safari */
        -moz-align-items: center; /* Old Firefox */
        align-items: center;
        justify-content: space-between;
    }

    div#programChangeMajorLink {
        -webkit-flex: 1 1 100%;
        -moz-flex: 1 1 100%;
        flex: 1 1 100%;
        width: 100%;
        text-align: right;
    }

    div#programDetails {
        display:inline-block;
        -webkit-flex: 1 1 auto; /* Safari */
        -moz-flex: 1 1 auto; /* Old Firefox */
        flex: 1 1 auto;
        width: 100%;
    }

    div#academicProgress {
        padding: 1.5em;
        display:inline-block;
        -webkit-flex-basis: 30%; /* Safari */
        -moz-flex-basis: 30%; /* Old Firefox */
        flex-basis: 30%;
        border-left: thin solid #AAA;
    }

    div.progress {
        background-color: #AAA;
        border-radius: 3px;
        width: 100%;
        height: 14px;
    }

    div.progress>span {
        background-color: #698EB4;
        border-top-left-radius: 3px;
        border-bottom-left-radius: 3px;
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
        display: inline-block;
    }

    table.programTable th {
        font-size: 11px;
    }

    table.programTable td {
        font-size: 13px;
    }

    #mymapContent div#planning {
        margin-top: 1em;
    }

    #planning ul {
        margin-left: 0;
    }

    #planning ul>li {
        list-style-type: none;
        margin-top: 0.5em;
    }


    #noticeContainer {
        position: fixed;
        z-index: 999;
        left: 0;
        bottom: 0;
        right: 0;
    }

    #noticeContainer div {
        padding: 20px;
        margin-left: 0;
        margin-bottom: 5px;
        box-shadow: 0 1px 1px #333;
        border: thin solid #999;
        font-size: 12pt;
        animation: slideIn 0.5s;
    }

    @keyframes slideIn {
        from { margin-left: 100%; }
        to { margin-left: 0; }
    }

    #noticeContainer div.text {
        background-color: #698eb4;
        color: #f0f0f0;
        text-shadow: 0 1px 0 #aaa;
    }

    #noticeContainer div.loading {
        background-color: #698eb4;
        color: #f0f0f0;
        text-shadow: 0 1px 0 #aaa;
    }

    #noticeContainer div.warn {
        background-color: #EE8800;
        color: #F0F0F0;
        color: #111;
        text-shadow: 0 -1px 0 #333;
    }

    #noticeContainer div.error {
        background-color: #901;
        color: #F0F0F0;
        text-shadow: 0 -1px 0 #333;
    }

    #noticeContainer div.error:before {
        content:"Oops! Looks like something went wrong. Please try again. ("
    }

    #noticeContainer div.error:after {
        content:")"
    }
    .searchBtn {
        background-color: #698eb4;
        border-radius: 4px;
        color: white;
        width: 50px;
    }
    .searchBtn:disabled{
        opacity: .20;
    }
</style>
