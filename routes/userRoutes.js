import { Router } from "express";
import { userCntrl } from "../controllers/userCntrl.js";
import {auth} from '../middleware/auth.js'
import {authAdmin} from '../middleware/authAdmin.js'
const router = Router();

router.get("/", authAdmin, userCntrl.getUsers);
router.get("/infor", auth, userCntrl.getUser)


router.get("/admins", userCntrl.getAdmins);

router.post("/register", userCntrl.register);

router.post("/login", userCntrl.login);
router.get("/logout", userCntrl.logout);

router.get("/refresh_token", userCntrl.refreshToken);

export default router;
