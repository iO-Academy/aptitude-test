

//takes a dateStamp and return the difference between the current dateStamp and
// the one that is passed into the function
function timeElapsed(dateStamp){
    let timeNow = Date.now()
    return  timeNow - dateStamp
}

/**
 *  sets a 30 minute timer for taking the test
 */

//30 minute time limit
const timeLimit = 1799

let dateStamp = getCookie("dateStamp")

//time remaining is the time limit minus the tme elapsed in seconds
let timeRemaining = Math.floor((timeLimit*1000 - timeElapsed(dateStamp))/1000)

//The timer function presents the time remaining in seconds and counts down the clock when called
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

let interval = setInterval(timer, 1000)