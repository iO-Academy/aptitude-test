
document.getElementById('filterScorePercentage').addEventListener('change', () => {
    updateScoreTable()
})

let startDateInput = document.getElementById('startDate').value
let startDate = '1970-01-01'
let endDateInput = document.getElementById('endDate').value
let endDate = '2099-12-31'

/**
 * checks the start and end date input and assigns a default value if no value set
 * checks the start date is earlier than the end date; if it is, runs AJAX request, if not error
 *
 * @returns run results function or alert to error
 */
document.getElementById('startDate').addEventListener("focusout", ()=>{

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
