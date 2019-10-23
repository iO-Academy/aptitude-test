document.querySelector('#setDefaultTime').addEventListener('submit', function (event) {
        event.preventDefault()
        var defaultMinutesField = document.getElementById('defaultMinutes')
        var defaultSecondsField = document.getElementById('defaultSeconds')
        var errorField = document.getElementById('defaultTimeError')

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
            errorField.innerHTML = ''
            var setDefaultTime = minsAndSecsToSecs(defaultMinutesField.value, defaultSecondsField.value)
        }
        return setDefaultTime
    })