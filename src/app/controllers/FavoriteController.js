const Favorite = require("../models/Favorite");
const Item = require("../models/Item");
class FavoriteController {
  index(req, res) {
    Favorite.find({}, (err, items) => {
      if (items) return res.status(200).send(items);
      else {
        res.status(404).send(err);
      }
    });
  }

  findFavorite(req, res) {
    console.log("find Favorite");
    console.log(req.body);
    Favorite.findOne({ user_id: req.body.user_id }, (err, user) => {
      if (!err) {
        if (user) {
          return res.status(200).send(user.favorites);
        } else {
          return res.status(200).send([]);
        }
      } else {
        res.status(404).send({ message: err.message });
      }
    });
  }

  addFavorite(req, res) {
    console.log("add Favorite");
    console.log(req.body);
    const { user_id, item_id } = req.body;
    let flag = false;
    let isAddedItem = true;
    Item.findOne({ _id: item_id }, (err, item) => {
      Favorite.findOne({ user_id: user_id }, (err, user) => {
        if (user) {
          Favorite.findOneAndUpdate(
            { user_id: req.body.user_id },
            { $push: { favorites: item } }
          )
            .then(() => {
              console.log("Updated");
              return res.status(200).json({ message: "Add Success!" });
            })
            .catch((err) => res.status(500).json({ error: err }));
        } else {
          const newFavorite = new Favorite({
            user_id: req.body.user_id,
            favorites: item,
          });
          newFavorite.save((err) => {
            if (!err) return res.status(200).json({ message: "Add Success!" });
            return res.status(200).json({ error: err.message });
          });
        }
      });
    });
  }

  deleteFavorite(req, res) {
    console.log("delete item in Favorites");
    console.log(req.body.item_id);
    Favorite.findOneAndUpdate(
      { user_id: req.body.user_id },
      { $pull: { favorites: { item_code: req.body.item_id } } }
    )
      .then((result) => {
        Favorite.findOne({ user_id: req.body.user_id }, (err, user) => {
          if (user.favorites <= 0) {
            user.delete();
            return res.status(200).json({ message: "Delete User in favorites!" });
          } else {
            return res.status(200).json({ message: " Delete Item in favorites!" });
          }
        });
      })
      .catch((err) => res.status(500).json({ error: err }));
  }
}

module.exports = new FavoriteController();
