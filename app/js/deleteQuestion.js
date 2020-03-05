document.getElementById('btnQuestionDelete').addEventListener('click', ()=>{
    sendData( null, `question/${document.querySelector('#selectQuestionDelete').value}/delete`)
    //Populate drop down options again following deletion of a question (triggers a fetch to API again)
    populateDropDowns()
})