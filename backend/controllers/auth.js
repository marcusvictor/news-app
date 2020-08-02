// TODO: mongo. mover para o auth model
//const { authenticate } = require("../util/ad");
const config = require("config");
const { formatErrorMessage } = require("../util/app-messages");
const { generateAuthToken, getUserRoles } = require("../models/auth");

auth = async (req, res, next) => {
  const { username, password } = req.body;

  await authenticate(username, password, generateAuthToken, getUserRoles, res);
};

fakeAuth = (req, res, next) => {
  const { username, password } = req.body;

  if (password !== "newsapp")
    return res.status(401).send(formatErrorMessage("auth-failed"));

  let userObj;
  switch (username) {
    case "admin":
      userObj = {
        name: "Usuário administrador",
        username: "admin",
        email: "admin@news.com.br",
        roles: ["admin"],
      };
      break;

    default:
      userObj = {
        name:
          username.charAt(0).toUpperCase() + username.slice(1) + " da Silva",
        username: username,
        email: `${username}@news.com.br`,
        roles: ["user"],
      };
  }

  res.status(200).send(generateAuthToken(userObj));
};

//exports.postAuth = authType === "ad" ? adAuth : fakeAuth;
exports.postAuth = fakeAuth ? fakeAuth : auth;
