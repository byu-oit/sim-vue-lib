export default {
    methods: {
        _addressLine: function (addressLine, addLineBreak)
        {
            let htmlLine = ""
            if (addressLine)
            {
                let line = addressLine.trim()
                if (line.length > 0)
                {
                    if (addLineBreak)
                    {
                        htmlLine += "<br>"
                    }
                    htmlLine += line
                }
            }

            return htmlLine
        },
        _addressBlock: function (addressBlock)
        {
            let block = this._addressLine(addressBlock.address_line_1)
            block += this._addressLine(addressBlock.address_line_2, true)
            block += this._addressLine(addressBlock.address_line_3, true)
            block += this._addressLine(addressBlock.address_line_4, true)

            return block
        },
        _campusAddressBlock: function (address)
        {
            if (address.hasOwnProperty("campus_address_block"))
            {
                return this._addressBlock(address["campus_address_block"])
            }

            return ""
        },
        _campusAddressBlockPhone: function (address)
        {
            if (address.hasOwnProperty("campus_address_block"))
            {
                const campusAddress = address["campus_address_block"]
                return campusAddress.address_line_3
            }

            return ""
        },
        _homeAddressBlock: function (address)
        {
            if (address.hasOwnProperty("home_address_block"))
            {
                return this._addressBlock(address["home_address_block"])
            }

            return ""
        },
        _permanentAddressBlock: function (address)
        {
            if (address.hasOwnProperty("permanent_address_block"))
            {
                return this._addressBlock(address["permanent_address_block"])
            }

            return ""
        }
    }
}