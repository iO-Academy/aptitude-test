let form = document.querySelector('form')
document.getElementById('submit').addEventListener('click',(event) => {
    event.preventDefault()
    console.log(form.questionField.value)
})