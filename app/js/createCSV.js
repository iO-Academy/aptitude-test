/**
 * Gets test data
 * converts the json into csv and returns out
 * @param {info} Object - object of user data
 * @param {userName} string  - name of user in database
 * @param {userPercentage} number -user percentage score on taken test
 */
function createCSV(info, userName, userPercentage) {
    
    //declare regular expressions for characters to remove from the csv
    let arrayOfReplaces = [/\\/g, /"/g, /{/g, /}/g,]
    let questionsAndAnswers = info.data.answers
    let questionNumbersAndAnswers = []
    let csv = 'Name,Score,%'
    
    //iterate over the users answers and remove unwanted characters
    arrayOfReplaces.forEach((expression) => {
        questionsAndAnswers = questionsAndAnswers.replace(expression, '')
    })

    //split the stripped file by the commas
    questionsAndAnswers = questionsAndAnswers.split(',')

    //split the stripped file by the seperator between question number and the answer
    questionsAndAnswers.forEach((answer) => {
        questionNumbersAndAnswers.push(answer.split(':'))
    })
    

    //add each question to the titles of the csv
    questionNumbersAndAnswers.forEach((eachQuestion) => {

        csv += `, ${eachQuestion[0]}`
        
    })
    
    csv += '\n'

    //enter the username, score and percentage under the relevant heading
    csv += `${userName},${info.data.score},${userPercentage}`

    //add the question answer under the relevant heading in the csv
    questionNumbersAndAnswers.forEach((eachQuestion) => {

        csv += `, ${eachQuestion[1]}`

    })

    return csv
}