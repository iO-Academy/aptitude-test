let testForm = document.querySelector('#testForm');
let responseMsg = document.querySelector('#inputSubmissionConfirmation');

testForm.addEventListener('submit', async function(e) {
    e.preventDefault();

    const inputLength = document.querySelector('#testName').value.length;
    const testTimeMinutes = document.querySelector('#test_time_minutes').value;
    const testTimeSeconds = document.querySelector('#test_time_seconds').value;
    const totalTime = convertToTotalTimeSeconds(testTimeMinutes, testTimeSeconds);
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
        ajaxResponseCheck(response.success, response.message, responseMsg, true);

    } else if (inputLengthIsValid) {
        responseMsg.classList.remove('alert-success');
        responseMsg.classList.add('alert-danger');
        responseMsg.innerHTML = 'Test duration must be below an hour and minutes and seconds must be between 0 and 60.';
    } else {
        responseMsg.classList.remove('alert-success');
        responseMsg.classList.add('alert-danger');
        responseMsg.innerHTML = 'Test name must be between 1 and 255 characters.';
    }
});