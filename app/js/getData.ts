/**
 * Get data from API
 *
 * @param path specifying which data to get
 *
 * @returns {Promise<void>} returns a JavaScript Object containing data as request from the API
 */
async function getData(APIpath: string): Promise<any> {
    let data = await fetch(getBaseUrl() + APIpath);

    return await data.json();
}
