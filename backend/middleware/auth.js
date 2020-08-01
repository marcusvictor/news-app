const jwt = require("jsonwebtoken");
const config = require("config");

const { formatErrorMessage } = require("../util/app-messages");

module.exports = (req, res, next) => {
  const token = req.header("x-auth-token");

  if (!token)
    return res.status(401).send(formatErrorMessage("auth-info-missing"));

  try {
    const decodedPayload = jwt.verify(token, "C@omplicated!#Key&For12App");

    // TODO: pegar key da var de ambiente (docker)
    //const decodedPayload = jwt.verify(token, config.get("jwtPrivateKey"));

    req.user = decodedPayload;
    next();
  } catch (ex) {
    if (ex.name === "TokenExpiredError")
      res.status(401).send(formatErrorMessage("expired-auth-token"));
    else res.status(401).send(formatErrorMessage("invalid-auth-token"));
  }
};
