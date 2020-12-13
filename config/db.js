const mongoose = require('mongoose');
const config = require ('config');
const db = config.get('mongoURI');

const connectDB = async () => {
    try{
        //await mongoose.connect(db, { useNewUrlParser: true });
        //await mongoose.createConnection(db , { useNewUrlParser: true });
        mongoose.set('useUnifiedTopology', true);

        console.log('mongoose connected..');
    } catch(err){
        console.error(err.message);
        //exit process wit failure
        process.exit(1);
    }
}

module.exports = connectDB;
