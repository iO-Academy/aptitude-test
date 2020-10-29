/**
 * asynchronously fetches handlebars templates
 *
 * @param path of the template in use
 *
 * @returns the template as text inside a promise
 */
async function getTemplateAjax(path: string) {
    let response = await fetch(
        path,
        {method: 'get'}
    )

    return response.text()
}

