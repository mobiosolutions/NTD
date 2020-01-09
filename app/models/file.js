const mongoose = require('mongoose');

let schema = mongoose.Schema;

let FileUploadSchema = new schema({
    file: {
        type: String,
    },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('FileUpload', FileUploadSchema);