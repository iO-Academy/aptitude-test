
/**
 * takes an array of objects- reduces the number of objects in the array based on search criteria, date criteria,
 * and score functions. The final array of results is then put into an object so it can be passed to the handlebars
 * function and output to the front-end.
 *
 * @param {HBTemplate} function the handlebars template
 * @param {resultArray} Array an array full of objects of testee's info and scores
 */
function searchAndFilter(HBTemplate, resultArray) {
    resultArray = searchByTextAndEmail(resultArray)
    resultArray = percentageFilter(resultArray)
    resultArray = dateFilter(resultArray)
    resultArray = testAllocatedFilter(resultArray)
    printFilteredResultsToScreen(HBTemplate, resultArray)
}

/**
 * Similar to the above function, but returns resultArray instead of printing to the frontend
 * Used when generating the graph of test results
 * 
 * @param {resultArray} Array an array containing the test results of all the users
 * 
 * @return Array a filtered array containing test results of users matching active filters
 */
function filterForGraph(resultArray) {
    resultArray = searchByTextAndEmail(resultArray)
    resultArray = percentageFilter(resultArray)
    resultArray = dateFilter(resultArray)
    resultArray = testAllocatedFilter(resultArray)

    return resultArray
    
}

