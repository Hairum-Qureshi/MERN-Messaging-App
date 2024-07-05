import express from "express";
import { addContact, getContacts } from "../controllers/contact";
import { authenticated } from "../middleware/authentication";

const router = express.Router();

router.post("/add", authenticated, addContact);

router.get("/all", authenticated, getContacts);

export default router;
