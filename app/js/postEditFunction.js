/*
    Creates an object of the user from the data in the input fields
    Should be called within the submit event listener

    @param a string in the '.class' format, the class on each of the input fields of the edit user form

    @return Returns an object that can be used as the parameter in postUserData() func.
 */

async function createUserObject(inputClass) {
    let formData = document.querySelectorAll(inputClass)
    let result = {}
    formData.forEach(function(input) {
        result[input.name] = input.value
    })
    return result
}

/*
    Posts edited user data to the API

    @param the formData is the object, use the returned result from createUserObject
 */

async function postUserEdit(formData) {
    if (formData.name && formData.email && formData.id) {
        await fetch('localhost:8080/user/edit', {
            method: 'POST',
            body: JSON.stringify(formData)
        })
    }
}