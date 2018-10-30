/**
 *  sets a 30 minute timer for taking the test
 */

//30 minute time limit
let timeLimit = 1801

function timer() {
    let minutes = Math.floor(timeLimit / 60);
    let seconds = Math.floor(timeLimit - minutes * 60);

    document.querySelector("#timer").innerHTML = minutes + "m " + seconds + "s ";
    timeLimit--
    if (timeLimit < 0){
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
    let timeTaken = 1799 - timeLimit
    let minutes = ("00" + Math.floor(timeTaken / 60)).slice(-2)
    let seconds = ("00" + Math.floor(timeTaken - minutes * 60)).slice(-2)
    let time = minutes + '.' + seconds
    return time
}

let interval = setInterval(timer, 1000)