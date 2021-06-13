import { connection } from "../../../db/dbConnection";
import { getSession } from "next-auth/client"

export default async (req, res) => {
  if (req.method === "GET") {
    const { id } = req.query;
    var sql = `SELECT * FROM user WHERE id = ${id}`;
      connection.query(sql, function (err, user) {
        if (err) throw err;
        res.status(200).json(user);
      });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
};
