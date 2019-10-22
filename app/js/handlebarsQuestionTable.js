/**
 * Function that will trigger a modal with the question that you selected clicking on edit button
 */

function addEditEventListeners() {
    let editButtons = document.querySelectorAll(".modalBtn")
    editButtons.forEach(function(editButton) {
        editButton.addEventListener('click', function (e) {
            openDialog()
        })
    })
}