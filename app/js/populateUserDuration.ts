/**
 * checks if test_option is same as the test selected and then populates user duration
 * @param test_option the test_option to check against
 * @param testFieldValue the test selected
 */
function populateUserDuration(test_option: HTMLInputElement, testFieldValue: string) {
        if (test_option.value === testFieldValue) {
            const test_duration: number = parseInt(test_option.dataset.time);
            let userDurationMinutes = Math.floor(test_duration / 60);
            let userDurationSeconds = test_duration % 60;
            let userDurationMinutesField = document.querySelector<HTMLInputElement>('#user_time_minutes');
            let userDurationSecondsField = document.querySelector<HTMLInputElement>('#user_time_seconds');

            userDurationMinutesField.value = (String(userDurationMinutes) as any).padStart(2,'0');
            userDurationSecondsField.value = (String(userDurationSeconds) as any).padStart(2,'0');
        }
}