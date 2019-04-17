
// async function postQuestionsEdit (validateQuestionsFormData) {
async function postQuestionsEdit () {
    let obj = {
        text: 'how much does a chicken weigh?',
        option1: 'too much',
        option2: 'not enough',
        answer: 1
    }

    let json = JSON.stringify(obj)

    // if (validateQuestionsFormData.text && validateQuestionsFormData.option1 && validateQuestionsFormData.option2 && validateQuestionsFormData.answer) {
        await fetch('http://localhost:8080/question', {
            method: 'post',
            body: json
        }).then(response => {
            console.log(response)
    })
    // }
}