function populateUserDuration(testFieldValue = 1) {
    getTestDuration(testFieldValue).then((userDurationTotal) => {
        let userDurationMinutes = userDurationTotal / 60;
        let userDurationSeconds = userDurationTotal % 60;
        let userDurationMinutesField = document.querySelector('#user_time_minutes');
        let userDurationSecondsField = document.querySelector('#user_time_seconds');

        userDurationMinutesField.value = String(userDurationMinutes);
        userDurationSecondsField.value = String(userDurationSeconds).padStart(2,'0');
    });
}