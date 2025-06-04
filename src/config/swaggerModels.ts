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
 * @property {string} image - Group image
 * @property {string} createdAt - Created timestamp
 * @property {string} updatedAt - Updated timestamp
 */

/**
 * A CreateGroup
 * @typedef {object} CreateGroup
 * @property {string} name.required - Group name
 * @property {string} image - Group image
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
 * An UpdatedEvent
 * @typedef {object} UpdatedEvent
 * @property {string} title.required - Title
 * @property {string} description.required - Description
 * @property {string} start.required - Start time
 * @property {string} end.required - End time
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

/**
 * User Preferences
 * @typedef {object} UserPreferences
 * @property {string} city - The prefered city
 * @property {string} app - The prefered application
 * @property {string} theme - The prefered theme
 */

/**
 * Invitation
 * @typedef {object} Invitation
 * @property {number} id - The invitation id
 * @property {UserDTO} invitedBy - The user who invited
 * @property {UserDTO} invitee - The user who is invited
 * @property {Group} invitedFor - The group the user is invited for
 */

/**
 * Created Task
 * @typedef {object} CreatedTask
 * @property {number} id - The task id
 * @property {string} title - The task title
 * @property {string} description - The task description
 * @property {string} dueDate - The due date
 * @property {number} userId - The user id
 * @property {string} updatedAt - The updated timestamp
 * @property {string} createdAt - The created timestamp
 */

/**
 * Task
 * @typedef {object} Task
 * @property {string} title.required - The task title
 * @property {string} description.required - The task description
 * @property {string} dueDate - The due date
 */

/** UserToInvite
 * @typedef {object} UserToInvite
 * @property {string} email.required - The email of the user to invite
 */
