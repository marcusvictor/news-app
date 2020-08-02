const Joi = require("joi");
const config = require("config");
const mongodb = require("mongodb");
const { getDb } = require("../util/database");

const joiSchema = Joi.object({
  title: Joi.string().max(300).required(),
  content: Joi.string().max(4000).required(),
});

module.exports = class News {
  constructor(title, content, id) {
    this.title = title;
    this.content = content;
    this.createdAt = Date.now();
    this._id = id ? new mongodb.ObjectId(id) : null;
  }

  static validate(news) {
    return joiSchema.validate(news);
  }

  static async fetchAll() {
    return await getDb().collection("news").find().toArray();
  }

  static async findNewsById(id) {
    return await getDb()
      .collection("news")
      .find({ _id: new mongodb.ObjectId(id) })
      .next();
  }

  static async deleteById(id) {
    return await getDb()
      .collection("news")
      .deleteOne({ _id: new mongodb.ObjectId(id) });
  }

  async save() {
    const db = getDb();

    if (this._id) {
      // Update the news
      await db.collection("news").updateOne({ _id: this._id }, { $set: this });
    } else {
      // Insert the news
      await db.collection("news").insertOne(this);
    }
    return this;
  }
};
