// import users from "../users.json";
// import invoices from "../invoice.json";

// const secret = process.env.SECRET;

// export default async function (req, res) {
//   const { id } = req.body;

//   console.log(arr);

//   const { cookies } = req;
//   const token = cookies.OursiteJWT;
//   if (!token) {
//     return res.json({ message: "Invalid token1!", bool: false });
//   }
//   verify(token, secret);
//   //   if (!user) {
//   //     res.json({ message: "No such user!" });
//   //   } else if (user && user.isAdmin === true) {
//   //     verify(token, secret);
//   //     res.status(200).json({ message: "Success!", user, invoices });
//   //   } else {
//   //     res.json({ message: "Not authorized to this page" });
//   //   }

// }
import { verify } from "jsonwebtoken";
import fs from "fs";
import path from "path";

const secret = process.env.SECRET;
export default function handler(req, res) {
  if (req.method === "POST") {
    const { cookies } = req;
    const { id } = req.body;
    const token = cookies.OursiteJWT;
    if (!token) {
      return res.json({ message: "Invalid token!", bool: false });
    }
    try {
      verify(token, secret);
      const filePath = path.join(process.cwd(), "/pages/api/invoice.json");
      const fileData = fs.readFileSync(filePath);
      const data = JSON.parse(fileData);
      //find and delete
      const index = data.findIndex((x) => x.id === id);
      if (index !== -1) {
        data.splice(index, 1);
      }
      fs.writeFileSync(filePath, JSON.stringify(data));
      res.status(200).json({ message: "deleted successfully", invoices: data });
    } catch (err) {
      return res.json({ message: "Token is wrong!" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
