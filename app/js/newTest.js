var submit = document.querySelector('.new-test-button')
var url = 'http://localhost:8080/test'

submit.addEventListener('click', function (e) {
    let inputLength = document.querySelector('#addTestName').value.length
    if (inputLength < 1 || inputLength > 255) {
        alert('Test name must be less than 250 characters')
    } 
    e.preventDefault()
})

async function postData(url, submit) {
    submit.addEventListener('click', async function (e) {
        e.preventDefault()
        var test_id = document.querySelector('#addTestName').value
        test_id = { "name": test_id }
        test_id = jsonToFormData(test_id)
        var response = await fetch(url, {
            method: 'POST',
            body: test_id
        })
        response = await response.json();
        document.querySelector('.successMsg').innerText = response.message
        if (response.success) {
            document.querySelector('.successMsg').style.color = "green"
        }   else {
            document.querySelector('.successMsg').style.color = "red"
        }
    });
}

postData(url, submit)