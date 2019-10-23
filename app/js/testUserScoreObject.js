// async function getAllthestuff() {
//     let testData = await getData('test')
//     let userData = await getData('user')
//     let resultData = await getData('result')
//     // merge all 3
//     co
// }

var testUserScoreObject = {}

getData('test').then(function(data) {
    var testData = data.data
    console.log(testData)
})


getData('user').then(function(data) {
    var userData = data.data
    console.log(userData)
})


getData('result').then(function(data) {
    var resultData = data.data
    console.log(resultData)
})