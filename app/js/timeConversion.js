/**
 * converts time in minutes and seconds into time in seconds
 *
 * @param minutes - number of minutes
 *
 * @param seconds - number of seconds
 *
 * @return time formatted in seconds
 */
function minsAndSecsToSecs(minutes, seconds) {
     var convertedSeconds = (minutes * 60) + (seconds)
     convertedSeconds = parseInt(convertedSeconds)
    return convertedSeconds
}

/**
 * converts seconds into minutes and seconds
 *
 * @param timeInSeconds - time in seconds
 */
function secsToMinsAndSecs(timeInSeconds) {
    var minutes = Math.floor(timeInSeconds / 60);
    var seconds = timeInSeconds - (minutes * 60)
    return [minutes, seconds]
}

