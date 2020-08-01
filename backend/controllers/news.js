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
    const news = await News.findNewsById(req.params.id);
    !news
      ? res.status(404).send(formatErrorMessage("news-not-found"))
      : res.send(news);
  } catch (err) {
    res.status(500).send(formatErrorMessage("news-error", err.message));
  }
};

exports.postNews = async (req, res, next) => {
  try {
    const { error } = News.validate(req.body);

    if (error)
      return res
        .status(400)
        .send(formatErrorMessage("news-operation", error.details[0].message));

    const news = new News(req.body.title, req.body.content);

    res.status(201).send(await news.save());
  } catch (err) {
    return res.status(400).send("Ocorreu um erro não esperado.");
  }
};

exports.putNews = async (req, res, next) => {
  try {
    const news = await News.findNewsById(req.params.id);

    if (!news)
      return res.status(404).send(formatErrorMessage("news-not-found"));

    const { error } = News.validate(req.body);

    if (error)
      return res
        .status(400)
        .send(formatErrorMessage("news-operation", error.details[0].message));

    const newsObj = new News(req.body.title, req.body.content, req.params.id);

    res.status(201).send(await newsObj.save());
  } catch (err) {
    return res.status(400).send("Ocorreu um erro não esperado.");
  }
};

exports.deleteNews = async (req, res, next) => {
  try {
    const news = await News.findNewsById(req.params.id);
    if (!news)
      return res.status(404).send(formatErrorMessage("news-not-found"));

    await News.deleteById(req.params.id);
    res.send(news);
  } catch (err) {
    res.status(400).send(formatErrorMessage("news-error", err.message));
  }
};
