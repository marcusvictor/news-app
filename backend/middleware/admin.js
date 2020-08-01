const { formatErrorMessage } = require("../util/app-messages");

module.exports = (req, res, next) => {
  const roles = [...req.user.roles];

  return roles.find((e) => e === "admin")
    ? next()
    : res.status(403).send(formatErrorMessage("notAdmin"));
};
