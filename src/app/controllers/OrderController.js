const Order = require("../models/Order");
const Item = require("../models/Item");
class OrderController {
  index(req, res) {
    console.log("find All order");
    Order.find({})
    .then(result => res.status(200).send(result))
    .catch(err => res.status(400).send(err))

  }

  findOrder(req, res) {
    console.log("find Order");
    const { user_id, order_id } = req.body;
    console.log(user_id, order_id);
    Order.find({ user_id: user_id }, (err, user) => {
      const [result] = user.filter(
        (order) => order.order_item.orded.order_id === order_id
      );
      if (result) {
        return res.status(200).send(result);
      } else {
        return res.status(404).send({ status: "404 Not Found" });
      }
    });
  }

  addOrderWithOneItem(req, res) {
    console.log("add Item in Order");
    console.log(req.body);
    let flag;
    Order.findOne({ user_id: req.body.user_id }, (err, user) => {
      if (user) {
        flag = true;
      }
      if (flag === true) {
        Order.findOneAndUpdate(
          { user_id: req.body.user_id },
          { $push: { orders: req.body.order } }
        )
          .then((result) => {
            res.send({ message: "Success Payment" });
          })
          .catch((err) => {
            res.status(500).json({ error: err , message: "Have something error" });
          });
      } else {
        const newOrder = new Order({
          user_id: req.body.user_id,
          orders: req.body.order,
        });
        newOrder.save((err) => {
          if (!err) return res.status(200).json({ message: "Payment Success" });
          return res
            .status(200)
            .json({ error: err.message, message: "Have something error" });
        });
      }
    });
  }

  addOrderWithMultiItem(req, res) {
    console.log("add Item in Order");
    console.log(req.body);
    let flag;
    Order.findOne({ user_id: req.body.user_id }, (err, user) => {
      if (user) {
        flag = true;
      }
      if (flag === true) {
        Order.findOneAndUpdate(
          { user_id: req.body.user_id },
          { $push: { orders: req.body.order } }
        )
          .then((result) => {
            res.send({ message: "Success Payment" });
          })
          .catch((err) => {
            res.status(500).json({ error: err , message: "Have something error" });
          });
      } else {
        const newOrder = new Order({
          user_id: req.body.user_id,
          orders: req.body.order,
        });
        newOrder.save((err) => {
          if (!err) return res.status(200).json({ message: "Payment Success" });
          return res
            .status(200)
            .json({ error: err.message, message: "Have something error" });
        });
      }
    });
  }

  // deleteOrder(req, res) {
  //     console.log("delete Card");
  //     console.log(req.body);
  //     Order.findOneAndUpdate({ user_id: req.body.user_id }, { $pull: { order_items: { order_id: req.body.order_item.order_id } } })
  //         .then(() => {
  //             console.log('deleted')
  //             Order.findOne({ user_id: req.body.user_id }, (err, user) => {
  //                 if (user.items <= 0) {
  //                     user.delete();
  //                     return res.status(200).json({ items: [] });

  //                 } else {
  //                     return res.status(200).json({ items: user.items });

  //                 }
  //             })

  //         })
  //         .catch(err => res.status(500).json({ error: err }))

  // }
}

module.exports = new OrderController();
