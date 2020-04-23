/**
 * Takes time and returns true if passed validation or false otherwise.
 * @param time
 * @returns boolean
 */
function isTimeTotalValid(time) {
    let intTime = parseInt(time);
    return (intTime > 0 && intTime <= 3600);
}

/**
 * Takes time and returns true if passed validation or false otherwise.
 * @param time
 * @returns boolean
 */
function isTimeMinutesValid(time) {
    let intTime = parseInt(time);
    return (intTime >= 0 && intTime <= 60);
}

/**
 * Takes time and returns true if passed validation or false otherwise.
 * @param time
 * @returns boolean
 */
function isTimeSecondsValid(time) {
    let intTime = parseInt(time);
    return (intTime >= 0 && intTime < 60);
}