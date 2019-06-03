import moment from 'moment'

const formattednow = function() {
  var now = moment()
  return now.format('YYYYMMDD') + 'T' + now.format('HHmmss') + 'Z'
}

const countdowntimer = function (due) {
  var now = formattednow()
  var newstringparts = due.substring(0,4) + "-" + due.substring(4,6) + "-" + due.substring(6,8) + "-" + due.substring(9,11) + "-" + due.substring(11,13) + "-" + due.substring(13,15)
  var newformattednow = now.substring(0,4) + "-" + now.substring(4,6) + "-" + now.substring(6,8) + "-" + now.substring(9,11) + "-" + now.substring(11,13) + "-" + now.substring(13,15)

  var momenttwo = moment(newformattednow, "YYYY-MM-DD-HH-mm-ss")
  var momentone = moment(newstringparts, "YYYY-MM-DD-HH-mm-ss")

  var diff = momentone.diff(momenttwo, 'seconds')
  var clock = diff

  var timeLeft = function() {
    if (clock > 0) {
      var days = Math.floor(clock / 86400)
      var hours = Math.floor((clock - days * 86400) / 3600)
      var minutes = Math.floor((clock - days * 86400 - hours * 3600) / 60)
      var seconds = clock % 60
      return (days == 0 ? "" : days + " days ") + ((days == 0 && hours == 0) ? "" : (hours < 10 ? "0" : "") + hours + ":") + ((days == 0 && hours == 0 && minutes == 0) ? "" : ((days == 0 && hours == 0 && minutes < 10) ? "" : (minutes < 10 ? "0" : "")) + minutes + ":") + ((days == 0 && hours == 0 && minutes == 0) ? "" : (seconds < 10 ? "0" : "")) + seconds
    }
  }


  if ((clock == 262220) && Notification.permission === "granted") {
    var description = Taskspending.findOne({due: due}).description
    var options = {body: description + ' in three days'}
    var n = new Notification(description, options);

  }
  return timeLeft()
}

export { countdowntimer, formattednow }
