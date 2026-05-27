import express from "express";

import protect from "../middleware/authMiddleware.js";

import {
  getBalance,
  depositMoney,
  withdrawMoney,
  transferMoney,
} from "../controllers/accountController.js";

const router = express.Router();

router.get("/balance", protect, getBalance);

router.post("/deposit", protect, depositMoney);

router.post("/withdraw", protect, withdrawMoney);

router.post("/transfer", protect, transferMoney);

export default router;