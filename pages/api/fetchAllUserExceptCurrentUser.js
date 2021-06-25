import { connection } from "../../db/dbConnection";
import { getSession } from "next-auth/client";
var fs = require("fs");

const myPromise = new Promise(function (resolve, reject) {
  // var sql = `SELECT * FROM user AS allUser WHERE allUser.email NOT IN ( SELECT email from user as currentUser where currentUser.email = '${email}' )`;
  var sql = `SELECT * FROM user AS allUser `;
  connection.query(sql, function (err, results) {
    if (err) throw err;
    for (let i = 0; i < results.length; i++) {
      fs.readFile(
        "files/images/" + results[i].id.toString() + ".txt",
        "utf8",
        (err, file) => {
          if (file) {
            results[i].image = file;
          }
        }
      );
    }
    resolve(results);
  });
});

export default async (req, res) => {
  const session = await getSession({ req });
  if (session) {
    if (req.method === "GET") {
      myPromise
        .then((values) => {
          const result = values.filter(
            (value) => value.email !== session.user.email
          );
          res.status(200).json(result);
        })
        .catch((err) => {
          res.status(400).json(err);
        });
    } else {
      res.status(405).json({ message: "Method not allowed" });
    }
  } else {
    res
      .status(403)
      .json({ message: "You are not allowed to perform this task" });
  }
};
