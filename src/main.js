/**
 * @typedef {Object} RequestError
 * @property {string} id
 * @property {string} message
 */

/**
 * @typedef {Object} AuthData Data used for authentication
 * @property {string} username Username of the user
 * @property {string} token Token of the user
 */

/**
 * @typedef {Object} Entry
 * @property {Object.<string, string | number | boolean>} data Data of the entry
 * @property {Object} metadata
 * @property {number} metadata.date Date of the document, millis
 * @property {string} metadata.duid Unique identifier of the entry
 * @property {string | undefined} metadata.page Page reported by the user
 * @property {string | undefined} metadata.uid Uid of the user
 */

/**
 * @param {string} request_hostname
 * @param {Entry} entry
 * @return {Promise<RequestError | undefined>}
 */
export async function submitEntry(request_hostname, entry) {
    const request_url_object = new URL(request_hostname)
    request_url_object.pathname += "api/submit"

    const response = await fetch(request_url_object.href, {
        method: "POST",
        headers: {
            "Accept": "*/*",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(entry),
    })

    if (!response.ok) {
        return await response.json()
    }
}

/**
 * @param {string} request_hostname
 * @param {AuthData} auth_data
 * @return {Promise<RequestError | Entry[]>}
 */
export async function retrieveAllEntries(request_hostname, auth_data) {
    const request_url_object = new URL(request_hostname)
    request_url_object.pathname += "api/retrieve"

    const response = await fetch(request_url_object.href, {
        method: "POST",
        headers: {
            "Accept": "*/*",
            "Content-Type": "application/json",
            "Authorization": generateAuthorizationHeader(auth_data),
        },
        body: JSON.stringify({
            from: 0,
            to: -1,
        }),
    })

    return await response.json()
}

/**
 * @param {string} request_hostname
 * @param {AuthData} auth_data
 * @param {string} entry_duid
 * @return {Promise<RequestError | Entry[]>}
 */
export async function deleteEntry(request_hostname, auth_data, entry_duid) {
    const request_url_object = new URL(request_hostname)
    request_url_object.pathname += "api/delete"

    const response = await fetch(request_url_object.href, {
        method: "POST",
        headers: {
            "Accept": "*/*",
            "Content-Type": "application/json",
            "Authorization": generateAuthorizationHeader(auth_data),
        },
        body: JSON.stringify({
            duid: entry_duid,
        }),
    })

    return await response.json()
}

/**
 * @param {AuthData} auth_data
 * @return {string}
 */
function generateAuthorizationHeader(auth_data) {
    return `User ${auth_data.username}:${auth_data.token}`
}
