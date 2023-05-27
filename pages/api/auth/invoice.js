import fs from "fs";
import path from "path";

export default async function (req, res) {
  console.log(req.method);
  console.log(req.body);
  try {
    if (req.method === "POST") {
      const inv = req.body;
      const filePath = path.join(process.cwd(), "/pages/api/invoice.json");
      const fileData = fs.readFileSync(filePath);
      const data = JSON.parse(fileData);
      data.push(inv);
      fs.writeFileSync(filePath, JSON.stringify(data));
      res.status(200).json({ message: "Invoice qabul qilindi!" });
    } else {
      res.status(200).json({ message: "Method not allowed" });
    }
  } catch (err) {
    return res.json({ message: "Token is wrong!" });
  }
}
