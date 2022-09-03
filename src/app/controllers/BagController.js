const Bag = require("../models/Bag");

class BagController {
  index(req, res) {
    Bag.find({}, (err, card) => {
      if (card) return res.status(200).send(card);
      else {
        res.status(404).send(err);
      }
    });
  }

  postBag(req, res) {
    console.log("find Bag");
    console.log("body :: " + req.body);  

    Bag.findOne({ user_id: req.body.user_id }, (err, bags) => {
      if (!err) {
        if (bags) {
          return res.status(200).send(bags.bag);
        } else {
          return res.status(200).send([]);
        }
      } else {
        res.status(404).send();
      }
    });
  }

  addItem(req, res) {
    console.log("add Item in Bag");
    console.log(req.body);
    let flag;
    Bag.findOne({ user_id: req.body.user_id }, (err, user) => {
      if (user) {
        flag = true;
      }
      if (flag === true) {
        Bag.findOneAndUpdate(
          { user_id: req.body.user_id },
          { $push: { bag: req.body.bag } }
        )
          .then(() => {
            // Bag.findOne({ user_id: req.body.user_id }, (err, user) => {
              return res.status(200).json({ user: user });

          })
          .catch((err) => res.status(500).json({ error: err }));
      } else {
        const newBag = new Bag({
          user_id: req.body.user_id,
          bag: req.body.bag,
        });
        newBag.save((err) => {
          if (!err) return res.status(200).json({ user: newBag });
          return res.status(200).json({ error: err.message });
        });
      }
    });
  }

  deleteItem(req, res) {
    console.log("delete Item form Bag");
    console.log(req.body);
    Bag.findOneAndUpdate(
      { user_id: req.body.user_id },
      { $pull: { bag: { selected_id: req.body.selected_id } } }
    )
      .then(() => {
        Bag.findOne({ user_id: req.body.user_id }, (err, user) => {
          if (user.bag <= 0) {
            user.delete();
            return res.status(200).json({ user: [] });
          } else {
            return res.status(200).json({ user: user.bag });
          }
        });
      })
      .catch((err) => res.status(500).json({ error: err }));
  }
}

module.exports = new BagController();
