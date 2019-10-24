document.querySelector('#setDefaultTime').addEventListener('submit', function (event) {
        event.preventDefault()
        let defaultMinutesField = document.getElementById('defaultMinutes')
        let defaultSecondsField = document.getElementById('defaultSeconds')
        let errorField = document.getElementById('defaultTimeError')

        let defaultTimeIsValid = true

        if (defaultMinutesField.value <= 1 || defaultMinutesField.value == null || isNaN(defaultMinutesField.value) === true) {
            defaultTimeIsValid = false
            errorField.innerHTML = 'This is not a good number!'
        }
        if (defaultSecondsField.value < 0 || defaultSecondsField.value == null || isNaN(defaultSecondsField.value) === true) {
            defaultTimeIsValid = false
            errorField.innerHTML = 'This is not a good number!'
        }

        if (defaultTimeIsValid === true) {
            errorField.innerHTML = 'Default time set'
            let setDefaultTime = minsAndSecsToSecs(defaultMinutesField.value, defaultSecondsField.value)
            sendTimeDefault(setDefaultTime)
        }
        return setDefaultTime
    })