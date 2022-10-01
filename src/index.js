const express = require('express');
const app = express();
const handlebars = require('express-handlebars');
const path = require('path');
const flash = require('express-flash');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const database = require('./config/database');
const Users = require('./models/Users');
const Products = require('./models/Products');
const Group = require('./models/Group');
const UsersRouter = require('./routers/UsersRouter');
const ProductsRouter = require('./routers/ProductsRouter');
const port = 3000;
database.connect();
//  config
app.set('view engine', 'hbs');
app.engine('hbs', handlebars.engine({
    extname: 'hbs'
}));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(cookieParser('ddn'));
app.use(session({ cookie: { maxAge: 300000 } }));

app.use(flash());

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));

// config end


app.get('/home', async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const nProducts = 4;
    const skip = nProducts * (page - 1); // 0 4 8 12 16

    const total = await Products.countDocuments()
        .then(count => {
            return count;
        }) // 6

    let n = Math.ceil(total / nProducts); // 2 trang
    
    let html = '';
    for(let i = 1; i <= n; i++) {
        if(i == page) {
            html += `<li class="pageNumber active"><a href="/home?page=${i}">${i}</a></li>`
        }
        else {
            html += `<li class="pageNumber"><a href="/home?page=${i}">${i}</a></li>`
        }

    }

    Products.find({})
        .sort({ createdAt: -1 })
        .limit(nProducts)
        .skip(skip)
        .then((products) => {
            if (!products) { 
                return res.render('home', {
                    username: true,
                    username: req.session.username,
                    data: []
                })
            }
            let data = products.map(products => {
                return {
                    id: products._id.toString(),
                    pid: products.pid,
                    pro_name: products.pro_name,
                    price: (products.price).toLocaleString('vi', {style: 'currency', currency: 'VND'}),
                    image: products.images[0],
                    slug: products.slug
                }
            });
            // console.log(data);
            return res.render('home', {
                login_icon: (req.session.username) ? false : true,
                username: true,
                username: req.session.username,
                data: data,
                next: page+1,
                prev: page-1,
                pages: html,
            })
        })


});
app.use('/users', UsersRouter);
app.use('/product', ProductsRouter);


function f(str) {
    str = str + "0000";
    return;
}
app.get('/cart', async (req, res, next) => {
    let items_id = req.flash('items_id')[0] || '';
    if(items_id)
        items_id = items_id.split(' ');

    let cart = await Products.find({pid: {$in: items_id}})
        .then(products => {
            return products.map((product, index) => {
                return {
                    idx: index + 1,
                    _id: product._id.toString(),
                    pid: product.pid,
                    pro_name: product.pro_name,
                    price: product.price.toLocaleString('vi', {style: 'currency', currency: 'VND'}),
                    image: product.images[0],
                    slug: product.slug

                }
            })
        })

    return res.render('products/cart', {
        data: cart,
    })
})
app.post('/cart', async (req, res, next) => {
    const items_id = req.body.items_id.trim();
    // mongoose find $in
    req.flash('items_id', items_id);
    return res.redirect('/cart');
})

app.get('/', async (req, res) => {
   
    var x = await Products.findOne({pid: 'D001'})
        .then(product => {
            return product
        })
        
    console.log(x);
    return res.render('home');
})

// localhost
app.listen(port, () => {
    console.log(`Server is running on ${port}`)
})