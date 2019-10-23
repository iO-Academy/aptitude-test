/**
 * This function checks the score against the dropdown value and filters the result
 *
 * @param resultArray an array full of objects of testee's info and scores
 *
 * @returns will return the result based on the chosen percentage
 */
async function userScoreDivide (){
    let usersObject = await createUsersObject()
    let usersData = usersObject.data
    let percentagesArray = []
    usersData.forEach(function (element) {
        percentagesArray.push(element.percentage)
    })
    console.log(percentagesArray)
}

function 
// let userScores = document.querySelectorAll('.percentage')
//
// let userScoresArray =[]
// if (parseInt(filterScorePercentage.value) === 1){
//     resultArray.forEach((data)=>{
//         if(data.percentage >= 70){
//             newResultArray.push(data)
//         }
//     })
// } else if (parseInt(filterScorePercentage.value) === 2){
//     resultArray.forEach((data)=>{
//         if(data.percentage < 70){
//             newResultArray.push(data)
//         }
//     })
// } else {
//     return resultArray
// }
// return newResultArray




userScoreDivide()