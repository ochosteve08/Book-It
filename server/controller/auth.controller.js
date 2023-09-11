import UserModel from "../model/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";
import { jwtSecret } from "../utils/jwtSecret.js";
import { registerUserValidation } from "../validation/user.validation/Register.validation.js";

export const Signup = async (req, res, next) => {
  try {
    const { username, email, password } =
      await registerUserValidation.validateAsync(req.body);
    const hashPassword = bcryptjs.hashSync(password, 10);
    const newUser = await UserModel.create({
      username,
      email,
      password: hashPassword,
    });
    const { password: Password, ...rest } = newUser._doc;
    res.json(rest);
  } catch (error) {
    next(error);
  }
};

export const SignIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const validUser = await UserModel.findOne({ email });
    if (!validUser) {
      return next(errorHandler(401, "user not found"));
    }

    const match = bcryptjs.compareSync(password, validUser.password);
    if (!match) {
      return next(errorHandler(401, "wrong credentials"));
    }
    const access_token = jwt.sign(
      {
        email: validUser.email,
        id: validUser._id,
        username: validUser.username,
        profilePicture: validUser.profilePicture,
      },
      jwtSecret,
      { expiresIn: "15m" }
    );

    const refreshToken = jwt.sign(
      {
        email: validUser.email,
        id: validUser._id,
      },

      jwtSecret,
      { expiresIn: "7d" }
    );

    // const { password: hashPassword, ...rest } = validUser._doc;

    res.cookie("access_token", refreshToken, {
      httpOnly: true,
      // path: "/",
      // domain: "localhost",
      // SameSite: "Lax",
      // domain: "o-auth-puce.vercel.app",
      sameSite: "None",
      secure: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return res.status(200).json({ access_token });
  } catch (error) {
    next(error);
  }
};

export const Google = async (req, res, next) => {
  try {
    const { name, email, photo } = req.body;

    const User = await UserModel.findOne({ email });
    if (User) {
      const token = jwt.sign({ id: User._id }, jwtSecret);
      const { password: hashPassword, ...rest } = User._doc;
      res
        .cookie("access_token", token, {
          httpOnly: true,
          // path: "/",
          // domain: "localhost",
          // SameSite: "lax",
          // domain: "o-auth-puce.vercel.app",
          sameSite: "None",
          secure: true,
          expiresIn: "30m",
        })
        .status(200)
        .json(rest);
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashPassword = bcryptjs.hashSync(generatedPassword, 10);
      const newUser = await UserModel.create({
        username:
          name.split(" ").join("").toLowerCase() +
          Math.floor(Math.random() * 10000).toString(),
        email,
        password: hashPassword,
        profilePicture: photo,
      });

      const token = jwt.sign({ id: newUser._id }, jwtSecret);
      const { password: removePassword, ...rest } = newUser._doc;

      res.cookie("access_token", token, {
        httpOnly: true,
        // path: "/",
        // domain: "localhost",
        // SameSite: "lax",
        // domain: "o-auth-puce.vercel.app",
        sameSite: "None",
        secure: true,
        expiresIn: "30m",
      });

      return res.status(200).json(rest);
    }
  } catch (error) {
    next(error);
  }
};

export const signout = (req, res, next) => {
  const cookies = req.cookies;

  //user is already signed out
  if (!cookies?.access_token) {
    return res.status(200).json({
      success: false,
      message: "Already signed out",
    });
  }

  res.clearCookie("access_token");

  return res.status(200).json({
    success: true,
    message: "Signout successful",
  });
};

export const Refresh = (req, res, next) => {
  const cookies = req.cookies;

  if (!cookies?.jwt) return next(errorHandler(401, "invalid credentials"));
  const refreshToken = cookies.jwt;

  jwt.verify(refreshToken, jwtSecret, async (err, decoded) => {
    try {
      if (err) return next(errorHandler(403, "Invalid refresh token"));
      const foundUser = await UserModel.findOne({ username: decoded.username });
      if (!foundUser) return next(errorHandler(401, "User not found"));
      const access_token = jwt.sign(
        {
          email: validUser.email,
          id: validUser._id,
          username: validUser.username,
          profilePicture: validUser.profilePicture,
        },
        jwtSecret,
        { expiresIn: "15m" }
      );
      res.json({ access_token });
    } catch (error) {
      next(error);
    }
  });
};
