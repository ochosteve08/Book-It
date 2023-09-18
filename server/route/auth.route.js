import express from "express";
import { Signup, SignIn,signout,Google, Refresh } from "../controller/auth.controller.js";
import { logResponseCookies } from "../middleware/LogResCookies.js";
import { loginLimiter } from "../middleware/loginLimiter.js";

const router = express.Router();

router.post("/signup", Signup);
router.post("/signin",loginLimiter, logResponseCookies, SignIn);
router.get("/refresh",Refresh)
router.post("/google", Google);
router.post("/signout", logResponseCookies, signout);

export default router;
