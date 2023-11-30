const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const System = new Schema ({
    // 
    isRun: {type:Boolean},
    type: {type:String},
    kpi: {type:Number},
})

Cart.index({name: "text", description: "text"})

module.exports = mongoose.model('Cart', Cart)