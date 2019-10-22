let testForm = document.querySelector('#testForm')

testForm.addEventListener('click', function (e) {
    let inputLength = document.querySelector('#addTestName').value.length
    if (inputLength < 1 || inputLength > 255) {
        alert('Test name must be less than 250 characters')
    } 
    e.preventDefault()
})

testForm.addEventListener('submit', function(e) {
    e.preventDefault()

    if (document.querySelector('#testName').value.length > 0) {
        let testData = {}
        testData.name = testForm.testName.value
        testData = jsonToFormData(testData)
        const testPath = "test"
        sendData(testData, testPath)
    } else {
        document.getElementById('message-target').innerHTML = '<p class="failure-message">Error with test input. Please try again</p>'
    }
})