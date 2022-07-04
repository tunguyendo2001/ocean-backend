const Cloud = require("../utils/ggCloudConnection");
const path = require("path");
const bucket = Cloud.createConnection.bucket("oceanai");

const cwd = path.join(__dirname, '../public/downloads/');

let UserGetListFiles = async (req, res) => {
    try {
        const [files] = await bucket.getFiles( (error) => {
            if (error) {
                console.log("Error: ", error);
                return res.json({
                    "status": 0,
                    "message": "Unknown error!",
                })
            }
        });
        console.log("List files: ", files);
        return res.json({
            "status": 200,
            "message": "Get list files successfully!",
            "files": files,
        });
    }
    catch (error) {
        console.log("Error: ", error);
        return res.json({
           "status": 0,
            "message": "Unknown error!",
        });
    }
}

let UserDeleteFile = async (req, res) => {
    try {
        if (req.body.filename === undefined || req.body.filename === " ") {
            return res.json({
                "status": 0,
                "message": "Please choose files to delete!"
            });
        }
        else {
            await bucket.file(req.body.filename).delete();
            console.log(`Delete file ${req.body.filename} successfully!`);
            return res.json({
               "status": 200,
               "message": `Delete file ${req.body.filename} successfully!`
            });
        }
    }
    catch (error) {
        console.log("Error: ", error);
        return res.json({
           "status": 0,
           "message": "Unknown error!",
        });
    }
}

let UserDownloadFile = async (req, res) => {
    try {
        if (req.body.filename === undefined || req.body.filename === "") {
            return res.json({
                "status": 0,
                "message": "Please choose file to download",
            });
        }
        if (req.body.destFileName === undefined || req.body.destFileName === "") {
            // if user does not provide the location to download file, set the default to ${cwd}/${filename}
            req.body.destFileName = path.join(cwd, `${req.body.filename}`);
        }
        const options = {
            destination: req.body.destFileName,
        };
        await bucket.file(req.filename).download(options, (error, results) => {
            if (error) {
                console.log(error);
                return res.json({
                    "status": 0,
                    "message": "Unknown error!",
                });
            }
            else{
                console.log(results);
                return res.json({
                    "status": 200,
                    "message": `Download file ${req.body.filename} successfully!`,
                    "destination": req.body.destFileName,
                });
            }
        });
    }
    catch (error) {
        console.log("Error: ", error);
        return res.json({
            "status": 0,
            "message": "Unknown error",
        });
    }
}

module.exports = {
    UserGetListFiles,
    UserDeleteFile,
    UserDownloadFile,
}