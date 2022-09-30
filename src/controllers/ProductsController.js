const express = require('express');
const Users = require('../models/Users');
const ProductService = require('../services/ProductService');
const fs = require('fs-extra');
const { getUpdateProduct } = require('./UsersController');
const ProductsController = {
    getproDetail: async (req, res, next) => {
        const slugUrl = req.params.slug;
        // const pid = req.params.pid;
        let product = await ProductService.getOne({slug: slugUrl})
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
            .then((product) => {
                fs.rmdir(`./src/public/uploads/${product.pid}`, { recursive: true }, (err) => {
                    if(err) {
                        req.flash('error', 'Xóa sản phẩm thất bại ' + err);
                        return res.redirect('/home');
                    }
                    else {
                        req.flash('success', `Xóa ${product.pid} thành công`);
                        return res.redirect('/home');
                    }
                })
            })
            .catch(next);

    },

    
    
}




module.exports = ProductsController;