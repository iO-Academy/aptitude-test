/**
 *  check if the e-mail exist in the DB and return the id of the e-mail we are checking
 *
 * @param userEmail  - The email address we want to check for
 *
 * @return a promise with the user object requested
 */
async function getUser(userEmail) {
    let apiData = await fetch(
        'http://localhost:8080/user?email=' + userEmail,
        {method: 'get'}
    )
    apiData = await apiData.json()
    return apiData
}

/**
 *
 * check if the user took the test before
 *
 * @param userId - is the id of the e-mail who is currently checked
 *
 * @return Promise containing data on whether the test has been taken before
 */
async function checkIfTestIsTaken(userId) {
    let idData = await fetch(
        'http://localhost:8080/result?id=' + userId,
        {method: 'get'}
    )
    idData = await idData.json()
    return idData
}

/**
 *this redirects admins and users to correct pages.
 *
 * @param user - checks to see status , user or admin.
 *
 */
function redirectUser(user) {
    if (user.isAdmin == "1") {
        window.location.replace("adminPage.html")
    } else {
        window.location.replace("questionPage.html")
    }
}

if (document.querySelector('#logInForm')) {
    document.querySelector('#logInForm').addEventListener('submit', function(e) {
        e.preventDefault()
        let email = document.getElementById('email')

        getUser(email.value).then(function(user) {
            if(user.success && user.data.id) {
                let retakeValue = user.data.canRetake
                checkIfTestIsTaken(user.data.id).then(function(idData) {
                    if (idData.success && retakeValue != 1) {
                        email.insertAdjacentHTML('afterend', '<p>The test cannot be done twice</p>')
                    } else {
                        document.cookie = "uid=" + user.data.id
                        document.cookie = "userEmail=" + user.data.email
                        redirectUser(user.data)
                    }
                })
            } else {
                document.querySelector('.invalidLogin').innerHTML = 'Please provide valid email'
            }
        })
    })
}

/**
 *  indicate whether the user is authorised to see question page or admin page
 *
 * @param user - the user seeking access
 * @param needsAdmin default null - set to non-null to check for admin rather than non-admin
 *
 * @return boolean - true if authorised and admin/non-admin respectively
 */
function isAuthorised(user, needsAdmin = null) {
    if (
        (user.isAdmin != 0 && needsAdmin != null) ||
        (user.isAdmin == 0 && needsAdmin == null)
    ) {
        return true
    }
    return false
}

/**
 * gets the value of a given cookie by name
 *
 * @param String name the name of the cookie
 *
 * @return String the value of the cookie
 */
function getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();
}