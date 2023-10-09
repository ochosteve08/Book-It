import { STATUS } from "../consts/status.js";
import { getSuccessPayload } from "../payload/index.js";

/**
 * Handler success and send appropriate response
 * @param data
 * @param req
 * @param res
 * @returns {*}
 */

export const handler = (data, req, res, next) => {
  const payload = getSuccessPayload(data);
  return res.status(STATUS.OK).send(payload);
};
