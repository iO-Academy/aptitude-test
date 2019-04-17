
// async function postQuestionsEdit (validateQuestionsFormData) {
async function postQuestionsEdit (obj) {
    let json = jsonToFormData(obj)

    await fetch('http://localhost:8080/question', {
        method: 'post',
        body: json
    }).then(response => {
        return response.json()
    }).then (response => {
        var responseBox = document.querySelector("#response")
        if (response.success){
            responseBox.textContent = response.message
            responseBox.classList.remove("alert-danger")
            responseBox.classList.add("alert-success")
        } else {
            responseBox.textContent = "unexpected error, please try again"
            responseBox.classList.add("alert-danger")
        }
    }).catch(error => {
        responseBox.textContent = "unexpected error, please try again"
        responseBox.classList.remove("alert-success")
        responseBox.classList.add("alert-danger")
    })
}