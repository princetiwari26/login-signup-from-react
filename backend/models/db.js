const mongoose = require('mongoose')

MONGO_URL = process.env.MONGO_URL

mongoose.connect(MONGO_URL)
    .then( ()=>{
        console.log('MongoDB is connected...');
        
    } )
    .catch((err) => {
        console.log('Not connected', err);
        
})