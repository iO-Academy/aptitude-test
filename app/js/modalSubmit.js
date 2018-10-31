/**
 * this is an event listener on the submit button (listens for click), it sends the object values through our validation functions.
 * If all are returned as true, then modal closes, the data is stored in the database and the table on the frontend is updated.
 *
 */

function addEditModalSubmitEventListener() {
    document.getElementById('editSubmit').addEventListener('click', function() {
        let name = document.getElementById('firstName').value
        let email = document.getElementById('email').value

        if( isEmpty(name) &&
            isEmpty(email) &&
            nameValidation(name) &&
            isEmailValid(email)
            ){
            closeDialog()
            postUserEdit(createUserObject('.editUserData'))
            updateUserTable()
        }
    })
}

