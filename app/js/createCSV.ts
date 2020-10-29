/**
 * Gets test data
 * converts the json into csv and returns out
 * @param {info} Object - object of user data
 * @param {userName} string  - name of user in database
 * @param {userPercentage} number -user percentage score on taken test
 * @param {score} number -user score on taken test
 */
function createCSV(info: Object, userName: string, userPercentage: number, score: number) {

    let csv = "Name,Score,%"

    //add each question to the titles of the csv
   for(let eachQuestion in info) {
       let questionString = info[eachQuestion].question
       let replacedString = questionString.replace(/,/g,"")
        csv += `, ${eachQuestion}: ${replacedString}`
    }

    csv += "\n"

    //enter the username, score and percentage under the relevant heading
    csv += `${userName},${score},${userPercentage}`

   //add the question answer under the relevant heading in the csv
    for(let eachQuestion in info) {
        csv += `,User Response: ${info[eachQuestion].userAnswer} - ${info[eachQuestion].correct}`
    }

    return csv
}

