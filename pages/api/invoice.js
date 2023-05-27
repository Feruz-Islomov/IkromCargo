import fs from "fs";
import path from "path";

export default function handler(req, res) {
  if (req.method === "POST") {
    const inv = req.body;
    const filePath = path.join(process.cwd(), "/pages/api/invoice.json");
    const fileData = fs.readFileSync(filePath);
    const data = JSON.parse(fileData);
    data.push(inv);

    fs.writeFileSync(filePath, JSON.stringify(data));
    res.status(200).json({ message: "Invoice qabul qilindi!" });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
// export default async function (req, res) {
//   const { cookies } = req;

//   const jwt = cookies.OursiteJWT;

//   if (!jwt) {
//     return res.json({ message: "Invalid token!", bool: false });
//   }

//   return res.json({ data: "Top secret data!", bool: true });
// }
