// /* eslint-disable import/no-anonymous-default-export */
// import { serialize } from "cookie";

// export default async function (req, res) {
//   const { cookies } = req;

//   const jwt = cookies.OursiteJWT;

//   if (!jwt) {
//     return res.json({ message: "Bro you are already not logged in..." });
//   } else {
//     const serialised = serialize("OursiteJWT", null, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV !== "development",
//       sameSite: "strict",
//       maxAge: 0,
//       path: "/",
//     });

//     res.setHeader("Set-Cookie", serialised);

//     res.status(200).json({ message: "Successfuly logged out!", bool: false });
//   }
// }
import cookie from "cookie";

export default async function handler(req, res) {
  console.log(req.method);
  if (req.method === "POST") {
    // Remove the JWT token from the browser
    res.setHeader(
      "Set-Cookie",
      cookie.serialize("OursiteJWT", "null", {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        sameSite: "strict",
        maxAge: -1,
        path: "/",
      })
    );

    res.status(200).json({ message: "Logout successful", bool: false });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
