import { handler } from "./handler.js";
import { getErrorPayload } from "../payload/index.js";
import {
  throwConflict,
  throwCustomValidationError,
  throwNotFound,
  throwPreconditionFailed,
  throwForbiddenError,
  throwExpired,
  throwReauthentication,
  throwTooManyRequests,
  throwMethodNotAllowed,
  throwTimeOut,
} from "./custom-error.js";

const error = {
  handler,
  throwConflict,
  throwCustomValidationError,
  throwNotFound,
  throwPreconditionFailed,
  throwForbiddenError,
  throwExpired,
  throwReauthentication,
  throwTooManyRequests,
  throwMethodNotAllowed,
  throwTimeOut,
};


export {error}
