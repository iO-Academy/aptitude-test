function getQuestionCount() {
    fetch("http://localhost:8080/question")
        .then(result => result.json())
        .then(data => {
            console.log(data)
            return data
        })
        .then(data => {
            console.log(data)
            console.log(data.data.length)
        })

}

getQuestionCount()