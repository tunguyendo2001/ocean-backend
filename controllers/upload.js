const Cloud = require("../utils/ggCloudConnection");
const bucket = Cloud.createConnection.bucket("oceanai");

const UploadImage = (req, res) => {
    try {
        if (req.file) {
            // create an unique name for each uploaded file
            const filename = req.file.originalname.split(".")[0] + "_" + Date.now() + req.file.originalname.split(".")[1];
            console.log("File found, trying to upload...");
            const blob = bucket.file(filename);
            const blobStream = blob.createWriteStream();

            blobStream.on("finish", () => {
                console.log(`Uploaded image ${req.file.originalname}`);
                res.json({
                   "status": 200,
                   "message": `Uploaded image ${req.file.originalname}`,
                   "fileURL":
                        `https://storage.googleapis.com/${bucket.name}/${blob.name}`
                });
            });
            blobStream.end(req.file.buffer);
        } else {
            return res.json({
                "message": "Image file (png, jpeg, jpg, ...) required!"
            });
        }
    } catch (error) {
        console.log("ERROR" + error);
        return res.json({
            "message": "Unknown error"
        });
    }
}

module.exports = {
    UploadImage
}