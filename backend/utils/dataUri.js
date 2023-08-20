const DataUriParser = require('datauri/parser')
const path = require('path')

exports.getDataUri = (file) => {
    const parser = new DataUriParser();
    const extName = path.extname(file.originalname).toString()
    const res = parser.format(extName, file.buffer);
    return res;
}


