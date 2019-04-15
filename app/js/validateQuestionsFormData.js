function isEmpty(value) {
    if (!value && value !== 0) {
        return true;
    } else {
        return false;
    }
}



document.querySelector('.add_question').addEventListener('submit', function(event) {
    event.preventDefault()
    let question = document.getElementById('question').value
    let answer1 = document.getElementById('answer1').value
    let answer2 = document.getElementById('answer2').value
    let answer3 = document.getElementById('answer3').value
    let answer4 = document.getElementById('answer4').value
    let answer5 = document.getElementById('answer5').value

    if (isEmpty(question)) {
        console.log(isEmpty(question))
    } else {
        console.log(isEmpty(question))
    }


})