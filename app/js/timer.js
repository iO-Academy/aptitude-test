
/** function timeElapsed takes a dateStamp and return the difference between the current dateStamp and
 *  the one that is passed into the function
 *
 * @param dateStamp parameter is the date stamp that is stored in a cookie at the beginning of the test
 * @return returns the difference between the date stamp of the moment the function is called and the
 * parameters date stamp value
 */
function timeElapsed(dateStamp){
    let timeNow = Date.now()
    return  timeNow - dateStamp
}

/**
 * Function timeRemainingCalc() works out the time remaining to complete the test in seconds by taking the
 * time elapsed from the time limit.
 */
function timeRemainingCalc () {
    let dateStamp = getCookie("dateStamp")
    return Math.floor((timeLimit*1000 - timeElapsed(dateStamp))/1000)
}

/**
 *Function timer() figures out how many seconds and minutes remain and displays this value. When called 1 is
 * taken off the value of timeRemaining.
 * If the timeRemaining is less than 0 then the function (not our code) automatically clicks on the
 * finish button.
 */
function timer() {
    let minutes = Math.floor(timeRemaining / 60);
    let seconds = Math.floor(timeRemaining - minutes * 60);
    document.querySelector("#timer").innerHTML = minutes + "m " + seconds + "s ";
    timeRemaining--
    if (timeRemaining < 0){
        clearInterval(interval)
        showResults()
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

//30 minute time limit in seconds (plus one second for lag).
let timeLimit = getCookie("userTime")
let timeRemaining = timeRemainingCalc()
let interval = setInterval(timer, 1000)