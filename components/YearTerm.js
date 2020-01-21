export default {
    methods: {
        //general purpose methods
        _yearTerm_add(years, terms, to)
        {
            //Note that this routines ignores the fall and winter 2nd blocks
            if (to === undefined)
            {
                return undefined
            }

            let year = parseInt(this._yearTerm_year(to), 10)
            let term = parseInt(this._yearTerm_term(to), 10)

            //get any years that are in the number of terms to add
            const yearsInTerms = Math.floor(terms / 4)
            terms = terms - (yearsInTerms * 4)

            years = years || 0
            year = year + years + yearsInTerms

            if (terms !== 0)
            {
                const offset = (terms > 0) ? -1 : 3
                let termValues = [1,3,4]
                switch (term)
                {
                    case 1:
                    case 2:
                        termValues = [3,4,5]
                        if (terms < 0)
                        {
                            year -= 1
                        }
                        break;
                    case 3:
                        termValues = [4,5,1]
                        if (terms > 2)
                        {
                            year += 1
                        }
                        else if (terms < -1)
                        {
                            year -= 1
                        }
                        break;
                    case 4:
                        termValues = [5,1,3]
                        if (terms > 1)
                        {
                            year += 1
                        }
                        else if (terms < -1)
                        {
                            year -= 2
                        }
                        break;
                    case 5:
                    case 6:
                        termValues = [1,3,4]
                        if (terms > 0)
                        {
                            year += 1
                        }
                        break;
                }
                term = termValues[terms + offset]
            }

            return year + "" + term
        },
        _yearTerm_nextTerm(from) {
            return this._yearTerm_add(0, 1, from)
        },
        _yearTerm_prevTerm(from) {
            return this._yearTerm_add(0, -1, from)
        },
        _yearTerm_nextSemesterOffset(from) {
            let offset = 1
            switch (this._yearTerm_term(from))
            {
                case "1":
                case "2":
                    offset = 3
                    break;
                case "3":
                    offset = 2
                    break;
            }
            return offset
        },
        _yearTerm_nextSemester(from) {
            const offset = this._yearTerm_nextSemesterOffset(from)
            return this._yearTerm_add(0, offset, from)
        },
        _yearTerm_prevSemesterOffset(from) {
            let offset = -1
            switch (this._yearTerm_term(from))
            {
                case "5":
                case "6":
                    offset = -3
                    break;
                case "4":
                    offset = -2
                    break;
            }
            return offset
        },
        _yearTerm_prevSemester(from) {
            const offset = this._yearTerm_prevSemesterOffset(from)
            return this._yearTerm_add(0, offset, from)
        },
        _yearTerm_nextYear(from) {
            return this._yearTerm_add(1, 0, from)
        },
        _yearTerm_prevYear(from) {
            return this._yearTerm_add(-1, 0, from)
        },
        _yearTerm_valid(val) {
            if (val.length > 5)
            {
                return this.yearTerm_dashRegEx.test(val)
            }
            return this.yearTerm_noDashRegEx.test(val)
        },
        _yearTerm_compress(val) {
            return this._yearTerm_year(val) + this._yearTerm_term(val)
        },
        _yearTerm_termDescription(val, creditType, defaultDescription) {
            if (defaultDescription)
            {
                return "Transfer/exam credits"
            }
            switch (parseInt(this._yearTerm_term(val), 10))
            {
                case 0:
                    return "Transfer/exam credits";
                case 1:
                    switch (creditType)
                    {
                        case "1":
                            return "Winter 1st Term"
                        case "2":
                            return "Winter 2nd Term"
                    }
                    return "Winter Semester";
                case 2:
                    return "Winter 2nd Block";
                case 3:
                    switch (creditType)
                    {
                        case 'S':
                            return "Spring & Summer Terms"
                    }
                    return "Spring Term";
                case 4:
                    return "Summer Term";
                case 5:
                    switch (creditType)
                    {
                        case "1":
                            return "Fall 1st Term"
                        case "2":
                            return "Fall 2nd Term"
                    }
                    return "Fall Semester";
                case 6:
                    return "Fall 2nd Block";
                default:
                    return val;
            }
        },
        _yearTerm_selectionList(from, nNext, nPrev, byTerms)
        {
            const self = this

            function selectionElement(yearTerm, isCurrentSelection)
            {
                return {value: yearTerm, format: self._yearTerm_format(yearTerm), description: self._yearTerm_description(yearTerm), isCurrentSelection: isCurrentSelection}
            }
            nNext = nNext || 5
            nPrev = nPrev || 0
            byTerms = (byTerms === undefined) ? true : this.yearTerm_globalbyTerms

            this.yearTerm_privateLastnNext = nNext
            this.yearTerm_privateLastnPrev = nPrev
            this.yearTerm_privateLastbyTerms = byTerms

            const nMax = Math.max(nNext, nPrev)

            const fNext = byTerms ? this._yearTerm_nextTerm : this._yearTerm_nextSemester
            const fPrev = byTerms ? this._yearTerm_prevTerm : this._yearTerm_prevSemester

            let nextVal = this._yearTerm_compress(from)
            let prevVal = nextVal
            const selections = [(selectionElement(nextVal, true))]
            for (let i=0;i < nMax; i++)
            {
                if (i < nPrev)
                {
                    prevVal = fPrev(prevVal)
                    selections.unshift(selectionElement(prevVal, false))
                }
                if (i < nNext)
                {
                    nextVal = fNext(nextVal)
                    selections.push(selectionElement(nextVal, false))
                }
            }
            this.yearTerm_selections = selections
            console.log('yearTerm_selections = ', this.yearTerm_selections)
            return this.yearTerm_selections
        },
        _yearTerm_description(val, creditType) {
            let defaultDescription = false;
            let term = '';
            if ((!val) || (val === '00000')) {
                defaultDescription = true;
            }
            else {
                term = this._yearTerm_term(val)
            }
            const termDesc = this._yearTerm_termDescription(term, creditType, defaultDescription);

            // if (term === termDesc)
            // {
            //     return val
            // }
            if (defaultDescription) {
                return termDesc
            }
            return termDesc + " " + this._yearTerm_year(val);
        },
        _yearTerm_year(val) {
            if (!val)
            {
                return "????"
            }
            return val.slice(0, 4);
        },
        _yearTerm_term(val) {
            if (!val)
            {
                return "?"
            }
            return val.slice(-1)
        },
        _yearTerm_format(val) {
            if (!val)
            {
                return " "
            }
            return this._yearTerm_year(val) + "-" + this._yearTerm_term(val)
        }
    }
}
