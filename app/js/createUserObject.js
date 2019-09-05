/**
 * Get all the test results from the API.
 */
async function getResults() {
    let resultsArr = await fetch("http://localhost:8080/result", {method: 'get'})
    .then(function (data) {
        return data.json()
    })
    return resultsArr.data
}

/**
 * Gets users from the API.
 * Filters out users that have been soft-deleted from the database.
 * @return Array of user objects
 */
async function getUsers() {
    let users = await fetch("http://localhost:8080/user", {method: 'get'})
        .then(function (data) {
            return data.json()
        })
    let filteredUsersArray = users.data.filter( function(value, index, arr) {
        return value.deleted == 0;
    })
    return filteredUsersArray
}

/**
 * Take a score and a total number of questions and calculate the score 
 * as a percentage.
 * @param score 
 * @param numOfQuestions 
 */
function calculatePercentage(score, numOfQuestions) {
    return ((score / numOfQuestions) * 100).toFixed(2)
}

/**
 * Take a time in seconds and convert it into minutes and seconds.
 * @param time 
 */
function secondsToMinutes(time) {
    return String(Math.floor(time / 60)) + ':' + String((time % 60)).padStart(2,'0')
}

/**
 * Prepares user objects for next step, createUserObject
 *
 * @return Array - containing the user objects
 */
async function getNameAndEmail() {
    let users = await getUsers()
    let userObjectArray = []
    users.forEach(function(user) {
        let obj = {}
        let {id, email, name, time} = user
        obj['id'] = id
        obj['name'] = name
        obj['email'] = email
        obj['timeAllowed'] = time
        userObjectArray.push(obj)
    })
    return userObjectArray
}

/**
 * Combines the information used in a table row into a new object.
 * Returns a list of all of these user-result objects ready to be put into table rows.
 *
 * @return Object containing a success/fail state and an array of the user-result objects.
 */
async function createUsersObject() {
    let results = await getResults()
    let users = await getNameAndEmail()
    let userDisplayArray = []
    users.forEach(function(user) {
        let didTest = []
        results.forEach(function(result) {
            let testEntryFound = []
            if (result.id === user.id ) {
                let answers = JSON.parse(JSON.parse(result.answers))
                let numberOfQuestionsTaken = Object.keys(answers).length
                let obj = {}
                obj['id'] = user.id
                obj['name'] = user.name
                obj['email'] = user.email
                obj['score'] = result.score
                obj['percentage'] = calculatePercentage(result.score, numberOfQuestionsTaken)
                obj['time'] = result.time
                obj['timeAllowed'] = secondsToMinutes(user.timeAllowed)
                obj['dateCreated'] = result.dateCreated
                userDisplayArray.push(obj)
                testEntryFound.push('yes')
            }
            if (testEntryFound.length !== 0) {
                didTest.push(testEntryFound)
            }
        })
        if (didTest.length === 0) {
            let obj = {}
            obj['id'] = user.id
            obj['name'] = user.name
            obj['email'] = user.email
            obj['score'] = ''
            obj['percentage'] = ''
            obj['time'] = ''
            obj['timeAllowed'] = secondsToMinutes(user.timeAllowed)
            obj['dateCreated'] = '1970-01-01 00:00:01'
            obj['testNotTaken'] = 'Not Taken'
            userDisplayArray.push(obj)
        }
    })
    return await {success: true, data: userDisplayArray}
}