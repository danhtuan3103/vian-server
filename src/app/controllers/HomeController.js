
const Item = require('../models/Item');

class HomeController {

    // [GET] /home
    index(req, res) {
        Item.find({}, (err, items) => {
            if(!err) return res.json(items);
            return res.status(400).json({ error : "ERROR!!!"});
      })
    }
    post(req, res) {
        console.log(req.body);

        const newItem = new Item ({
            title: req.body.title,
            description: req.body.description,
            image: req.body.imgUrl,
            img_des: req.body.descriptionUrl,
            sex : req.body.sex,
            type : req.body.type,
            colors : req.body.colors,
            price : req.body.price,
            sizes : req.body.sizes,
            item_code: req.body.itemCode
        });
        newItem.save((err) => {
            if(!err) return res.status(200).json({message: "success"});
            return res.status(200).json({error: err.message});
        })
    }
    delete(req, res) {
        console.log(req.body);
        Item.deleteOne({_id: req.body._id}).then((result) => {
            console.log(result);
        }) 
        .catch((err) => {console.log(err)})
    }
}

module.exports = new HomeController;