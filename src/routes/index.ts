import express from "express";
import { californiaBusiness } from "../controllers/business";

const router = express.Router();

router.get("/california", californiaBusiness);

export default router;
