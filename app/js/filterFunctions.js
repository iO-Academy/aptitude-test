document.getElementById('startDate').addEventListener("focusout", ()=>{
    var startDateInput = document.getElementById('startDate').value
    var startDate = '1970-01-01'
    var endDateInput = document.getElementById('endDate').value
    var endDate = '2099-12-31'
    if (startDateInput !== "") {
        startDate = startDateInput
    }
    if (endDateInput !== "") {
        endDate = endDateInput
    }
    if (startDate <= endDate) {
        searchAndFilter()
    } else {
        alert("Please enter a valid date range")
    }
})

document.getElementById('endDate').addEventListener("focusout", ()=>{
    var startDateInput = document.getElementById('startDate').value
    var startDate = '1970-01-01'
    var endDateInput = document.getElementById('endDate').value
    var endDate = '2099-12-31'
    if (startDateInput !== "") {
        startDate = startDateInput
    }
    if (endDateInput !== "") {
        endDate = endDateInput
    }
    if (startDate <= endDate) {
        searchAndFilter()
    } else {
        alert("Please enter a valid date range")
    }
})




