document.getElementById('btnQuestionDelete').addEventListener('click', ()=>{
    sendData( null, `question/${document.querySelector('#selectQuestionDelete').value}/delete`)
    //Populate drop down options on page load in 'add new user' and 'manage questions' sections
    populateDropDownsOnPageLoad()
})