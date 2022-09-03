const Item = require("../models/Item");

class ItemController {
  //[GET item]
  index(req, res) {
    Item.find({}, (err, items) => {
      if (!err) return res.json(items);
      return res.status(400).json({ data: [], message: err.message });
    });
  }

  //[GET] /item/id/:id
  getById(req, res) {
    console.log(req.params.id);
    Item.findOne({ _id: req.params.id }, (err, items) => {
      console.log("/GET /item/id/:id", items);
      if (items) {
        return res.status(200).json(items);
      } else {
        return res.status(202).json([]);
      }
    });
  }
  // [GET] /item/:sex
  getBySex(req, res) {
    Item.find({ sex: req.params.sex }, (err, items) => {
      if (items) {
        return res.status(200).json(items);
      } else {
        return res.status(202).json([]);
      }
    });
  }
  // [GET] /item/type/:type
  getByType(req, res) {
    Item.find({ type: req.params.type }, (err, items) => {
      if (items) {
        return res.status(200).json(items);
      } else {
        return res.status(202).json([]);
      }
    });
  }

  //[GET] /item/sex/:sex/:type
  getBySexAndType(req, res) {
    Item.find({ sex: req.params.sex, type: req.params.type }, (err, items) => {
      if (items) {
        return res.status(200).json(items);
      } else {
        return res.status(202).json([]);
      }
    });
  }
}

module.exports = new ItemController();
