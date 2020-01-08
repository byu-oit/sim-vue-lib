import byuId from './ByuId'
import ssn from './SSN'

export default {
    mixins: [byuId, ssn],
    computed: {
        id_dashRegEx() {
            return new RegExp("^([0-9,-]*)$")
        },
        personLookup_displayLabel() {
            this.personLookup_searchConfig.wherePrefix = "Any one "
            let patternPrefix = ""

            if (this.personLookup_searchConfig.engine === "Student")
            {
                this.personLookup_searchConfig.wherePrefix = "Student(s) "
                patternPrefix = "Student "
            }
            else if (this.personLookup_searchConfig.engine === "Employee")
            {
                this.personLookup_searchConfig.wherePrefix = "Employee(s) "
                patternPrefix = "Employee "
            }
            if (this.personLookup_input === "")
            {
                return patternPrefix + "Search Pattern"
            }
            if (this.personLookup_invalidSearch)
            {
                return "INVALID search pattern"
            }
            let label = this.personLookup_searchConfig.wherePrefix + "where"
            if (this.personLookup_searchConfig.type === "PersonId")
            {
                label += " person Id = "
                label += this.personLookup_input.slice(1)

                return label
            }
            else if (this.personLookup_searchConfig.type === "Phone")
            {
                label += " phone number = "
                label += this.personLookup_input.slice(1)

                return label
            }
            else if (this.personLookup_searchConfig.type === "Hometown")
            {
                label += " hometown = "
                label += this.personLookup_input.slice(1)

                return label
            }
            if (this.personLookup_byuId !== "" || this.personLookup_ssn !== "")
            {
                if (this.personLookup_byuId !== "")
                {
                    label += " BYU ID = "
                    label += this._byuId_format(this.personLookup_byuId)
                }
                if (this.personLookup_ssn !== "")
                {
                    if (this.personLookup_byuId !== "")
                    {
                        label += " or"
                    }
                    label += " SSN = "
                    label += this._ssn_format(this.personLookup_ssn)
                }
                return label
            }
            if (this.personLookup_privateLastNameFirstSearch)
            {
                let parts = this.personLookup_searchConfig.pattern.split(',')
                label += " surname = " + parts[0]
                if ((parts.length > 0) && (parts[1].trim() !== ""))
                {
                    label += " and rest of name like " + parts[1]
                }
            }
            else
            {
                label += " Net Id = "
                if (this.personLookup_privateNetIdSearch)
                {
                    label += this.personLookup_netId
                    return label
                }
                label += this.personLookup_searchConfig.pattern
                label += " or"
                label += " name like "
                label += this.personLookup_searchConfig.pattern
            }

            return label
        }
    },
    data() {
        return {
            personLookup_input: "",
            personLookup_netId: "",
            personLookup_ssn: "",
            personLookup_byuId: "",
            personLookup_personId: "",
            personLookup_privateLastNameFirstSearch: false,
            personLookup_privateNetIdSearch: false,
            personLookup_invalidSearch: false,
            personLookup_selections: [],
            personLookup_dropdown: undefined,
            personLookup_dropdownIsShowing: false,
            // personLookup_displayLabel: "Search Pattern",
            personLookup_allowedEngines:  {All: true, Student: true, Employee: true},
            personLookup_searchConfig: {},
            personLookup_dropdownConfig: {}
        }
    },
    watch: {
        personLookup_input: function(newVal, oldVal) {
            this.personLookup_invalidSearch = false
            let val = newVal.trim()
            if (val.length === 0)
            {
                this._personLookup_resetSearchPatterns()
                return
            }
            const firstChar = val.slice(0,1)
            //checking for special search character
            let specialCharSearch = true
            this.personLookup_searchConfig.type = "Name"
            switch (firstChar)
            {
                case "=":
                    this.personLookup_searchConfig.type = "PersonId"
                    break
                case "/":
                    this.personLookup_searchConfig.type = "Phone"
                    break
                case "#":
                    this.personLookup_searchConfig.type = "Hometown"
                    break
                default:
                    specialCharSearch = false
            }
            // if (val.length > 0 || (this.personLookup_ssn !== "" || this.personLookup_byuId !== ""))
            // {
            if (!specialCharSearch)
            {
                if (this.id_dashRegEx.test(val))
                {
                    this.personLookup_ssn = val
                    this.personLookup_byuId = val
                    if (val.length >= 3)
                    {
                        if (val.slice(2, 3) === '-')
                        {
                            this.personLookup_ssn = ""
                        }
                    }
                    if (val.length >= 4)
                    {
                        if (val.slice(3, 4) === '-')
                        {
                            this.personLookup_byuId = ""
                        }
                    }
                    if (val.length === 9)
                    {
                        if (this.byuId_isNumberRegEx.test(val))
                        {
                            this.personLookup_searchConfig.pattern = this.personLookup_byuId
                            this._personLookup_triggerSearch()
                            return
                        }
                    }
                    else if (val.length >= 11)
                    {
                        if (this.byuId_dashRegEx.test(val))
                        {
                            this.personLookup_searchConfig.pattern = this.personLookup_byuId
                            this._personLookup_triggerSearch()
                            return
                        }
                        if (this.ssn_dashRegEx.test(val))
                        {
                            this.personLookup_searchConfig.pattern = this.personLookup_ssn
                            this._personLookup_triggerSearch()
                            return
                        }
                        this.personLookup_invalidSearch = true
                        return
                    }
                    if (!this._byuId_hasAtMostTwoDashes(val))
                    {
                        this.personLookup_invalidSearch = true
                        return
                    }
                    return
                }
            }
            if (this.personLookup_searchConfig.type === "PersonId")
            {
                if (this.byuId_isNumberRegEx.test(val.slice(1)))
                {
                    this.personLookup_personId = val.slice(1)
                    if (this.personLookup_personId.length === 9)
                    {
                        this.personLookup_searchConfig.pattern = this.personLookup_personId
                        this._personLookup_triggerSearch()
                    }
                    return
                }
                this.personLookup_invalidSearch = true
                return
            }
            this.personLookup_privateLastNameFirstSearch = false
            this.personLookup_privateNetIdSearch = false
            const lastChar = val.slice(-1);
            //checking for a period ending net Id pattern
            switch (lastChar)
            {
                case '.':
                    this.personLookup_privateNetIdSearch = true
                    this.personLookup_searchConfig.pattern = this.personLookup_netId
                    this._personLookup_triggerSearch()
                    return
            }
            this.personLookup_searchConfig.pattern = val
            //checking for a comma based last name first search pattern
            if (val.indexOf(",") >= 0)
            {
                this.personLookup_netId = ""
                this.personLookup_privateLastNameFirstSearch = true
                return
            }
            this.personLookup_netId = val
        }
    },
    methods: {
        _personLookup_resetSearchPatterns() {
            this.personLookup_netId =  ""
            this.personLookup_ssn =  ""
            this.personLookup_byuId =  ""
            this.personLookup_personId =  ""
            //save engine
            let engine = this.personLookup_searchConfig.engine
            this.personLookup_searchConfig = {engine: engine, allowedEngines: this.personLookup_allowedEngines}
            this.personLookup_privateLastNameFirstSearch =  false
            this.personLookup_privateNetIdSearch =  false
            this.personLookup_invalidSearch =  false
        },
        _personLookup_valueCleared() {
            this.personLookup_input = ""
            this._personLookup_resetSearchPatterns()
        },
        _personLookup_help() {
        },
        _personLookup_triggerSearch() {
            //set the search label
            this.personLookup_searchConfig.label = this.personLookup_displayLabel
            //update the dropdownConfig to trigger the person lookup search
            this.personLookup_dropdownConfig = Object.assign({}, this.personLookup_searchConfig);
        }
    }
}
