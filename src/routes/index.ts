import express from "express";
import {
  californiaBusiness,
  coloradoBusiness,
  floridaBusiness,
} from "../controllers/business";

const router = express.Router();

router.get("/california", californiaBusiness);
router.get("/colorado", coloradoBusiness);
router.get("/florida", floridaBusiness);

export default router;
