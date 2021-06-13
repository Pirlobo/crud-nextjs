import { connection } from "../../../db/dbConnection";
import { getSession } from "next-auth/client";

export default async (req, res) => {
  const session = await getSession({ req });
  if (session) {
    if (req.method === "DELETE") {
      const { id } = req.query;
      var sql = `DELETE FROM user WHERE id = ${id}`;
        connection.query(sql, function (err, user) {
          if (err) throw err;
          res.status(200).json({ message: `Deleted user has id of ${id}` });
        });
    } else {
      res.status(405).json({ message: "Method not allowed" });
    }
  }
  else {
    res.status(403).json({message : 'You are not allowed to perform this task'});
  }
  
};
