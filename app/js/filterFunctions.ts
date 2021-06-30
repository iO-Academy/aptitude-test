document.querySelector('#filterScorePercentage').addEventListener('change', () => {
    updateScoreTable()
})

document.querySelector('#testAllocated').addEventListener('change', () => {
    updateScoreTable()
})

document.querySelector('#categoryFilter').addEventListener('change', () => {
    updateScoreTable()
})


/**
 * checks the start and end date input on admin page and assigns a default value if no value set
 *
 * @returns array of start and end date
 */
function setDate() {
    let startDateInput = document.querySelector<HTMLInputElement>('#startDate').value
    let startDate = '1970-01-01'
    let endDateInput = document.querySelector<HTMLInputElement>('#endDate').value
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
        document.querySelector<HTMLInputElement>('#startDate').value = ''
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
        document.querySelector<HTMLInputElement>('#endDate').value = ''
    }
})

/**
 * filters the resultArray to display scores between two specified dates
 *
 * @param resultArray of scores
 *
 * @return newResultArray containing the filtered data
 */
function dateFilter(resultArray: Array<any>) {
    let dates = setDate()
    let filteredUsers = []
    resultArray.forEach(user => {
        user.results.every( result => {
            let dateCreated = result.dateCreated.slice(0,10)
            if (dateCreated >= dates[0] && dateCreated <= dates[1]) {
                filteredUsers.push(user)
                return false
            }
            return true
        })
    })
    return filteredUsers
}

/**
 * This function checks the score against the dropdown value and filters the result
 *
 * @param resultArray an array full of objects of testee's info and scores
 *
 * @returns will return the result based on the chosen percentage
 */
function percentageFilter(resultArray: Array<any>) {
    let filterScorePercentage = document.querySelector<HTMLInputElement>('#filterScorePercentage')
    let newResultArray =[]
    if (parseInt(filterScorePercentage.value) === 4){
        resultArray.forEach((data)=>{
            if(data.percentage >= 97){
                newResultArray.push(data)
            }
        })
    } else if (parseInt(filterScorePercentage.value) === 3){
        resultArray.forEach((data)=>{
            if((data.percentage >= 70) && (data.percentage < 97)){
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
function testAllocatedFilter(resultArray: Array<any>) {
    let filterTestAllocated = document.querySelector<HTMLInputElement>('#testAllocated');
    let chosenTestAllocated = filterTestAllocated.value;
    if (chosenTestAllocated) {
        return resultArray.filter((data) => {
            return data.testId === chosenTestAllocated;
        })
    }
    return resultArray;
}

/**
 * This function filters the list of users to be displayed in the table based on the category
 * allocated to that user
 *
 * @param {resultArray} Array array of users to be filtered
 *
 * @return Array the filtered array of users
 */
function categoryFilter(resultArray: Array<any>) {
    let filterCategory = document.querySelector<HTMLInputElement>('#categoryFilter');
    let chosenCategory = filterCategory.value;
    if (chosenCategory) {
        return resultArray.filter((data) => {
            return data.categoryId === chosenCategory;
        })
    }
    return resultArray
}