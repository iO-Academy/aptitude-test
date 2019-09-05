let question = document.getElementById('questionField')
document.getElementById('submit').addEventListener('click',(event) => {
    event.preventDefault()
    console.log(question.value)
})