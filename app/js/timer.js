/**
 *  Function that works out how much time (in milliseconds, has elapsed between when the function is called
 *  and a given date Stamp
 *
 *  @param dateStamp The date stamp made at the start of the test
 *  @return returns the time elapsed in milliseconds
 */
function timeElapsed(dateStamp){
    let timeNow = Date.now()
    return  timeNow - dateStamp
}

/**
 * The timer function presents the time remaining in seconds and counts down the clock (taking one second
 * from the time remaining) when called
 */
//
function timer() {
    let minutes = Math.floor(timeRemaining / 60);
    let seconds = Math.floor(timeRemaining - minutes * 60);

    document.querySelector("#timer").innerHTML = minutes + "m " + seconds + "s ";
    timeRemaining--
    if (timeRemaining < 0){
        clearInterval(interval)
        document.querySelector('#finish').click()
    }
}

/**
 *  gets amount of time user took to complete the test in the format the api requires
 *
 *  @return string in format Minutes.Seconds
 */
function getTimeForApi() {
    let timeTaken = timeLimit - timeRemaining
    let minutes = ("00" + Math.floor(timeTaken / 60)).slice(-2)
    let seconds = ("00" + Math.floor(timeTaken - minutes * 60)).slice(-2)
    let time = minutes + '.' + seconds
    return time
}

//30 minute time limit
const timeLimit = 1801
let dateStamp = getCookie("dateStamp")
//time remaining is the time limit minus the tme elapsed in seconds
let timeRemaining = Math.floor((timeLimit*1000 - timeElapsed(dateStamp))/1000)
let interval = setInterval(timer, 1000)