async function accordionTestTitles() {
    populateHandlebars(
        '.accordionContainer',
        'js/templates/accordionTest.hbs',
        'test')
}


async function accordionUsersByTest() {
    await accordionTestTitles()
    // await produceTable()
    let testData = await getData('test')
    let userInfo = await createUsersObject()

    userInfo.data.forEach(function (scoreData) {
        switch (true) {
            case scoreData.percentage > 97:
                scoreData.topGrade = true
                break
            case scoreData.percentage >= 70:
                scoreData.passingGrade = true
                break
            case scoreData.percentage === '0.00' || scoreData.percentage > 0:
                scoreData.fail = true
                break
            default:
                scoreData.notTakenYet = true
                break
        }
    })

    testData.data.forEach(test => {
        let usersByTest = {}
        userInfo.data.forEach(user => {
        if (user.test_id === test.id) {
            usersByTest[user.id] = user
        }
    })
        usersByTest = {data: usersByTest}
        populateAccordion(
            '.test-'+test.id,
            'js/templates/adminTable.hbs',
            usersByTest)
    })
}

accordionUsersByTest()