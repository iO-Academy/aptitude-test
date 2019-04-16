var startDate = document.querySelector('.startDate')
var endDate = document.querySelector('.endDate')

startDate.addEventListener("focusout", ()=>{
    if (startDate.value <= endDate.value) {
        searchAndFilter()
    } else {
        alert("Please enter a valid date range")
    }
})

endDate.addEventListener("focusout", ()=>{
    if (endDate.value >= startDate.value) {
        searchAndFilter()
    } else {
        alert("Please enter a valid date range")
    }
})




