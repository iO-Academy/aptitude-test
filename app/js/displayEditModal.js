let editModal = document.getElementById('modal')

let modalButton = document.getElementById('modalBtn')

let closeTag = document.getElementsByClassName('close')[0]

let container = document.getElementsByClassName('container')[0]

modalButton.onclick = function () {
    editModal.style.display = "block";
    container.style.backgroundColor = '#808080'
    container.style.opacity = '0.5'

}

closeTag.onclick = function () {
    editModal.style.display = "none";
    container.style.backgroundColor = ''
    container.style.opacity = ''
}

Window.onclick = function() {
    editModal.style.display = "none";
    container.style.backgroundColor = ''
    container.style.opacity = ''
}