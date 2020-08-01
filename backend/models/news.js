const Joi = require("joi");
const config = require("config");

// TODO: mongo

let newsArray = [
  {
    _id: 1,
    title: "Uma notícia bombástica",
    content: "Marcus Martins consegue vaga no processo de seleção!",
    createdAt: Date.now(),
  },
  {
    _id: 2,
    title: "Uma outra notícia",
    content: "Chega ao Brasil a vacina contra o coronavirus",
    createdAt: Date.now(),
  },
];

const joiSchema = Joi.object({
  title: Joi.string().max(100).required(),
  content: Joi.string().max(4000).required(),
});

module.exports = class News {
  constructor(_id, title, content) {
    this._id = _id;
    this.title = title;
    this.content = content;
    this.createdAt = Date.now();
  }

  static validate(news) {
    return joiSchema.validate(news);
  }

  // TODO: mongo
  static async fetchAll() {
    return newsArray;
  }

  // TODO: mongo
  static async findNewsById(id) {
    const news = newsArray.find((n) => n._id === id);
    return news ? [news] : [];
  }

  // TODO: mongo
  static async deleteById(id) {
    newsArray = newsArray.filter((n) => n._id !== id);
  }

  // TODO: mongo
  async save() {
    if (!this._id) {
      this._id = Math.floor(Date.now() / 1000);
    } else {
      newsArray = newsArray.filter((n) => n._id != this._id);
    }
    newsArray.push(this);

    return this;
  }
};
