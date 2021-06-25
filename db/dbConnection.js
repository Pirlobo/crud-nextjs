// export const mysql = require("serverless-mysql")({
//     config: {
//       host: "localhost",
//       database: "nextjs",
//       user: "root",
//       password: "root",
//     },
//   });

const mongoose = require('mongoose');
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb://localhost:27017/mydb")
const nosql = mongoose.connection;
nosql.on('error', console.error.bind(console, 'connection error:'));
nosql.once('open', function() {
  console.log("Connected")
});

export {nosql}

let poorMysql = require('mysql');
let connection = poorMysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "nextjs",
});
connection.connect(function(err) {
  if (err) {
      console.error('error connecting: ' + err.stack);
      return;
  }
});

export {connection};







