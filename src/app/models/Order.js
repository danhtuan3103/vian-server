const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Order = new Schema({
    user_id: {type: 'string', required: true},
    orders: {type: Array, required:true }
},
{
    timestamps: true
}
)

module.exports = new mongoose.model('order', Order);