/**
 * @description file to connect database
 * @author Manav Sharma
 * @since 21 December 2020
 */

const mongoose =  require('mongoose');
require('dotenv').config({ path: '/.env'});

//mongodb cluster url
const mongodbUrl = process.env.mongoURL;

try {
    mongoose.connect(mongodbUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    });
} catch (error) {
    return error;
}

mongoose.connection.on('connected', () => console.log('Database Connected'));

mongoose.connection.on('disconnected', () => console.log('Database Disconnected'));

//schema for 'task"
const { Schema } = mongoose;

const taskSchema = new Schema({
    task: { type: String, required: true },
    userRef: { type: String, required: true },
    createdOn: { type: String },
    completed: { type: Boolean, default: false },
    completedOn: { type: String, default: 'Not Completed'}
});

const taskModel = mongoose.model('task', taskSchema);

module.exports.taskModel = taskModel;
