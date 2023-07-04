import { Router } from "express";
import wareCntrl from "../controllers/warehouseCntrl.js";
import { authAdmin } from "../middleware/authAdmin.js";
import { auth } from "../middleware/auth.js";

const router = Router();

router.get("/wares", wareCntrl.getWares);
router.get("/wares/:id", wareCntrl.getWare);

router.post("/create-wares", wareCntrl.createWare);

router.delete("/delete-ware/:id", wareCntrl.deleteWare);
export default router;
