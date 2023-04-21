const mongoose = require("mongoose");
require("dotenv").config();
console.log(process.env);
mongoose.connect(process.env.DB_URI,{useNewUrlParser: true, useUnifiedTopology: true,});

mongoose.connection.on('connected', () => {
  console.log('Connection db success !');
});

mongoose.connection.on('error', (err) => {
  console.error(`Connection db Error : ${err}`);
});