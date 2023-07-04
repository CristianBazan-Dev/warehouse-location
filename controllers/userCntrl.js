import Users from "../models/userModel.js";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import dotenv from "dotenv";
dotenv.config();

export const userCntrl = {
  register: async (req, res) => {
    try {
      const { name, lastName, email, password } = req.body;

      const user = await Users.findOne({ email });

      if (user)
        return res
          .status(400)
          .json({ msg: "There's an account already with that email." });

      if (password.length < 6)
        return res
          .status(400)
          .json({ msg: "Password must have at least 6 characters." });

      // Password encryption through bcrypt
      const passwordHash = await bcrypt.hash(password, 10);

      // Creation of new user in db
      const newUser = new Users({
        name,
        lastName,
        email,
        password: passwordHash,
      });

      await newUser.save();

      // Creation of token for future permisions access and control of the login

      const accessToken = createAccessToken({ id: newUser._id });
      const refreshToken = createRefreshToken({ id: newUser._id });

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        path: "/users/refresh_token",
        maxAge: 7 * 24 * 60 * 1000,
      });

      res.json({ accessToken });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await Users.findOne({ email });

      if (!user) return res.status(400);

      //   I use bcrypt right now to compare between the hashed password and a conversion through bcrypt, so the program can know if the provided password is correct

      const isMath = await bcrypt.compare(password, user.password);
      if (!isMath) return res.status(400).json({ msg: "Incorrect password." });

      //   Creating an acces token that's going to be storaged in the localstorage, so we need to make the cookies advice. In that way, the login aspect its managed by cookies that storage the token. The token it's going to be refreshed in the estimated time.
      const accessToken = createAccessToken({ id: user._id });
      const refreshToken = createRefreshToken({ id: user._id });

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        path: "/users/refresh_token",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      res.json({ accessToken });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  logout: async (req, res) => {
    try {
      // The logout aspect operates in the contrary way: we clear the cookies so we don't storage any token
      res.clearCookie("refreshToken", {
        path: "/users/refresh_token",
      });

      return res.json({ msg: "Logout successfully. " });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  refreshToken: (req, res) => {
    // Due the approach of the login/logout through out cookies storage and tokens provided by jwt, we need to make the refreshToken, so when the user is logged in, it can be through out the time. 

    // This functionality it's going to be called by a userEffect inside the GlobalState of the DataProvider in the frontend, so it's checked and updated when the time comes 
    try {
        const rf_token = req.cookies.refreshToken; 

        if(!rf_token) return res.status(400).json({msg: "Please login or register."}); 

        jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
            if (err)
            return res.status(400).json({msg: "Please login or register"}); 

            const accessToken = createAccessToken({id: user.id }); 

            res.json({ user, accessToken}); 
        })

        res.json({ rf_token })
         
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getUser: async (req,res) => {
    try{
      const user = await Users.findById(req.user.id).select("-password"); 
      if(!user)
      return res.status(400).json({msg: "User does not exist"})

      res.json(user)
    } catch (err) {
      return res.status(500).json({msg: err.message})
    }
  },
  getUsers: async (req, res) => {
    try {
      const user = await Users.find();

      res.json(user);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getAdmins: async (req, res) => {
    try {
      const user = await Users.find({role: 1});

      res.json(user)
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

const createAccessToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "11m",
  });
};

const createRefreshToken = (user) => {
  return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });
};
