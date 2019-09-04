const numberOfQuestions = 30

async function getResults() {
    let resultsArr = await fetch("http://localhost:8080/result", {method: 'get'})
    .then(function (data) {
        return data.json()
    })
    //console.log(resultsArr.data)
    return resultsArr.data
}

/**
 * Gets users from the API.
 * Filters out users that have been soft-deleted from the database.
 * 
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

function calculatePercentage(score, numOfQuestions) {
    return ((score / numOfQuestions) * 100).toFixed(2)
}

function secondsToMinutes(time) {
    return (time / 60).toFixed(2)
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
        obj['timeAllowed'] = secondsToMinutes(time)
        userObjectArray.push(obj)
    })
    return userObjectArray
}

/**
 * combines user info (name and email) and result scores into the a new object
 *
 * @return Object - containing the user info and user results including percentage
 */
async function createUsersObject() {
    let results = await getResults()
    let users = await getNameAndEmail()
    let userDisplayArray = []
    let didTest = []

    users.forEach(function(user) {
        results.forEach(function(result) {
            didTest = []

            if (result.id === user.id ) {
                let obj = {}

                obj['id'] = user.id
                obj['name'] = user.name
                obj['email'] = user.email
                obj['score'] = result.score
                obj['percentage'] = calculatePercentage(result.score, numberOfQuestions)
                obj['time'] = result.time
                obj['timeAllowed'] = user.timeAllowed
                obj['dateCreated'] = result.dateCreated
                userDisplayArray.push(obj)
                didTest.push('yes')
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
            obj['timeAllowed'] = user.timeAllowed
            obj['dateCreated'] = results[0].dateCreated
            userDisplayArray.push(obj)
        }
    })
    console.log({data: userDisplayArray})
    return await {success: true, data: userDisplayArray}
}