const express = require("express");
const multer = require("../utils/multer");
const UploadFile = require("../controllers/upload");
const User = require("../controllers/user");
const {route} = require("express/lib/router");
const router = express.Router();

router.post('/uploadImage', multer.single("image"), function (req, res, next) {
    if (req.checkWrongFileType) {
        return res.json({
            status: 0,
            message: "Wrong file format!"
        });
    }
    else next();
}, UploadFile.UploadImage);

router.get('/listFiles', User.UserGetListFiles);
router.delete('/delete', User.UserDeleteFile);
router.post('/download', User.UserDownloadFile);

module.exports = router;