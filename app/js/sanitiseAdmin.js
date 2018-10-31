

//add in isEmailValid from validateUserAdditions to validate edit email

//to make sure name and email fields arent empty
function isEmpty (field) {
    if (field.value === "") {
        field.style.background = "red"
        return false
    } else {
        return true
    }
}

//to make sure numbers or special characters arent in the name field
function nameValidation (field) {
    var regexLetters = /^[A-Za-z]+$/
    if(field.match(regexLetters) ) {
        return true
    } else {
        return false
    }
}