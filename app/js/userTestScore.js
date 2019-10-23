
async function accordionTesting() {
    let testData = await getData('test')
    let userData = await getData('user')
    let resultData = await getData('result')

    // create accordion of tests

    populateHandlebars(
        '.accordionContainer',
        'js/templates/accordionTest.hbs',
        'test')

    // append scores onto users

    let users = {}

    userData.data.forEach(user => {
        users[user.id] = user
    })

    resultData.data.forEach(result => {
        users[result.id].score = result.score
    })

    console.log(users)

    // loop over users and assign to correct accordion in the dom
    // to do

    // console.log(testData.data)


    testData.data.forEach(test => {
        console.log(test.id)

        users[0].id === test.id
        users[1].id === test.id
        users[2].id === test.id


        populateAccordion('test-' + test.id, 'js/templates/adminTable.hbs', )


    })

    return await userData
}
accordionTesting()
