import { getSession } from "next-auth/client";
import { nosql } from "../../../db/dbConnection";

const handleError = (err) => {
  let errors = { email: "", username: "", password: "", phone: "" };
  if (err.message.includes("users validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }
  return errors;
};

var User = require("../../../db/models/Users");

export default async (req, res) => {
  const session = await getSession({ req });
  if (session) {
    if (req.method === "POST") {
      try {
        const user = new User({
          email: "bonguyens2001@gmail.com",
          username: "Anh T Nguyen",
          password: "Evccstutor21!",
          phone: "6692s658988",
        });
        await user.save();
      } catch (err) {
        const errors = handleError(err);
        res.status(400).json({ errors });
      } finally {
        nosql.close();
      }
    } else {
      res.status(405).json({ message: "Method not allowed" });
    }
  } else {
    res
      .status(403)
      .json({ message: "You are not allowed to perform this task" });
  }
};
