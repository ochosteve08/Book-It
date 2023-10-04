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
    const { password: _, ...userInfo } = newUser._doc;
    res.json(userInfo);
  } catch (error) {
    next(error);
  }
};

export const SignIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const User = await UserModel.findOne({ email });
    if (!User) {
      return next(errorHandler(401, "user not found"));
    }

    const match = bcryptjs.compareSync(password, User.password);
    if (!match) {
      return next(errorHandler(401, "wrong credentials"));
    }
    const accessToken = jwt.sign(
      {
        id: User._id,
      },
      jwtSecret,
      { expiresIn: "15m" }
    );

    const refreshToken = jwt.sign(
      {
        id: User._id,
      },

      jwtSecret,
      { expiresIn: "1d" }
    );

    const { password: _, ...currentUser } = User._doc;

    res.cookie("refresh_token", refreshToken, {
      httpOnly: true,
      sameSite: "None",
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    return res.status(200).json({ currentUser, accessToken });
  } catch (error) {
    next(error);
  }
};

export const Google = async (req, res, next) => {
  try {
    const { name, email, photo } = req.body;
    const User = await UserModel.findOne({ email });
    if (User) {
      const accessToken = jwt.sign(
        {
          id: User._id,
        },
        jwtSecret,
        {
          expiresIn: "15m",
        }
      );
      const refreshToken = jwt.sign(
        {
          id: User._id,
        },
        jwtSecret,
        {
          expiresIn: "1d",
        }
      );
      const { password: _, ...currentUser } = User._doc;
      res.cookie("refresh_token", refreshToken, {
        httpOnly: true,
        sameSite: "None",
        secure: true,
        maxAge: 24 * 60 * 60 * 1000,
      });
      res.json({ currentUser, accessToken });
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

      const accessToken = jwt.sign(
        {
          id: newUser._id,
        },
        jwtSecret,
        {
          expiresIn: "15m",
        }
      );
      const refreshToken = jwt.sign(
        {
          id: newUser._id,
        },
        jwtSecret,
        {
          expiresIn: "1d",
        }
      );
      const { password: _, ...userInfo } = newUser._doc;
      res.cookie("refresh_token", refreshToken, {
        httpOnly: true,
        sameSite: "None",
        secure: true,
        maxAge: 24 * 60 * 60 * 1000,
      });
      res.json({ userInfo, accessToken });
    }
  } catch (error) {
    next(error);
  }
};

export const signout = (req, res, next) => {
  const cookies = req.cookies;

  //user is already signed out
  if (!cookies?.refresh_token) {
    return res.status(204).json({
      success: false,
      message: "Already signed out",
    });
  }
  res.clearCookie("refresh_token", {
    httpOnly: true,
    secure: true,
    sameSite: "None",
  });
  return res.status(204).json({
    success: true,
    message: "Signout successful",
  });
};

export const Refresh = (req, res, next) => {
  const cookies = req.cookies;

  if (!cookies?.refresh_token)
    return next(errorHandler(401, "invalid credentials"));
  const refreshToken = cookies.refresh_token;

  jwt.verify(refreshToken, jwtSecret, async (err, decoded) => {
    try {
      if (err)
        return next(errorHandler(403, "Authentication error, Kindly login "));
      const User = await UserModel.findOne({ _id: decoded._id });
      if (!User) return next(errorHandler(401, "User not found"));
      const { password: _, ...currentUser } = User._doc;
      const accessToken = jwt.sign(
        {
          id: User._id,
        },
        jwtSecret,
        { expiresIn: "15m" }
      );

      res.json({ currentUser, accessToken });
    } catch (error) {
      next(error);
    }
  });
};
