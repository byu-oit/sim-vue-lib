export default {
  data() {
    return {
      shortMonths: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      fullMonths: ["January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    }
  },
  methods: {
    _date_formatDDMONYEARTIME(val) {
      if (val === null) {
        return ' '
      }
      else {
        const date = new Date(val)

        return date.getDate() + " " + this.fullMonths[date.getMonth()] + " " + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes()
      }
    },
    _date_formatDDMONYEAR(val) {
      if (val === null) {
        return ' '
      }
      else {
        const date = new Date(val)

        return date.getDate() + " " + this.fullMonths[date.getMonth()] + " " + date.getFullYear()
      }
    },
    _date_formatUS(val) {
      if (val === null) {
        return ' '
      }
      else {
        const date = new Date(val)
        var month = date.getMonth()
        month++
        if (month < 10) {
          month = '0' + month
        }
        var day = date.getDate()
        if (day < 10) {
          day = '0' + day
        }
        return month + '/' + day + '/' + date.getFullYear()
      }
    },
    _date_convert_shortMonth(val) {
        if ((val === null) || (val === '') || (typeof val === "undefined")) {
          return ' '
        }
        else {
          const date = new Date(val)
          var day = date.getDate()
          if (day < 10) {
            day = '0' + day
          }
          return day + " " + this.shortMonths[date.getMonth() + 1] + " " + date.getFullYear()
        }
    },

    _getToday_shortMonth() {

      var today = new Date();
      var dd = today.getDate();
      var mm = today.getMonth() + 1; //January is 0!
      var yyyy = today.getFullYear();

      if (dd < 10) {
        dd = '0' + dd;
      }

      return dd + " " + this.shortMonths[today.getMonth()] + " " + today.getFullYear()
    },

    _date_formatDDMMMYEAR(val) {
      if (val === null) {
        return ' '
      }
      else {
        const date = new Date(val)
        var day = date.getDate()
        if (day < 10) {
          day = '0' + day
        }
        return day + " " + this.shortMonths[date.getMonth()] + " " + date.getFullYear()
      }
    },

  }
}
