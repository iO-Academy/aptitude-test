document.getElementById('btnQuestionDelete').addEventListener('click', ()=>{
    sendData( null, `question/${document.querySelector('#selectQuestionDelete').value}/delete`)
})