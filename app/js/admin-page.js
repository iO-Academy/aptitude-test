
var clicked = 0

$('#drop-down').on('click', function() {
    $('#addNewUserForm').collapse('toggle')
    clicked++
    if (clicked%2 == 0 || clicked == 0) {
        document.querySelector('#drop-down').innerHTML ="Add New User <span>&#x2193;</span>"
    }
    else {
        document.querySelector('#drop-down').innerHTML = "Add New User <span>&#x2191;</span>"
    }
})
