import { sign } from "jsonwebtoken";
import { serialize } from "cookie";
import users from "../users.json";

const secret = process.env.SECRET;

export default async function (req, res) {
  const { username, password } = req.body;
  const user = users.find(
    (user) => user.name === username && user.password === password
  );

  if (user) {
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
    res.json({ message: "Invalid credentials!" });
  }
}
