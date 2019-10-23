let testForm = document.querySelector('#testForm')

testForm.addEventListener('submit', async function(e) {
    e.preventDefault()
    let inputLength = document.querySelector('#testName').value.length
    if (inputLength > 0 && inputLength < 256) {
        let testData = {}
        testData.name = testForm.testName.value
        testData = jsonToFormData(testData)
        let response = await sendData(testData, 'test')
        document.querySelector('#inputSubmissionConfirmation').innerText = response.message
        if (response.success) {
            document.querySelector('#inputSubmissionConfirmation').className = 'alert-success'
            document.querySelector('#testName').value = ''
        } else {
            document.querySelector('#inputSubmissionConfirmation').className = 'alert-danger'
        }
    } else {
        document.querySelector('#inputSubmissionConfirmation').className = 'alert-danger'
        document.querySelector('#inputSubmissionConfirmation').innerHTML = 'Test name must be between 1 and 255 characters.'
    }
})
