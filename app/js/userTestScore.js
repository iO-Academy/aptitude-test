async function accordionTesting() {
    let testData = await getData('test')
    let userData = await getData('user')
    let resultData = await getData('result')

    userData.data.forEach(function (user) {
        testData.data.map(function (test) {
            if ((test.id === user.test_id) && (user.testName !== '')) {
                user.testName = test.name
            }
            resultData.data.map(function (result) {
                if ((result.id.toString() === user.id.toString()) && (user.score !== '')) {
                    user.score = result.score
                }
            })
        })
    })
    console.log(userData.data)
    return await userData
}
accordionTesting()


// async function accordionTesting() {
//     let testData = await getData('test')
//     let userData = await getData('user')
//     let resultData = await getData('result')

//     testData.data.forEach(function (test) {
//         userData.data.forEach(function (user) {
//             if ((test.id === user.test_id) && (user.testName !== '')) {
//                 user.testName = test.name
//             }
//             resultData.data.map(function (result) {
//                 if ((result.id.toString() === user.id.toString()) && (user.score !== '')) {
//                     user.score = result.score
//                 }
//             })
//         })
//     })
//     console.log(userData.data)
//     return await userData
// }
// accordionTesting()
