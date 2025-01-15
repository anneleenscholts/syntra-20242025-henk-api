/**
 * A User
 * @typedef {object} User
 * @property {string} email.required - Email
 * @property {string} password.required - Password
 */

/**
 * A User
 * @typedef {object} RegisterUser
 * @property {string} username.required - Username
 * @property {string} firstName - First name
 * @property {string} lastName - Last name
 * @property {string} defaultLanguage - Default language
 * @property {string} email.required - Email
 * @property {string} password.required - Password
 */

/**
 * A User
 * @typedef {object} UserDTO
 * @property {string} username.required - Username
 * @property {string} firstName.optional - First name
 * @property {string} lastName.optional - Last name
 * @property {string} defaultLanguage.optional - Default language - enum:en,nl - default:en
 * @property {string} email.required - Email
 */

/**
 * An Event
 * @typedef {object} Event
 * @property {string} title.required - Title
 * @property {string} groupId.optional - Group id - if omitted, will be created in the default group
 * @property {string} description.required - Description
 * @property {string} start.required - Start time
 * @property {string} end.required - End time
 */

/**
 * A CreatedEvent
 * @typedef {object} CreatedEvent
 * @property {string} title.required - Title
 * @property {string} groupId.optional - Group id - if omitted, will be created in the default group
 * @property {string} description.required - Description
 * @property {string} start.required - Start time
 * @property {string} end.required - End time
 * @property {string} organizer.required - The organizer / creator of the event
 */
