/**
 * Throw not found exception
 * @param item
 */
export const throwNotFound = ({
  item = "Item",
  custom_key,
  message,
  recovery,
  message_presets,
}) => {
  const custom_message = message || `${item} not found`;
  const err = new Error(custom_message);
  err.name = "NotFound";
  err.custom_key = custom_key;
  err.recovery = recovery;
  err.message_presets = message_presets;
  throw err;
};

/**
 * Throw conflict exception
 * @param message
 */
export const throwConflict = ({
  message = "Conflict",
  custom_key,
  recovery,
  message_presets,
}) => {
  const err = new Error(message);
  err.name = "Conflict";
  err.custom_key = custom_key;
  err.recovery = recovery;
  err.message_presets = message_presets;
  throw err;
};

/**
 * Throw precondition failed  exception
 * @param message
 */
export const throwPreconditionFailed = ({
  message = "Precondition failed",
  custom_key,
  recovery,
  message_presets,
  difference,
}) => {
  const err = new Error(message);
  err.name = "PreconditionFailed";
  err.custom_key = custom_key;
  err.recovery = recovery;
  err.message_presets = message_presets;
  err.difference = difference;
  throw err;
};

/**
 * Throw custom validation error in Joi error format
 * @param message
 * @param field_name
 */
export const throwCustomValidationError = ({
  message = "Validation Error",
  custom_key,
  fields,
  recovery,
  message_presets,
}) => {
  const err = new Error(message);
  err.name = "CustomValidationError";
  err.custom_key = custom_key;
  err.recovery = recovery;
  err.message_presets = message_presets;
  err.fields = fields;
  throw err;
};

/**
 * Throw forbidden error
 * @param {message} message
 */
export const throwForbiddenError = ({
  message = "Forbidden",
  custom_key,
  recovery,
  message_presets,
}) => {
  const err = new Error(message);
  err.name = "Forbidden";
  err.custom_key = custom_key;
  err.recovery = recovery;
  err.message_presets = message_presets;
  throw err;
};

/**
 * Throw Token Expired error
 * @param {message} message
 */

export const throwExpired = ({
  message = "Expired",
  custom_key,
  recovery,
  message_presets,
}) => {
  const err = new Error(message);
  err.name = "Expired";
  err.custom_key = custom_key;
  err.recovery = recovery;
  err.message_presets = message_presets;
  throw err;
};

export const throwReauthentication = ({
  message = "Reauthentication",
  custom_key,
  recovery,
  message_presets,
}) => {
  const err = new Error(message);
  err.name = "Reauthentication";
  err.custom_key = custom_key;
  err.recovery = recovery;
  err.message_presets = message_presets;
  throw err;
};

export const throwTooManyRequests = ({
  message = "Too many requests",
  custom_key,
  recovery,
  message_presets,
  difference,
}) => {
  const err = new Error(message);
  err.name = "TooManyRequests";
  err.custom_key = custom_key;
  err.recovery = recovery;
  err.message_presets = message_presets;
  err.difference = difference;
  throw err;
};

/**
 * Throw method not allowed  exception
 * @param message
 */
export const throwMethodNotAllowed = ({
  message = "Method not allowed",
  custom_key,
  recovery,
  message_presets,
  difference,
}) => {
  const err = new Error(message);
  err.name = "MethodNotAllowed";
  err.custom_key = custom_key;
  err.recovery = recovery;
  err.message_presets = message_presets;
  err.difference = difference;
  throw err;
};

/**
 * Throw method not allowed  exception
 * @param message
 */
export const throwTimeOut = ({
  message = "Time out",
  custom_key,
  recovery,
  message_presets,
  difference,
}) => {
  const err = new Error(message);
  err.name = "TimeOut";
  err.custom_key = custom_key;
  err.recovery = recovery;
  err.message_presets = message_presets;
  err.difference = difference;
  throw err;
};
