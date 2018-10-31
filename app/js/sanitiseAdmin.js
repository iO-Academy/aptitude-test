/**
 * Add in isEmailValid from validateUserAdditions to validate edit email.
 * To make sure name and email fields aren't empty
 *
 * @param field is the input field being inspected
 *
 * @return Will return false else will return true depending if the the field is typed.
 */
function isEmpty (field) {
    if (field.value === "") {
        field.style.background = "red"
        return false
    } else {
        return true
    }
}
/**
 * To make sure numbers or special characters aren't in the name field.
 *
 * @param field is the input field being inspected
 *
 * @return Will return true if field has been validated with correct characters else will return false.
 */
function nameValidation (field) {
    var regexLetters = /[A-Za-z]+$/
    if (field.match(regexLetters) ) {
        return true
    } else {
        return false
    }
}