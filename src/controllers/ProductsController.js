const express = require('express');
const Users = require('../models/Users');
const Products = require('../models/Products');
const ProductService = require('../services/ProductService');

const ProductsController = {
    getproDetail: async (req, res, next) => {
        const slugUrl = req.params.slug;

        await ProductService.getOne(slugUrl)
            .then(product => {
                const data = {
                    pid: product.pid,
                    pro_name: product.pro_name,
                    description: product.description,
                    image: product.image,
                    price: product.price,
                    slug: product.slug,
                    gid: product.gid
                }

                return res.render('products/product-detail', {
                    data: data
                })
            })
            .catch(next)
    },
    getAllProducts: async (req, res, next) => {

        let products = await ProductService.getAll({sort: -1}) // task 1
        console.log(products) // task 2
    },

    getCartOfCustomer: async (req, res, next) => {
        let cart = await Users.findOne({username: 'admin'})
            .then(user => {
                return user.cart;
            })

            let products = await ProductService.getAll({sort: -1, cart: cart})
            console.log(products)
    },

    getDeleteProduct: async (req, res, next) => {
        const id = req.params.id;
        await ProductService.delete(id)
            .then(res.redirect('/home'));

    }
    
}




module.exports = ProductsController;