const News = require("../models/news");
const { formatErrorMessage } = require("../util/app-messages");

exports.getAllNews = async (req, res, next) => {
  try {
    const news = await News.fetchAll();

    res.send(news);
  } catch (err) {
    res.status(500).send(formatErrorMessage("news-error", err.message));
  }
};

exports.getNews = async (req, res, next) => {
  try {
    const news = await News.findNewsById(parseInt(req.params.id));

    news.length === 0
      ? res.status(404).send(formatErrorMessage("news-not-found"))
      : res.send(news[0]);
  } catch (err) {
    res.status(500).send(formatErrorMessage("news-error", err.message));
  }
};

exports.postNews = async (req, res, next) => {
  try {
    //console.log(req.body);
    const { error } = News.validate(req.body);
    //console.log(error);
    if (error)
      return res
        .status(400)
        .send(formatErrorMessage("news-operation", error.details[0].message));

    const news = new News(null, req.body.title, req.body.content);

    res.status(201).send(await news.save());
  } catch (err) {
    //console.log(err);

    // TODO: mongo
    /*
    let msgObj;
     if (err.message.includes("ORA-00001")) {
      msgObj = formatErrorMessage("operation-error", "operação já cadastrada.");
      msgObj.column = "no_operacao";
    } else {
      msgObj = formatErrorMessage("invalid-operation", err.message);
      msgObj.column = "txt_bloco_sql";
    }
    return res.status(400).send(msgObj); */
    return res.status(400).send("Ocorreu um erro não esperado.");
  }
};

exports.putNews = async (req, res, next) => {
  try {
    const news = await News.findNewsById(parseInt(req.params.id));
    //console.log(news);

    if (news.length === 0)
      return res.status(404).send(formatErrorMessage("news-not-found"));

    //console.log(req.body);
    const { error } = News.validate(req.body);
    //console.log(error);

    if (error)
      return res
        .status(400)
        .send(formatErrorMessage("news-operation", error.details[0].message));

    const newsObj = new News(req.params.id, req.body.title, req.body.content);

    res.status(201).send(await newsObj.save());
  } catch (err) {
    // TODO: mongo
    /* const msgObj = formatErrorMessage("invalid-news", err.message);
    msgObj.column = "txt_bloco_sql";
    return res.status(400).send(msgObj); */
    return res.status(400).send("Ocorreu um erro não esperado.");
  }
};

exports.deleteNews = async (req, res, next) => {
  try {
    const news = await News.findNewsById(parseInt(req.params.id));
    if (news.length === 0)
      return res.status(404).send(formatErrorMessage("news-not-found"));

    await News.deleteById(parseInt(req.params.id));
    res.send(news);
  } catch (err) {
    res.status(400).send(formatErrorMessage("news-error", err.message));
  }
};
