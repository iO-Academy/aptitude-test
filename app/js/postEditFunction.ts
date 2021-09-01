import {BaseUser} from "./interfaces/User";

/**
 * Creates an object of the user from the data in the input fields.
 * Should be called within the submit event listener.
 *
 * @param inputClass is a string in the '.class' format, the class on each of the input fields of the edit user form.
 *
 * @return Returns an object that can be used as the parameter in postUserData() function.
 */
function createObjectForDatabase(inputClass: string) {
    let formData = document.querySelectorAll(inputClass);
    let result = {
        'canRetake': (document.querySelector<HTMLInputElement>('#canRetake').checked ? 1 : 0),
        'showTimer': (document.querySelector<HTMLInputElement>('#showTimer').checked ? 1 : 0)}
    formData.forEach(function (input: HTMLInputElement) {
        if (input.name === 'showTimer'){
            if (input.value === 'on'){
                result[input.name] = 1;
            }
            else {
                result[input.name] = 0;
            }
        } else{
            result[input.name] = input.value;
        }
    });
    return result
}


/**
 * Passes the object returned by createUserObject() and posts to the api as a json string.
 *
 * @param formData Is the object, use the returned result from createUserObject().
 *
 * @return object apiData stating posts success and whether user data has been updated.
 */
async function postUserEdit(formData: BaseUser) {
    let baseUrl = getBaseUrl();

    if (formData.name && formData.email && formData.id && formData.time) {
        let apiData = await fetch(baseUrl + 'user/edit', {
            method: 'post',
            body: jsonToFormData(formData)
        });
        apiData = await apiData.json();
        return apiData
    }
}