import { connection } from "../../db/dbConnection";
import { getSession } from "next-auth/client";

// export default async (req, res) => {
//   const session = await getSession({ req })
//   let results = await mysql.query(`SELECT * FROM user AS u WHERE u.email = '${session.user.email}'`);
//   // Run clean up function
//   res.status(200).json(results);
// };

export default async (req, res) => {
  const session = await getSession({ req });
  if (session) {
    if (req.method === "GET") { 
      var sql = `SELECT * FROM user AS u WHERE u.email = '${session.user.email}'`;
        connection.query(sql, function (err, results) {
          if (err) throw err;
          res.status(200).json(results);
        });
    }
    else {
      res.status(405).json({message : 'Method not allowed'});
    }  
  }
  else {
    res.status(403).json({message : 'You are not allowed to perform this task'});
  }
  
};
