import { verify } from "jsonwebtoken";
import users from "../users.json";
import invoices from "../../../invoice.json";
import bcrypt from "bcryptjs";

const secret = process.env.SECRET;

export default async function (req, res) {
  const { username, password } = req.body;

  const user = users.find((user) => user.name === username);
  const { cookies } = req;
  const token = cookies.OursiteJWT;
  if (!token) {
    return res.json({ message: "Invalid token1!", bool: false });
  }

  if (!user) {
    res.json({ message: "Mavjud emas!" });
  } else if (user && user.isAdmin === true) {
    verify(token, secret);

    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        console.log("matching err:", err);
        res.status(200).json({ message: err });
      } else if (isMatch) {
        // Passwords match, log the user in
        console.log("matched!");
        res.status(200).json({ message: "Success!", user, invoices });
      } else {
        // Passwords don't match
        res.status(200).json({ message: "Parol noto'g'ri!" });
      }
    });
  } else {
    res.json({ message: "Sizga kirish man etiladi!" });
  }
}
