export default {
    methods: {
        _sortNameParts(sortName) {
            const names = sortName.split(",")
            if (names.length > 1)
            {
                let preferredFirstName = names[1];
                preferredFirstName.match(/\((.*)\)/).map(function (val) {
                    preferredFirstName = val
                })

                return {
                    prefix: "",
                    suffix: "",
                    sortName: sortName,
                    surname: names[0],
                    preferredFirstName: preferredFirstName,
                    restOfName: names[1],
                    surnamePosition: "L"
                }
            }

            return {
                prefix: "",
                suffix: "",
                sortName: sortName,
                surname: sortName,
                preferredFirstName: "",
                restOfName: "",
                surnamePosition: "F"
            }
        },
        _hasIdentityFlags(identity) {
            if (this._hasRegistrarWarning(identity))
            {
                return true
            }
            if (this._isRestricted(identity))
            {
                return true
            }
            if (this._hasMergePending(identity))
            {
                return true
            }
            return this._isDeceased(identity)
        },
        _identityFlags: function (identity)
        {
            let flags = ""
            if (this._isDeceased(identity))
            {
                flags += '*Deceased* '
            }
            if (this._isRestricted(identity))
            {
                flags += '*Restricted* '
            }
            if (this._hasMergePending(identity))
            {
                flags += '*Merge Pending* '
            }
            if (this._hasRegistrarWarning(identity))
            {
                flags += '*Registrar Warning* '
            }

            return flags
        },
        _isAnEmployee(identity) {

            if (identity.empStatus)
            {
                const val = identity.empStatus.trim()
                return ((val !== "Non-Employee") && (val !== ""))
            }

            return false
        },
        _fullTextGender: function(gender)
        {
            if (gender)
            {
                switch (gender.toUpperCase().substr(0, 1))
                {
                    case 'M':
                        return 'Male';
                    case 'F':
                        return 'Female';
                    default:
                        return gender;
                }
            }
        },
        _isRestricted: function(identity)
        {
            return (identity.restricted && (identity.restricted === true) || (identity.restricted === "Y"));
        },
        _isDeceased: function(identity)
        {
            return (identity.deceased && (identity.deceased === true) || (identity.deceased === "Y"));
        },
        _hasRegistrarWarning: function(identity)
        {
            return (identity.registrar_warning && (identity.registrar_warning === true) || (identity.registrar_warning === "Y"));
        },
        _hasMergePending: function(identity)
        {
            return (identity.merge_pending && (identity.merge_pending === true) || (identity.merge_pending === "Y"));
        },
        _displayName: function (identity) {
            const firstName = identity.preferred_first_name || identity.rest_of_name
            if (identity.surname_position === 'L') {
                return firstName + ' ' + identity.surname
            }

            return identity.surname + ' ' + firstName
        }
    }
}