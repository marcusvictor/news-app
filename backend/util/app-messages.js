const config = require("config");
const _ = require("lodash/core");

exports.formatErrorMessage = (msgName, msgText) => {
  const messageObj = _.assignIn(
    {},
    config.get("app-messages.error-messages." + msgName)
  );

  if (!messageObj.what) messageObj.what = msgText;

  if (!messageObj.workaround)
    messageObj.workaround = config.get("app-messages.contact-info");

  return messageObj;
};
