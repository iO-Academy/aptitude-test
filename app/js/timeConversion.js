/**
 * converts time in minutes and seconds into time in seconds
 *
 * @param minutes - number of minutes
 *
 *  * @param seconds - number of seconds
 *
 *  @return time formatted in seconds
 */
function minsAndSecsToSecs(minutes, seconds) {
     var convertedSeconds = (minutes * 60) + (seconds)
     convertedSeconds = parseInt(convertedSeconds)
    return convertedSeconds
}
