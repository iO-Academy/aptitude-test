/**
 * Add in isEmailValid from validateUserAdditions to validate edit email.
 * To make sure name and email fields aren't empty
 *
 * @param field is the input field being inspected
 *
 * @return Will return false else will return true depending if the the field is typed.
 */
function isEmpty (fieldValue: string) {
    if (fieldValue === "") {
        return false
    } else {
        return true
    }
}
/**
 * To make sure numbers or special characters aren't in the name field.
 * Doesn't allow entries longer than 255 characters
 * @param field is the input field being inspected
 *
 * @return Will return true if field has been validated with correct characters else will return false.
 */
function nameValidation (field: string) {
    var regexLetters = /[A-Za-z]+$/
    if (field.match(regexLetters) && field.length < 255 ) {
        return true
    } else {
        return false
    }
}

