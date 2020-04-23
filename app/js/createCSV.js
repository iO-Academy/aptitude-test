/**
 * Gets test data
 * converts the json into csv and returns out
 * @param {info} Object - object of user data
 * @param {userId} number - id of user in database
 * @param {userName} string  - name of user in database
 * @param {userPercentage} number -user percentage score on taken test
 */
function createCSV(info, userId, userName, userPercentage) {
    
    let arrayOfReplaces = [/\\/g, /"/g, /{/g, /}/g,]
    let questionsAndAnswers = info.data.answers
    let questionNumbersAndAnswers = []
    let csv = 'Name,Score,%,'
    let count = 0
    
    arrayOfReplaces.forEach((expression) => {
        questionsAndAnswers = questionsAndAnswers.replace(expression, '')
    })

<<<<<<< Updated upstream
        })
        
        let csv = 'Name,Score,%,'
=======
    questionsAndAnswers = questionsAndAnswers.split(',')

    questionsAndAnswers.forEach((answer) => {
        questionNumbersAndAnswers.push(answer.split(':'))
    })
    
    questionNumbersAndAnswers.forEach((eachQuestion) => {
>>>>>>> Stashed changes

        csv += eachQuestion[0]
        
        if(count < questionNumbersAndAnswers.length -1) {
            csv += ','
        }

        count ++
    })
    
    csv += '\n'
    csv += `${userName},${info.data.score},${userPercentage},`
    
    count = 0

    questionNumbersAndAnswers.forEach((eachQuestion) => {

        csv += eachQuestion[1]

        if(count < questionNumbersAndAnswers.length -1) {
            csv += ','
        }

        count ++
    })
    
    csv += "\n"

    return csv
}