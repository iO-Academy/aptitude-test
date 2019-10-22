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