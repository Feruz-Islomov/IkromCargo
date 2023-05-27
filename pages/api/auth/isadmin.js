import { verify } from "jsonwebtoken";
import users from "../users.json";
import invoices from "../invoice.json";

const secret = process.env.SECRET;

export default async function (req, res) {
  const { username, password } = req.body;

  const user = users.find(
    (user) => user.name === username && user.password === password
  );
  const { cookies } = req;
  const token = cookies.OursiteJWT;
  if (!token) {
    return res.json({ message: "Invalid token1!", bool: false });
  }

  if (!user) {
    res.json({ message: "Mavjud emas!" });
  } else if (user && user.isAdmin === true) {
    verify(token, secret);
    res.status(200).json({ message: "Success!", user, invoices });
  } else {
    res.json({ message: "Not authorized to this page" });
  }
}
