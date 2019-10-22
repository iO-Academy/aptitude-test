var submit = document.querySelector('#btn')
var url = 'http://localhost:8080/test'

postData(url, submit)

async function postData(url, submit) {
    submit.addEventListener('click', async function (e) {
        e.preventDefault()
        var testName = document.querySelector('#testName').value
        testName = { "name": testName }
        testName = jsonToFormData(testName)
        var response = await fetch(url, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: testName
        })
        response = await response.json();
        return await response.json();
    });
}