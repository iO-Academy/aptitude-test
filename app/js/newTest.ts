let testForm = document.querySelector<HTMLFormElement>('#testForm');
let responseMsg = document.querySelector('#inputSubmissionConfirmation');

testForm.addEventListener('submit', async function(e) {
    e.preventDefault();

    const inputLength = document.querySelector<HTMLInputElement>('#testName').value.length;
    const testTimeMinutes = document.querySelector<HTMLInputElement>('#test_time_minutes').value;
    const testTimeSeconds = document.querySelector<HTMLInputElement>('#test_time_seconds').value;
    const totalTime = convertToTotalTimeSeconds(testTimeMinutes, testTimeSeconds);
    const inputLengthIsValid = inputLength > 0 && inputLength < 256;
    const inputTotalTimeIsValid = isTimeTotalValid(totalTime);
    const inputMinutesIsValid = isTimeMinutesValid(testTimeMinutes);
    const inputSecondsIsValid = isTimeSecondsValid(testTimeSeconds);

    if (inputLengthIsValid && inputTotalTimeIsValid && inputMinutesIsValid && inputSecondsIsValid) {

        let testInfo = {
            name: testForm.testName.value,
            time: totalTime
        };

        let testData = jsonToFormData(testInfo);

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