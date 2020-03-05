let testForm = document.querySelector('#testForm')
let responseMsg = document.querySelector('#inputSubmissionConfirmation')

testForm.addEventListener('submit', async function(e) {
    e.preventDefault()
    let inputLength = document.querySelector('#testName').value.length
    if (inputLength > 0 && inputLength < 256) {
        let testData = {}
        testData.name = testForm.testName.value
        testData = jsonToFormData(testData)
        let response = await sendData(testData, 'test')
        responseMsg.innerText = response.message
        if (response.success) {
            responseMsg.classList.add('alert-success')
            responseMsg.classList.remove('alert-danger')
            document.querySelector('#testName').value = ''
        } else {
            responseMsg.classList.remove('alert-success')
            responseMsg.classList.add('alert-danger')
        }
    } else {
        responseMsg.classList.remove('alert-success')
        responseMsg.classList.add('alert-danger')
        responseMsg.innerHTML = 'Test name must be between 1 and 255 characters.'
    }
    populateHandlebars('#selectTest', 'js/templates/testDropdown.hbs', 'test')
    populateHandlebars('#selectTestDelete', 'js/templates/testDropdown.hbs', 'test')
    populateHandlebars('#selectQuestion', 'js/templates/questionDropdown.hbs', 'question')
    populateHandlebars('#selectQuestionDelete', 'js/templates/questionDropdown.hbs', 'question')
})
