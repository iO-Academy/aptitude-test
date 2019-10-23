
async function accordionTesting() {
    let testData = await getData('test')
    let userData = await getData('user')
    let resultData = await getData('result')

    testData.data.forEach(function (test) {
        userData.data.forEach(function (user) {
            user.testName = ''
            if (test.id === user.test_id) {
                user.testName = test.name
            }
        })
    })

    // console.log(resultData.data)
    // console.log(userData.data)

    //
    // resultData.data.map(function (result) {
    //     var resultID = result.id.toString()
    //     var resultScore = result.score
    //     userData.data.map(function (user) {
    //         // console.log(result)
    //         // console.log(user)
    //         user.score = ''
    //         if (resultID == user.id.toString()) {
    //             user.score = resultScore
    //         }
    //     })
    // })


    userData.data.forEach(function (user) {
        resultData.data.map(function (result) {
            if ((result.id.toString() === user.id.toString()) && (user.score !== '')) {
                user.score = result.score
            }
        })
    })

    console.log(userData.data)



    // console.log(userData.data)



    return await userData.data

}

accordionTesting()






    //     console.log(userData.data.test_id)
    //     if (test.id === userData.data.test_id) {
    //         userData.data.test_id = test.name
    //     }
    //
    // })

    // loop over each object in the userData.data array, replace the 'test_id' value with the test 'name', IF user.'test_id' === test.'id'




    // console.log(testData.data)
    // console.log(userData.data)


    // userData = userData.data

    // console.log( (({ id, name, test_id }) => ({ id, name, test_id }))(userData[0]))


    // console.log(testData.test_id === '2')
    // console.log(testData.filter(testData.test_id === '2'))


    // console.log(testData)
    // console.log(userData)
    // console.log(resultData)

