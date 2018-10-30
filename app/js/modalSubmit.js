function addEditModalSubmitEventListener() {
    document.getElementById('editSubmit').addEventListener('click', function() {
        let name = document.getElementById("firstName").value
        let email = document.getElementById("email").value

        if( isEmpty(name) &&
            isEmpty(email) &&
            nameValidation(name) &&
            isEmailValid(email)
            ){
            console.log('hi')
            closeDialog()
            // postUserEdit(createUserObject('.editUserData'))
        }
    })
}

