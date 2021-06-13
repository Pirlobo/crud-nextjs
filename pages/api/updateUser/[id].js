import { connection } from "../../../db/dbConnection";
import { getSession } from "next-auth/client";

export default async (req, res) => {
  const session = await getSession({ req });
  if (session) {
    if (req.method === "PUT") {
      const { id } = req.query;
      var sql = `UPDATE user SET id = ${req.body.id}, name = '${req.body.name}', email = '${req.body.email}' WHERE id = ${id}`;
        connection.query(sql, function (err, results) {
          if (err) throw err;
          res.status(200).json({ message: `Updated user has id of ${id}` });
        });
    } else {
      res.status(405).json({ message: "Method not allowed" });
    }
  }
  else {
    res.status(403).json({message : 'You are not allowed to perform this task'});
  }
  
};
