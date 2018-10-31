
/**
 * Opens the modal dialog box.
 */
function openDialog() {
    document.querySelector('#modal').style.display = 'block'
    document.querySelector('.overlay').style.display = 'block'
}

/**
 * Closes the modal dialog box.
 */
function closeDialog() {
    document.querySelector('#modal').style.display = 'none'
    document.querySelector('.overlay').style.display = 'none'
}