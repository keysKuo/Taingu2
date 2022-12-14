const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');
mongoose.plugin(slug);

const ProductsModel = new Schema({
    pid: {
        type: String
    },
    pro_name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true
    },
    images: {
        type: [String],
    },
    slug: {
        type: String,
        slug: 'pro_name'
    },
    gid: {
        type: String,
    }


}, {
    timestamps: true
});



module.exports = mongoose.model('Products', ProductsModel);