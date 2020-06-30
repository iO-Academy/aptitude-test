
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

    if (parts.length == 2) {
        return parts.pop().split(";").shift();
    }
    return false
}
