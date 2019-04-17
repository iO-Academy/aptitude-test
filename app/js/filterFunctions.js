
document.getElementById('filterScorePercentage').addEventListener('change', (e) => {
    updateScoreTable()
})

/**
 * checks the start and end date input and assigns a default value if no value set
 * checks the start date is earlier than the end date; if it is, runs AJAX request, if not error
 *
 * @returns run results function or alert to error
 */
document.getElementById('startDate').addEventListener("focusout", ()=>{
    let startDateInput = document.getElementById('startDate').value
    let startDate = '1970-01-01'
    let endDateInput = document.getElementById('endDate').value
    let endDate = '2099-12-31'
    if (startDateInput !== "") {
        startDate = startDateInput
    }
    if (endDateInput !== "") {
        endDate = endDateInput
    }
    if (startDate <= endDate) {
        updateScoreTable()
    } else {
        alert("Please enter a valid date range")
    }
})

/**
 * checks the start and end date input and assigns a default value if no value set
 * checks the start and end date is earlier than the end date; if it is, runs AJAX request, if not error
 *
 * @returns run results function or alert to error
 */
document.getElementById('endDate').addEventListener("focusout", ()=> {
    let startDateInput = document.getElementById('startDate').value
    let startDate = '1970-01-01'
    let endDateInput = document.getElementById('endDate').value
    let endDate = '2099-12-31'
    if (startDateInput !== "") {
        startDate = startDateInput
    }
    if (endDateInput !== "") {
        endDate = endDateInput
    }
    if (startDate <= endDate) {
        updateScoreTable()
    } else {
        alert("Please enter a valid date range")
    }
})


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


