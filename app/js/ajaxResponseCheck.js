
function ajaxResponseCheck(success, message, responseMsgLocation, isTest = false) {
    responseMsgLocation.textContent = message;

    if (success) {
        responseMsgLocation.classList.add('alert-success');
        responseMsgLocation.classList.remove('alert-danger');
        if (isTest){
            document.querySelector('#testName').value = '';
        }
    } else {
        responseMsgLocation.classList.remove('alert-success');
        responseMsgLocation.classList.add('alert-danger');
    }
}