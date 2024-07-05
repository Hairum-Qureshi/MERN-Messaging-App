import express from "express";
import { addContact } from "../controllers/contact";
import { authenticated } from "../middleware/authentication";

const router = express.Router();

router.post("/add", authenticated, addContact);

export default router;
