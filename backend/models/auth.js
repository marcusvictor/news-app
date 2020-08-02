const jwt = require("jsonwebtoken");
const config = require("config");

exports.generateAuthToken = (payloadObj) => {
  return jwt.sign(payloadObj, "C@omplicated!#Key&For12App", {
    expiresIn: "1h",
  });

  // TODO: pegar key da var de ambiente (docker)
  //return jwt.sign(payloadObj, config.get("jwtPrivateKey"), { expiresIn: "1h" });
};
