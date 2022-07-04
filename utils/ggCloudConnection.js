const { Storage } = require("@google-cloud/storage");

let projectId = "omega-math-354914";
let keyFileName = "../omega-math-354914-751967acc43d.json";
const storage = new Storage({
    projectId,
    keyFileName,
});
exports.createConnection = storage;
