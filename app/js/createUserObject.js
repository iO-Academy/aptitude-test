/**
 * Get all the test results from the API.
 */
async function getResults() {
    let baseUrl = getBaseUrl()
    let resultsArr = await fetch(baseUrl + "result", {method: 'get'})
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
    let baseUrl = getBaseUrl()
    let users = await fetch(baseUrl + "user", {method: 'get'})
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
 * @param {number} score The user's test score
 * @param {number} numOfQuestions The number of questions on the test
 * @return {number} The score represented as a percentage
 */
function calculatePercentage(score, numOfQuestions) {
    return ((score / numOfQuestions) * 100).toFixed(2)
}

/**
 * Take a time in seconds and convert it into minutes and seconds.
 * @param {number} time time in seconds
 * @return {number} Time in MM:SS format
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
        let {id, email, name, time, test_id} = user
        obj['id'] = id
        obj['name'] = name
        obj['email'] = email
        obj['timeAllowed'] = time
        obj['test_id'] = test_id
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
                obj['test_id'] = user.test_id
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
            obj['score'] = 'Test not yet taken'
            obj['percentage'] = 'Test not yet taken'
            obj['time'] = ''
            obj['timeAllowed'] = secondsToMinutes(user.timeAllowed)
            obj['dateCreated'] = '1970-01-01 00:00:01'
            obj['test_id'] = user.test_id
            userDisplayArray.push(obj)
        }
    })
    return await {success: true, data: userDisplayArray}
}