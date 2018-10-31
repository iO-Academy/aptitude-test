/**
 * Add in isEmailValid from validateUserAdditions to validate edit email.
 * To make sure name and email fields aren't empty
 *
 * @return Will return false else will return true depending if the the filed is typed.
 */
function isEmpty (field) {
    if (field.value === "") {
        return false
    } else {
        return true
    }
}
/**
 * To make sure numbers or special characters aren't in the name field.
 *
 * @return Will return true if filed has been validated with correct characters else will return false.
 */
function nameValidation (field) {
    var regexLetters = /[A-Za-z]+$/
    if(field.match(regexLetters) ) {
        return true
    } else {
        return false
    }
}

