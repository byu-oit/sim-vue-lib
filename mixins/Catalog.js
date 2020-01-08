export default {
    methods: {
        _MAPsPath(primaryProgram) {

            let twoDigitYear

            if (primaryProgram.yearTerm)
            {
                twoDigitYear = primaryProgram.yearTerm.substring(2,4)
            }
            else
            {
                const today = new Date()
                twoDigitYear = today.getFullYear().toString().slice(-2)
            }
            return "http://catalog.byu.edu/openPDF/maps/" + twoDigitYear + "/" + primaryProgram.academicProgram.programCode + ".pdf"
        }
    }
}