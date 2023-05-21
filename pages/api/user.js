/* eslint-disable import/no-anonymous-default-export */
export default async function (req, res) {
  const { cookies } = req;

  const jwt = cookies.OursiteJWT;

  if (!jwt) {
    return res.json({ message: "Invalid token!", bool: false });
  }

  return res.json({ data: "Top secret data!", bool: true });
}
