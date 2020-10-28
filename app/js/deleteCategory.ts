/**
 * deletes category from database
 * @param {number} category id
 * @returns {Promise<*>} response from api
 */
async function deleteCategory(id: number) {
    return sendData(undefined, `/category/delete/${id}`);
}

