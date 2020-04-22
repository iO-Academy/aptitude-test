let testForm = document.querySelector('#testForm');
let responseMsg = document.querySelector('#inputSubmissionConfirmation');

testForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    let inputLength = document.querySelector('#testName').value.length;
    let testTimeMinutes = parseInt(document.querySelector('#test_time_minutes').value);
    let testTimeSeconds = parseInt(document.querySelector('#test_time_seconds').value);
    let totalTime = testTimeMinutes * 60 + testTimeSeconds;

    const inputLengthIsValid = inputLength > 0 && inputLength < 256;
    const inputTotalTimeIsValid = totalTime <= 3600 && totalTime >= 0;
    const inputMinutesIsValid = testTimeMinutes <= 60 && testTimeMinutes >= 0;
    const inputSecondsIsValid = testTimeSeconds < 60 && testTimeSeconds >= 0;

    if (inputLengthIsValid && inputTotalTimeIsValid && inputMinutesIsValid && inputSecondsIsValid) {
        let testData = {};

        testData.name = testForm.testName.value;
        testData.time = totalTime;
        testData = jsonToFormData(testData);

        let response = await sendData(testData, 'test');
        responseMsg.innerText = response.message;
        if (response.success) {
            responseMsg.classList.add('alert-success');
            responseMsg.classList.remove('alert-danger');
            document.querySelector('#testName').value = ''
        } else {
            responseMsg.classList.remove('alert-success');
            responseMsg.classList.add('alert-danger');
        }
    } else if (inputLength > 0 && inputLength < 256) {
        responseMsg.classList.remove('alert-success');
        responseMsg.classList.add('alert-danger');
        responseMsg.innerHTML = 'Test duration must be below an hour and minutes and seconds must be between 0 and 60.';
    } else {
        responseMsg.classList.remove('alert-success');
        responseMsg.classList.add('alert-danger');
        responseMsg.innerHTML = 'Test name must be between 1 and 255 characters.';
    }
});