const multer = require('multer');
const fs = require('fs-extra');

// Kho 
let storage = multer.diskStorage({
    destination: function(req, file, cb)  {
        let pid = req.body.pid;
        
        let dir = `./src/public/uploads/${pid}`;
        if(!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true} );
        }

        cb(null, dir);
    },

    filename: function(req, file, cb) {
        // logo.png
        
        let ext = file.originalname.substring(file.originalname.lastIndexOf('.')) // .png
        cb(null, file.fieldname + '_' + Date.now() + ext);
        // product-image_1839424203424.png
    }
})

module.exports = upload = multer({
    storage: storage,
    limits: { fieldSize: 2 * 1024 * 1024 }
})