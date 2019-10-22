let testForm = document.querySelector('#testForm')


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


