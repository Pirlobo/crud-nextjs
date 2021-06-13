import { connection } from "../../db/dbConnection";
import { getSession } from "next-auth/client";

export default async (req, res) => {
  if (req.method === "GET") {
    var sql = `SELECT * FROM user`;
    connection.query(sql, function (err, results) {
      if (err) throw err;
      res.status(200).json(results);
    });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
};
