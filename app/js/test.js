var submit = document.querySelector('#btn')
var url = 'http://localhost:8080/test'

async function postData(url, submit) {
    submit.addEventListener('click', async function (e) {
        e.preventDefault()
        var test_id = document.querySelector('#test_id').value
        test_id = { "name": test_id }
        test_id = jsonToFormData(test_id)
        console.log(test_id);
        var response = await fetch(url, {
            method: 'POST',
            body: test_id
        })
        response = await response.json();
        return await response.json();
    });
}

postData(url, submit)