export default {
    computed: {
        ssn_dashRegEx() {
            return new RegExp("^([0-9]{3}[-][0-9]{2}[-][0-9]{4})$")
        },
        ssn_isNumberRegEx() {
            return new RegExp("^([0-9]*)$")
        }
    },
    methods: {
        _ssn_compress(val) {
            if (this.ssn_isNumberRegEx.test(val))
            {
                return val
            }
            return val.slice(0, 3) + val.slice(4, 6) + val.slice(7, 11)
        },
        _ssn_format(val) {
            let compressed = this._ssn_compress(val)
            return compressed.slice(0, 3) + "-" + compressed.slice(3, 5) + "-" + compressed.slice(5, 9)
        }
    }
}