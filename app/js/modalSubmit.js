
var modal = document.getElementsByClassName("modal")

document.getElementById('editUserForm').addEventListener('submit', function() {
    isEmpty()
    nameValidation()
    isEmailValid()
    postUserEdit(createUserObject('.editUserData'))
    modal.style.display = "none"
    })

