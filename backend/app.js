//TODO: arquivos de configuração

const express = require("express");
const helmet = require("helmet");
const config = require("config");
const cors = require("cors");

const mongoConnect = require("./util/database");

const authRoutes = require("./routes/auth");
const newsRoutes = require("./routes/news");

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/login", authRoutes);
app.use("/api/news", newsRoutes);

mongoConnect(() => {
  const port = 5501;
  app.listen(port, () => {
    console.log(`Webserver listening on port ${port}...`);
  });
});
