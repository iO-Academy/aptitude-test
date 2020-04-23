/**
 * convert a JSON object into form data suitable for passing to an API built for form data
 *
 * @param jsonInput the JSON object to be converted.
 *
 * @returns FormData form data object.
 */
function jsonToFormData(jsonInput) {
    let formData = new FormData();

    Object.keys(jsonInput).forEach(function(key) {
        let value = jsonInput[key];

        if (typeof value === 'object') {
            jsonInput[key] = JSON.stringify(value);
        }

        formData.append(key, jsonInput[key]);
    });

    return formData;
}
