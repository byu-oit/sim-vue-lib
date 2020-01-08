export default {
    methods: {
        _shortMonthName(mon) {
            if (mon >= 0 && mon < 12)
            {
                const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
                return months[mon]
            }
            return null
        },
        _longMonthName(mon) {
            if (mon >= 0 && mon < 12)
            {
                const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
                return months[mon]
            }
            return null
        },
        _sundayFirstDayOfTheWeek(day) {
            if (day >= 0 && day < 12)
            {
                const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
                return days[day]
            }
            return null
        },
        _DmonY(val) {
            const valDate = new Date(val)
            return valDate.getDate() + " " + this._shortMonthName(valDate.getMonth()) + " " + valDate.getFullYear()
        },
        _DayDmonY(val) {
            const valDate = new Date(val)
            return this._sundayFirstDayOfTheWeek(valDate.getDay()) + ", " + valDate.getDate() + " " + this._shortMonthName(valDate.getMonth()) + " " + valDate.getFullYear()
        },
        _elapsedDays(val) {
            const valDate = new Date(val)
            const now = new Date()
            const elapsed = now.getTime() - valDate.getTime()
            return (elapsed / (1000*60*60*24))
        }
    }
}