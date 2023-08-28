const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const schema = new Schema({
    email: { type: String, default:"beki@admin.com" },
    password: { type: String, default: 'beki1234'}
  });

const conn = mongoose.createConnection('mongodb+srv://abenezer_123:A4Qi9uUGPe9iz7SE@cluster0.vc6yvwc.mongodb.net/?retryWrites=true&w=majority');
const MyModel = mongoose.model('admins', schema);
module.exports =   MyModel;
