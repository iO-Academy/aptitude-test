
/**
 * gets the value of a given cookie by name
 *
 * @param name string
 * @return String the value of the cookie
 */

function getCookie(name: string) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");

    if (parts.length == 2) {
        const value = parts.pop().split(";").shift();
        if (value == 'expired') {
            return false
        }
        return value
    }
    return false
}
