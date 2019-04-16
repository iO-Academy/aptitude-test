// function isEmpty(value) {
//     if (!value) {
//         return true
//     } else {
//         return false;
//     }
// }

// var isArray = Array.isArray || function (value) {
//     return value && typeof value === 'object' ? toString.call(value) === '[object Array]' : false;
// }

document.querySelector('.add_question').addEventListener('submit', function(event) {
    event.preventDefault()

    let newQuestion = {
        "text": question,
        "option1": answer1,
        "option2": answer2,
        "option3": answer3,
        "option4": answer4,
        "option5": answer5,
        // "answer": answer
    }

    let answers = [answer1, answer2, answer3, answer4, answer5]

    question = document.getElementById('question').value
    answer1 = document.getElementById('answer1').value
    answer2 = document.getElementById('answer2').value
    answer3 = document.getElementById('answer3').value
    answer4 = document.getElementById('answer4').value
    answer5 = document.getElementById('answer5').value

    if (question.trim().length !==0) {
        newQuestion.text = question
        document.querySelector('#question-error').classList.add('hidden')
    } else {
        document.querySelector('#question-error').classList.remove('hidden')
    }

    if (answer1.trim().length !==0 && answer2.trim().length !==0) {
        newQuestion.option1 = answers[0].value
        newQuestion.option2 = answers[1].value
        document.querySelector('#answer1-error').classList.add('hidden')
        document.querySelector('#answer2-error').classList.add('hidden')
    } else if ((answer1.trim().length === 0) && (answer2.trim().length !==0)) {
        document.querySelector('#answer1-error').classList.remove('hidden')
        if (!document.querySelector('#answer2-error').classList.contains('hidden')) {
            document.querySelector('#answer2-error').classList.add('hidden')
        }
    } else if ((answer1.trim().length !==0) && (answer2.trim().length ===0)) {
        if (!document.querySelector('#answer1-error').classList.contains('hidden')) {
            document.querySelector('#answer1-error').classList.add('hidden')
        }
        document.querySelector('#answer2-error').classList.remove('hidden')
    } else {
        document.querySelector('#answer1-error').classList.remove('hidden')
        document.querySelector('#answer2-error').classList.remove('hidden')
    }
})