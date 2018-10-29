// get the user object from the input in the modal
// sending the data to the api

//


function postUserEdit(data) {
    let editedUser = fetch('localhost:8080/user/edit', {
        method: 'POST',
        body: JSON.stringify(new editedUser(document.getElementById('editUserForm').value))
    })
}