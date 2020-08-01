//TODO: arquivos de configuração

const express = require("express");
const helmet = require("helmet");
const config = require("config");
var cors = require("cors");

const authRoutes = require("./routes/auth");
const newsRoutes = require("./routes/news");

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/login", authRoutes);
app.use("/api/news", newsRoutes);

async function init() {
  try {
    //  TODO: CONEXÂO BANCO

    const port = 5501;

    app.listen(port, () => {
      console.log(`Webserver listening on port ${port}...`);
    });
  } catch (err) {
    console.error("Error occurred creating database connection", err);
    console.log("Exiting process");
    process.exit(1);
  }
}

/* if (!config.get("jwtPrivateKey")) {
  console.error("FATAL ERROR: jwtPrivateKey is not defined");
  process.exit(1);
} else init(); */
init();
