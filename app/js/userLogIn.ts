/**
 *  check if the e-mail exist in the DB and return the id of the e-mail we are checking
 *
 * @param userEmail  - The email address we want to check for
 *
 * @return a promise with the user object requested
 */
import {BaseUser} from "./interfaces/User";

async function getUser(userEmail: string|false) {
    let baseUrl = getBaseUrl()
    let apiData = await fetch(
        baseUrl + 'user?email=' + userEmail,
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
async function checkIfTestIsTaken(userId: number) {
    let baseUrl = getBaseUrl()
    let idData = await fetch(
        baseUrl +'result?uid=' + userId,
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
function redirectUser(user: BaseUser) {
    if (user.isAdmin == "1") {
        window.location.replace("adminPage.html")
    } else {
        window.location.replace("questionPage.html")
    }
}

/**
 *this redirects admins to the admin page
 *
 * @param user - checks to see status , user or admin.
 *
 */
function redirectAdmin(user: BaseUser) {
    if (user.isAdmin == "1") {
        document.cookie = "userEmail=" + user.email
        window.location.replace("adminPage.html")
    }
}

/**
 * this updates user's canRetake value to 0 to prevent multiple accesses to test
 * canRetake is a boolean stored as a tinyInt
 *
 * @param user
 */
async function preventRetake(user: BaseUser) {
    let baseUrl: string = getBaseUrl()
    user.data.canRetake = 0

    await fetch(baseUrl + 'user/edit', {
        method: "post",
        body: jsonToFormData(user.data)
    })
}

if (document.querySelector('#logInForm')) {
    document.querySelector('#logInForm').addEventListener('submit', function(e) {
        e.preventDefault()
        let email = document.querySelector<HTMLInputElement>('#email')

        getUser(email.value).then(function(user: any) {
            if(user.success && user.data.id) {
                let retakeValue = user.data.canRetake
                redirectAdmin(user.data)
                checkIfTestIsTaken(user.data.id).then(function(idData: any) {
                    if (idData.success && retakeValue == 0) {
                        document.querySelector('.invalidLogin').textContent = 'You cannot take the test twice'
                    } else {
                        document.cookie = "uid=" + user.data.id
                        document.cookie = "userEmail=" + user.data.email
                        document.cookie = "userTime=" + user.data.time
                        const dateStarted = Date.now()
                        document.cookie = "dateStamp=" + dateStarted.toString()
                        redirectUser(user.data)
                    }
                })
            } else {
                document.querySelector('.invalidLogin').textContent = 'Please provide valid email'
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
function isAuthorised(user: BaseUser, needsAdmin: boolean|null = null) {
    return (user.isAdmin != 0 && needsAdmin != null) || (user.isAdmin == 0 && needsAdmin == null);
}