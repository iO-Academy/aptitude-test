
document.getElementById('filterScorePercentage').addEventListener('change', () => {
    updateScoreTable()
})

document.getElementById('testAllocated').addEventListener('change', () => {
    updateScoreTable()
})

/**
 * checks the start and end date input on admin page and assigns a default value if no value set
 *
 * @returns array of start and end date
 */
function setDate() {
    let startDateInput = document.getElementById('startDate').value
    let startDate = '1970-01-01'
    let endDateInput = document.getElementById('endDate').value
    let endDate = new Date().toISOString().slice(0,10)
    if (startDateInput !== "") {
        startDate = startDateInput
    }
    if (endDateInput !== "") {
        endDate = endDateInput
    }
    return [startDate, endDate]
}

/**
 * checks the start date is earlier than the end date; if it is, runs AJAX request, if not error
 *
 * @returns run results function or alert to error
 */
document.getElementById('startDate').addEventListener("change", ()=>{
    let dates = setDate()
    if (dates[0] <= dates[1]) {
        updateScoreTable()
    } else {
        alert("Please enter a valid date range")
        document.getElementById('startDate').value = ''
    }
})

/**
 * checks the start and end date is earlier than the end date; if it is, runs AJAX request, if not error
 *
 * @returns run results function or alert to error
 */
document.getElementById('endDate').addEventListener("change", ()=> {
    let dates = setDate()
    if (dates[0] <= dates[1]) {
        updateScoreTable()
    } else {
        alert("Please enter a valid date range")
        document.getElementById('endDate').value = ''
    }
})

/**
 * filters the resultArray to display scores between two specified dates
 *
 * @param resultArray of scores
 *
 * @return newResultArray containing the filtered data
 */
function dateFilter(resultArray) {
    let dates = setDate()
    let newResultArray = []
    resultArray.forEach(data => {
        let dateCreated = data.dateCreated.slice(0,10)
        if (dateCreated >= dates[0] && dateCreated <= dates[1]) {
            newResultArray.push(data)
        }
    })
    return newResultArray
}

/**
 * This function checks the score against the dropdown value and filters the result
 *
 * @param resultArray an array full of objects of testee's info and scores
 *
 * @returns will return the result based on the chosen percentage
 */
function percentageFilter (resultArray){
    let filterScorePercentage = document.getElementById('filterScorePercentage')
    let newResultArray =[]
    if (parseInt(filterScorePercentage.value) === 1){
        resultArray.forEach((data)=>{
            if(data.percentage >= 70){
                newResultArray.push(data)
            }
        })
    } else if (parseInt(filterScorePercentage.value) === 2){
        resultArray.forEach((data)=>{
            if(data.percentage < 70){
                newResultArray.push(data)
            }
        })
    } else {
        return resultArray
    }
    return newResultArray
}

/**
 * This function filters the list of users to be displayed in the table based on the test
 * allocated to that user
 * 
 * @param {resultArray} Array array of users to be filtered
 * 
 * @return Array the filtered array of users
 */
function testAllocatedFilter(resultArray) {
    let filterTestAllocated = document.getElementById('testAllocated')
    let newResultArray = resultArray
    let chosenTestAllocated = filterTestAllocated.value
    if (chosenTestAllocated) {
        newResultArray = []
        resultArray.forEach((data)=>{
            if(data.testAllocated == chosenTestAllocated) {
                newResultArray.push(data)
            }
        })
    }
    return newResultArray
}