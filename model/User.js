const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const schema = new Schema({
    name: { type: String, default: 'name' },
    subject: {  type: String, default: 'subject' },
    email: {  type: String, default: 'email'},
    message: {  type: String, default: 'message'},
  });

const conn = mongoose.createConnection('mongodb+srv://abenezer_123:A4Qi9uUGPe9iz7SE@cluster0.vc6yvwc.mongodb.net/?retryWrites=true&w=majority');

const MyModel = mongoose.model('users', schema);

module.exports =   MyModel;
