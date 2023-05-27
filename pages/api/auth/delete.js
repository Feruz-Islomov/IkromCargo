import { verify } from "jsonwebtoken";
import fs from "fs";
import path from "path";

const secret = process.env.SECRET;
export default async function (req, res) {
  if (req.method === "POST") {
    const { cookies } = req;
    const { id } = req.body;
    const token = cookies.OursiteJWT;
    if (!token) {
      return res.json({ message: "Invalid token!", bool: false });
    }
    // try {
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
    // } catch (err) {
    //   return res.json({ message: "Token is wrong!" });
    // }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
