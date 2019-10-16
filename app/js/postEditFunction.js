/**
 * Creates an object of the user from the data in the input fields.
 * Should be called within the submit event listener.
 *
 * @param inputClass is a string in the '.class' format, the class on each of the input fields of the edit user form.
 *
 * @return Returns an object that can be used as the parameter in postUserData() function.
 */
function createObjectForDatabase(inputClass) {
    let formData = document.querySelectorAll(inputClass)
    let canRetake = document.getElementById('canRetake')
    let result = {'canRetake': '0'}
    if (canRetake.checked) {
        result = {'canRetake': '1'}
    }
        formData.forEach(function (input) {
            result[input.name] = input.value
        })
        return result
    }


/**
 * Passes the object returned by createUserObject() and posts to the api as a json string.
 *
 * @param formData Is the object, use the returned result from createUserObject().
 *
 * @return object apiData stating posts success and whether user data has been updated.
 */
async function postUserEdit(formData) {
    let baseUrl = getBaseUrl()
    formData.time *= 60
    console.log(formData)

    if (formData.name && formData.email && formData.id && formData.time) {
        console.log('sending')
        let apiData = await fetch(baseUrl + 'user/edit', {
            method: 'post',
            body: jsonToFormData(formData)
        })
        apiData = await apiData.json()
        return apiData
    }
}