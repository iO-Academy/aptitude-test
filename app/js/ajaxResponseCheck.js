/**
 * Handles the response messages for Ajax Requests for success/fail
 * @param success the state of the AJAX response, success/fail
 * @param message a string of the AJAX response text
 * @param responseMsgLocation, where on the HTML page you want the response to be display
 * @param isTest, a true/false param of whether you are adding a new test or not
 */
function ajaxResponseCheck(success, message, responseMsgLocation, isTest = false) {
    responseMsgLocation.textContent = message;

    if (success) {
        responseMsgLocation.classList.add('alert-success');
        responseMsgLocation.classList.remove('alert-danger');
        if (isTest){
            populateTestDropdowns();
            document.querySelector('#testName').value = '';
        }
    } else {
        responseMsgLocation.classList.remove('alert-success');
        responseMsgLocation.classList.add('alert-danger');
    }
}