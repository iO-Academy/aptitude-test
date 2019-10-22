let testForm = document.querySelector('#testForm')

testForm.addEventListener('submit', function(e) {
    e.preventDefault()
    let inputLength = document.querySelector('#testName').value.length
    if (inputLength > 0 && inputLengthk < 256) {
        let testData = {}
        testData.name = testForm.testName.value
        testData = jsonToFormData(testData)
        const testPath = "test"
        sendData(testData, testPath)
    } else {
        document.getElementById('message-target').innerHTML = '<p class="failure-message">Test name must be between 1 and 255 characters</p>'
    }
})
