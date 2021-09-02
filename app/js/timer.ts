
/** function timeElapsed takes a dateStamp and return the difference between the current dateStamp and
 *  the one that is passed into the function
 *
 * @param dateStamp parameter is the date stamp that is stored in a cookie at the beginning of the test
 * @return returns the difference between the date stamp of the moment the function is called and the
 * parameters date stamp value
 */
function timeElapsed(dateStamp: DOMTimeStamp){
    let timeNow: any = Date.now()
    return  timeNow - dateStamp
}

/**
 * Function timeRemainingCalc() works out the time remaining to complete the test in seconds by taking the
 * time elapsed from the time limit.
 */
function timeRemainingCalc () {
    let dateStamp: any = getCookie("dateStamp")
    return Math.floor((timeLimit * 1000 - timeElapsed(dateStamp))/1000)
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
    document.querySelectorAll(".timer").forEach(function (timer) {
        timer.innerHTML = minutes + "m " + seconds + "s ";
    })
    timeRemaining--
    if (timeRemaining < 0) {
        showResults()
    }
}

/**
 *  gets amount of time user took to complete the test in the format the api requires
 *
 *  @return string in format Minutes.Seconds
 */
function getTimeForApi() {
    let timeTaken: any = timeLimit - timeRemaining
    let minutes: any = ("00" + Math.floor(timeTaken / 60)).slice(-2)
    let seconds: any = ("00" + Math.floor(timeTaken - minutes * 60)).slice(-2)
    return minutes + '.' + seconds
}

//Logged in users time limit in seconds.
let timeLimit: any = getCookie("userTime")
timeLimit++
let timeRemaining: any = timeRemainingCalc()
let interval = setInterval(timer, 1000)

// event listeners for hide/show-timer buttons
document.querySelectorAll('.toggleTimerButton').forEach(timer_button => {
    timer_button.addEventListener('click', evt => {
        evt.preventDefault();
        document.querySelectorAll<HTMLButtonElement>('.timer').forEach(clock => {
            if (clock.hidden === true){
                clock.hidden = false;
                timer_button.textContent = 'Hide Timer';
            } else {
                clock.hidden = true;
                timer_button.textContent = 'Show Timer';
            }
        })
    })
})