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
     let convertedSeconds = parseInt(minutes * 60) + parseInt(seconds)
     convertedSeconds = parseInt(convertedSeconds)
    return convertedSeconds
}

/**
 * converts seconds into minutes and seconds
 *
 * @param timeInSeconds - time in seconds
 */
function secsToMinsAndSecs(timeInSeconds) {
    let minutes = Math.floor(timeInSeconds / 60);
    let seconds = timeInSeconds - (minutes * 60)
    return [minutes, seconds]
}

