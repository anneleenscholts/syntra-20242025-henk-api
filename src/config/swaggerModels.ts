/**
 * A User
 * @typedef {object} User
 * @property {string} email.required - Email
 * @property {string} password.required - Password
 */

/**
 * A Group
 * @typedef {object} Group
 * @property {string} id - Group id
 * @property {string} name - Group name
 * @property {string} createdAt - Created timestamp
 * @property {string} updatedAt - Updated timestamp
 */

/**
 * A CreateGroup
 * @typedef {object} CreateGroup
 * @property {string} name.required - Group name
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

/**
 * Register response
 * @typedef {object} RegisterResponse
 * @property {string} message - Status message
 * @property {UserDTO} user - Registered user
 */

/**
 * Login response
 * @typedef {object} LoginResponse
 * @property {string} message - Status message
 * @property {string} token - Access token
 */
