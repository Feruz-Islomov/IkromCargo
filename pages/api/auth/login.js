import { sign } from "jsonwebtoken";
import { serialize } from "cookie";
import users from "../users.json";
import bcrypt from "bcryptjs";

const secret = process.env.SECRET;

export default async function (req, res) {
  const { username, password } = req.body;

  const user = users.find((user) => user.name === username);

  if (user) {
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        console.log("matching err:", err);
        res.status(200).json({ message: err });
      } else if (isMatch) {
        // Passwords match, log the user in
        console.log("matched!");
        const token = sign(
          {
            exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24, // 1 day
            id: user.id,
          },
          secret
        );

        const serialized = serialize("OursiteJWT", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV !== "development",
          sameSite: "strict",
          maxAge: 60 * 60 * 24,
          path: "/",
        });

        res.setHeader("Set-Cookie", serialized);
        res.status(200).json({ message: "Success!" });
      } else {
        // Passwords don't match
        res.status(200).json({ message: "Parol noto'g'ri!" });
      }
    });
  } else {
    res.status(200).json({ message: "Login noto'g'ri!" });
  }
}
