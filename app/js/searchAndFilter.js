
/**
 * takes an array of objects- reduces the number of objects in the array based on search criteria, date criteria,
 * and score functions. The final array of results is then put into an object so it can be passed to the handlebars
 * function and output to the front-end.
 *
 * @param HBTemplate the handlebars template
 * @param resultArray an array full of objects of testee's info and scores
 */
function searchAndFilter(HBTemplate, resultArray) {
    resultArray = searchByTextAndEmail(resultArray)
    resultArray = score(resultArray)
    printFilteredResultsToScreen(HBTemplate, resultArray)
}