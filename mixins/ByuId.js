export default {
    computed: {
        byuId_dashRegEx() {
            return new RegExp("^([0-9]{2}[-][0-9]{3}-[0-9]{4})$")
        },
        byuId_isNumberRegEx() {
            return new RegExp("^([0-9]*)$")
        }
    },
    methods: {
        _byuId_compress(val) {
            if(val) {
                if (this.byuId_isNumberRegEx.test(val)) {
                    return val
                }
                return val.slice(0, 2) + val.slice(3, 6) + val.slice(7, 11)
            }
            return ''
        },
        _byuId_format(val) {
            let compressed = this._byuId_compress(val)
            return compressed.slice(0, 2) + "-" + compressed.slice(2, 5) + "-" + compressed.slice(5, 9)
        },
        _byuId_hasAtMostTwoDashes(val) {
            return ((val.match(/-/g) || []).length <= 2)
        }
    }
}