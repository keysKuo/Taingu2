const Products = require('../models/Products');

const ProductService = {
    getOne: async (slugUrl) => {
        return await Products.findOne({slug: slugUrl}).lean();
    },
    getAll: async (options) => {
        let sort = options.sort || 1;
        let skip = options.skip || 0;
        let limit = options.limit || 0;
        let cart = options.cart || [];
        return await Products.find({})
            .sort({createdAt: sort})
            .skip(skip)
            .limit(limit)
            .lean()
            .then(products => {
                return products.filter(product => {
                    return cart.includes(product.pid)
                })
            })
            // cart [D001, XM0001, AO001]
    },
    // create:,
    delete: async (id) => {
        return await Products.findByIdAndDelete(id);
    },
    // update:,
}

module.exports = ProductService;