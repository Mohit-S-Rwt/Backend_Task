import express from "express";
import multer from "multer";
import { register, login, getDashboard } from "../controllers/authControllers.js";
import authMiddleware from "../middleware/authMiddleware.js";


const Authrouter = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});
const upload = multer({ storage });

//Routes

Authrouter.post("/register", upload.single("profileImage"), register);
Authrouter.post("/login", login);
Authrouter.get("/dashboard", authMiddleware, getDashboard);



export default Authrouter;