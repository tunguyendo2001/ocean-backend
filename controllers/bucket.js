const Cloud = require("../utils/ggCloudConnection");
const bucket = Cloud.createConnection.bucket("oceanai");

let GetBucketMetadata = async (req, res) => {

}

module.exports = {
    GetBucketMetadata
}