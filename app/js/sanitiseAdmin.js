

//add in isEmailValid from validateUserAdditions to validate edit email

//to make sure name and email fields arent empty
function isEmpty (field,event){
    if (field.value === "") {
        field.style.background = "red"
        event.preventDefault()
    }
}

//to make sure numbers arent in the name field
function nameValidation (field,event){
    if(isNaN(field.value) === false) {
        field.style.background = "red"
        event.preventDefault()
    }
}

