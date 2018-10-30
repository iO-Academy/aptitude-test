/*
    Creates an object of the user from the data in the input fields
    Should be called within the submit event listener

    @param a string in the '.class' format, the class on each of the input fields of the edit user form

    @return Returns an object that can be used as the parameter in postUserData() func.
 */

function createUserObject(inputClass) {
    let formData = document.querySelectorAll(inputClass)
    let result = {'canRetake':'0'}
    formData.forEach(function(input) {
        result[input.name] = input.value
    })
    return result
}

/*
    Passes the object returned by createUserObject() and posts to the api as a json string

    @param the formData is the object, use the returned result from createUserObject

    @return object apiData stating posts success and whether user data has been updated
 */

async function postUserEdit(formData) {
    if (formData.name && formData.email && formData.id) {
        let apiData = await fetch('http://localhost:8080/user/edit', {
            method: 'post',
            body: jsonToFormData(formData)
        })
        apiData = await apiData.json()
        return apiData
    }

}

document.getElementById('practiseForm').addEventListener('submit', function (e) {
    e.preventDefault()
    postUserEdit(createUserObject('.practise'))
})


