const { findByIdAndUpdate } = require('../models/Products');
const Products = require('../models/Products');

// API
const ProductService = {
    getOne: async (options) => {
        if(options.id) {
            return await Products.findOne({_id: options.id}).lean()
                .then(product => {
                    if(!product) {
                        return res.json({success: false, msg: "Không có sản phẩm"});
                    }
                    return product;
                })
        }

        if(options.slug) {
            return await Products.findOne({slug: options.slug}).lean()
                .then(product => {
                    return product;
                });
        }

        if(options.pid) {
            return await Products.findOne({pid: options.pid}).lean()
                .then(product => {
                    return product;
                });
        }
    },
    getAll: async (options) => {
        let sort = options.sort || 1;
        let skip = options.skip || 0;
        let limit = options.limit || 0;
        let cart = options.cart || [];

        return await Products.find({})
            .sort({createdAt: sort}) // 1
            .skip(skip) // 0
            .limit(limit) // 0
            .lean()
            .then(products => {
                if(cart) {
                    return products.filter(product => {
                        return cart.includes(product.pid)
                    })
                }
                else {
                    return products;
                }
            })
            // cart [D001, XM0001, AO001]
    },
    create: async (data) => {
        return await new Products(data).save();
    },
    delete: async (id) => {
        return await Products.findByIdAndDelete(id);
    },
    update: async (id, data) => {
        return await Products.findByIdAndUpdate(id, {$set: data});
    }
    // update: async (id, data) => {
    //     // Find one -> Product _id
    //     // Product update
    //     return await Products.findByIdAndUpdate(id, { $set: data});
    // },
}

module.exports = ProductService;