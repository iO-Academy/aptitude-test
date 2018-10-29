

//add in isEmailValid from validateUserAdditions to validate edit email

//to make sure name and email fields arent empty
function isEmpty (field,event){
    if (field.value === "") {
        field.style.background = "red"
        event.preventDefault()
    }
}

//to make sure numbers or special characters arent in the name field
function nameValidation (field,event){
    var regexLetters = /^[A-Za-z]+$/
    if(field.value.match(regexLetters) ){
    } else {
        field.style.background = "red"
        event.preventDefault()
    }
}