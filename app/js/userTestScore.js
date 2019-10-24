/**
 * The below function will loop through the tests API, and produce an accordion
 * for each test. 
 */

async function accordionTestTitles() {
    populateHandlebars(
        '.accordionContainer',
        'js/templates/accordionTest.hbs',
        'test')
}

/**
 * The below function will call the above function, and then loop through each
 * piece of user info, and push each user to an array which is delineated by
 * their test_id. 
 * 
 * This function will then populate the test accordions according to the user's 
 * test_id, and display user information.
 */

async function accordionUsersByTest() {

    await accordionTestTitles()
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

    displayUsersByTest(userInfo.data, testData.data)

}

function displayUsersByTest(users, tests) {

    tests.forEach(test => {
        let usersByTest = {}
        users.forEach(user => {
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




