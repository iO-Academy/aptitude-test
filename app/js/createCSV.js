/**
 * Gets test data
 * converts the json into csv and returns out
 * @param {*} info - object of user data
 * @param {*} userId - id of user in database
 * @param {*} userName  - name of user in database
 * @param {*} userPercentage -user percentage score on taken test
 */

function createCSV(info, userId, userName, userPercentage) {
    
   
    let arrayOfReplaces = [/\\/g, /"/g, /{/g, /}/g,]
        let questionsAndAnswers = info.data.answers
        console.log(info)
        console.log(questionsAndAnswers)

        arrayOfReplaces.forEach((expression) => {

            questionsAndAnswers = questionsAndAnswers.replace(expression, '')

        })

        questionsAndAnswers = questionsAndAnswers.split(',');

        let questionNumbersAndAnswers = [];

        questionsAndAnswers.forEach((answer) => {

            questionNumbersAndAnswers.push(answer.split(':'))

        })

        console.log(questionNumbersAndAnswers)
        
        let csv = 'Name,Score,%,' 
        
        questionNumbersAndAnswers.forEach((eachQuestion) => {
            csv += eachQuestion[0] + ','
         })
        
         csv += '\n';


        csv += `${userName}, ${info.data.score}, ${userPercentage}, ${info.data.answers}`;
        csv += "\n";
        
        
    return csv
}

