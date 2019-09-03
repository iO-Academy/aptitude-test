const numberOfQuestions = 30

async function getResults() {
    let resultsArr = await fetch("http://localhost:8080/result", {method: 'get'})
    .then(function (data) {
        return data.json()
    })
    //console.log(resultsArr.data)
    return resultsArr.data
}

async function getUsers() {
    let users = await fetch("http://localhost:8080/user", {method: 'get'})
    .then(function (data) {
        return data.json()
    })
    //console.log(users.data)
    return users.data
}

function calculatePercentage(score, numOfQuestions) {
    return ((score / numOfQuestions) * 100).toFixed(2)
}

function secondsToMinutes(time) {
    return time / 60
}

/**
 * gets all users name and email from API
 *
 * @return Array - containing the user info (Name and Email)
 */
async function getNameAndEmail() {
    let users = await getUsers()

    let usersArray = []
    users.forEach(function(user) {
        let obj = {}
        let {id, email, name, time} = user
        obj['id'] = id
        obj['name'] = name
        obj['email'] = email
        obj['timeAllowed'] = secondsToMinutes(time)
        usersArray.push(obj)
    })
    return usersArray
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

    results.forEach(function(result) {
        users.forEach(function(user) {
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
            }
        })
    })
    return await {success: true, data: userDisplayArray}
}