const jwt = require("jsonwebtoken");
const config = require("config");

// TODO: mongo
//const oracleUser = config.get("oracle.user");

exports.generateAuthToken = (payloadObj) => {
  return jwt.sign(payloadObj, "C@omplicated!#Key&For12App", {
    expiresIn: "1h",
  });

  // TODO: pegar key da var de ambiente (docker)
  //return jwt.sign(payloadObj, config.get("jwtPrivateKey"), { expiresIn: "1h" });
};

/* exports.getUserRoles = async (username, userGroups) => {
  userGroups.push(username);
  const paramsArray = userGroups.map((g) => `'${g}'`);
  const members = paramsArray.toString();

  const roles = await db.execute(
    `select distinct p.txt_nome_papel 
     from ${oracleUser}.tb_papel p
       inner join tb_papel_membro pm on p.id_papel = pm.id_papel
       where pm.txt_usuario_grupo IN (${members})`,
    []
  );

  return roles.map((r) => r["txt_nome_papel"]);
}; */
