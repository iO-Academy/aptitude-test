document.querySelector('.new-test-button').addEventListener('click', function (x) {
        let inputLength = document.querySelector('#addTestName').value.length
        if (inputLength < 1 || inputLength > 255) {
            alert('Computer says no.')
        } else {
            alert('Computer says yes.')
        }

        x.preventDefault()
})