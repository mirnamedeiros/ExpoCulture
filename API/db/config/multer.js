const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function(req, file, callback){
        callback(null, "tmp/")
    },
    filename: function(req, file, callback) {
        callback(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

module.exports = upload;