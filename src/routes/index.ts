import express from "express";
import {
  californiaBusiness,
  coloradoBusiness,
  delawareBusiness,
  floridaBusiness,
  idahoBusiness,
  kansasBusiness,
  maineBusiness,
  marylandBusiness,
} from "../controllers/business";

const router = express.Router();

router.get("/california", californiaBusiness);
router.get("/colorado", coloradoBusiness);
router.get("/florida", floridaBusiness);
router.get("/delaware", delawareBusiness);
router.get("/idaho", idahoBusiness);
router.get("/kansas", kansasBusiness);
router.get("/maryland", marylandBusiness);
router.get("/maine", maineBusiness);

export default router;
