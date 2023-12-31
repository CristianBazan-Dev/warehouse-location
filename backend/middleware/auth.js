import jwt from "jsonwebtoken";

export const auth = (req, res, next) => {
  try {
    const token = req.header("Authorization");

    if (!token) return res.status(500).json({ msg: "Without authorization" });

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) return res.status(400).json({ msg: "Not autorized" });

      req.user = user;
      next();
    });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};
