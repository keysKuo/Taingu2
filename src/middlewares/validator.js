const Users = require('../models/Users');

module.exports = checkAdmin = async (req, res, next) => {
    if(!req.session.username) {
        return res.redirect('/users/login');
    }
    else {
        let myAcc = await Users.findOne({username: req.session.username});
        if(myAcc.level == 'admin') {
            next();
        }
        else {
            req.flash('error', "Bạn không phải admin");
            return res.redirect('/users/login');
        }
    }
    
}