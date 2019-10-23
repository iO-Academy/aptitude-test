let testForm = document.querySelector('#testForm')

testForm.addEventListener('submit', async function(e) {
    e.preventDefault()
    let inputLength = document.querySelector('#testName').value.length
    if (inputLength > 0 && inputLength < 256) {
        let testData = {}
        testData.name = testForm.testName.value
        testData = jsonToFormData(testData)
        let testPath = "test"
        let response = await sendData(testData, testPath)
        showConfirmationMessage(response)
        if (response.success) {
            document.querySelector('#message').className = 'success-message'
            document.querySelector('#testName').value = ''
        } else {
            document.querySelector('#message').className = 'failure-message'
        }
    } else {
        document.querySelector('#message').className = 'failure-message'
        document.querySelector('#message').innerHTML = 'Test name must be between 1 and 255 characters.'
    }
})
