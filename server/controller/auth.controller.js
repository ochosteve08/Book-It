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
    const accessToken = jwt.sign(
      {
        id: validUser._id,
      },
      jwtSecret,
      { expiresIn: "5m" }
    );

    const refreshToken = jwt.sign(
      {
        id: validUser._id,
      },

      jwtSecret,
      { expiresIn: "7d" }
    );

    const { password: _, ...userInfo } = validUser._doc;

    res.cookie("refresh_token", refreshToken, {
      httpOnly: true,
      // path: "/",
      // domain: "localhost",
      // SameSite: "Lax",
      // domain: "o-auth-puce.vercel.app",
      sameSite: "None",
      secure: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return res.status(200).json({ User, accessToken });
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
          email: User.email,
          id: User._id,
          username: User.username,
          profilePicture: User.profilePicture,
        },
        jwtSecret,
        {
          expiresIn: "5m",
        }
      );
      const refreshToken = jwt.sign(
        {
          email: User.email,
          id: User._id,
          username: User.username,
          profilePicture: User.profilePicture,
        },
        jwtSecret,
        {
          expiresIn: "7d",
        }
      );
      const { password: _, ...userInfo } = User._doc;
      res.cookie("refresh_token", refreshToken, {
        httpOnly: true,
        sameSite: "None",
        secure: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
      res.json({ userInfo, accessToken });
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
          email: newUser.email,
          id: newUser._id,
          username: newUser.username,
          profilePicture: newUser.profilePicture,
        },
        jwtSecret,
        {
          expiresIn: "7d",
        }
      );
      const { password: _, ...userInfo } = newUser._doc;
      res.cookie("refresh_token", refreshToken, {
        httpOnly: true,
        sameSite: "None",
        secure: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
      res.json({User, accessToken });
    }
  } catch (error) {
    next(error);
  }
};

export const signout = (req, res, next) => {
  const cookies = req.cookies;

  //user is already signed out
  if (!cookies?.refresh_token) {
    return res.status(200).json({
      success: false,
      message: "Already signed out",
    });
  }

  res.clearCookie("refresh_token");

  return res.status(200).json({
    success: true,
    message: "Signout successful",
  });
};

export const Refresh = (req, res, next) => {
  const cookies = req.cookies;
console.log(cookies)
  if (!cookies?.refresh_token)
    return next(errorHandler(401, "invalid credentials"));
  const refreshToken = cookies.refresh_token;
 

  jwt.verify(refreshToken, jwtSecret, async (err, decoded) => {
    try {
      if (err)
        return next(errorHandler(403, "Authentication error, Kindly login "));
      const validUser = await UserModel.findOne({ username: decoded.username });
      if (!validUser) return next(errorHandler(401, "User not found"));

      const accessToken = jwt.sign(
        {
          id: validUser._id,
        },
        jwtSecret,
        { expiresIn: "5m" }
      );
     
      const { password: _, ...userInfo } = validUser._doc;
      res.json({ User, accessToken });
    } catch (error) {
      next(error);
    }
  });
};
