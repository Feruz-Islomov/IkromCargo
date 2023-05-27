import { verify } from "jsonwebtoken";
import users from "./users.json";
const secret = process.env.SECRET;
export default async function (req, res) {
  const { cookies } = req;

  const token = cookies.OursiteJWT;

  if (!token) {
    return res.json({ message: "Invalid token1!", bool: false });
  }
  try {
    verify(token, secret);
    return res.json({ data: "Top secret data!", bool: true });
  } catch (err) {
    return res.json({ message: "Invalid token2!", bool: false });
  }
}
