// async function accordionTesting() {
//     let testData = await getData('test')
//     let userData = await getData('user')
//     let resultData = await getData('result')

//     testData.data.forEach(function (test) {
//         userData.data.map(function (user) {
//             testList = []
//             if ((test.id === user.test_id) && (user.testName !== '')) {
//             testList[test.name] = user.name
//             }
//             resultData.data.map(function (result) {
//                 if ((result.id.toString() === user.id.toString()) && (user.score !== '')) {
//                     // testList['score'] += result.score
//                 }
//             })
//             console.log(testList)
//         })
//     })
//     return await userData
// }
// accordionTesting()


async function accordionTesting() {
    let testData = await getData('test')
    let userData = await getData('user')
    let resultData = await getData('result')

    let tests = {}
    let users = {}

    userData.data.forEach(user => {
        users[user.id] = user
    })

    resultData.data.forEach(result => {
        users[result.id].score = result.score
    })

    testData.data.forEach(test => {
        tests[test.id] = {name: test.name, users: []}

        // create accordians
        // for (var userId in users) {
        //     let user = users[userId]
        //     if (user.test_id == test.id) {
        //         tests[test.id].users.push(user)
        //     }
        // }

    })

    // loop users and assign to correct accordion in the dom

    console.log(tests)


    // testData.data.forEach(function (test) {
    //     userData.data.forEach(function (user) {
    //         if ((test.id === user.test_id) && (user.testName !== '')) {
    //             user.testName = test.name
    //         }
    //         resultData.data.map(function (result) {
    //             if ((result.id.toString() === user.id.toString()) && (user.score !== '')) {
    //                 user.score = result.score
    //             }
    //         })
    //     })
    // })
    // console.log(userData.data)
    return await userData
}
accordionTesting()
