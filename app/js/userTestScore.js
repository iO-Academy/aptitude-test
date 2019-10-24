async function accordionTesting1() {
    let testData = await getData('test')
    // let userData = await getData('user')
    // let resultData = await getData('result')

    populateHandlebars(
        '.accordionContainer',
        'js/templates/accordionTest.hbs',
        'test')

    // create accordion of tests

    // await populateHandlebars(
    //     '.accordionContainer',
    //     'js/templates/accordionTest.hbs',
    //     'test')

    // append scores onto users

    // let userInfo = await createUsersObject()

    // console.log(userInfo)
    //

}

async function accordionTesting2() {
    await accordionTesting1()
    // let resultData = await getData('result')
    let userInfo = await createUsersObject()
    populateAccordion(
        '.test-1',
        'js/templates/adminTable.hbs',
        userInfo)



}
accordionTesting2()











//
// async function accordionTesting1() {
//     let testData = await getData('test')
//     let userData = await getData('user')
//     let resultData = await getData('result')
//
//     // create accordion of tests
//
//     // await populateHandlebars(
//     //     '.accordionContainer',
//     //     'js/templates/accordionTest.hbs',
//     //     'test')
//
//     // append scores onto users
//
//     let userInfo = await createUsersObject()
//
//     // console.log(userInfo)
//     //
//     populateAccordion(
//         '.test-1',
//         'js/templates/adminTable.hbs',
//         userInfo)
//
// }
// accordionTesting()
