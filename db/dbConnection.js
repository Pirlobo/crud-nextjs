// export const mysql = require("serverless-mysql")({
//     config: {
//       host: "localhost",
//       database: "nextjs",
//       user: "root",
//       password: "root",
//     },
//   });

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







